/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { IdentidadRepository } from '../../domain/repositories/identidad.repository';

@Injectable()
export class KeycloakAdapter implements IdentidadRepository {
  private kcAdminClient: KeycloakAdminClient;

  constructor(private configService: ConfigService) {
    this.kcAdminClient = new KeycloakAdminClient({
      baseUrl: this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL'),
      realmName: this.configService.get<string>('KEYCLOAK_REALM'),
    });
  }

  private async autenticarAdmin() {
    await this.kcAdminClient.auth({
      grantType: 'client_credentials',
      clientId: this.configService.get<string>('KEYCLOAK_ADMIN_CLIENT_ID')!,
      clientSecret: this.configService.get<string>('KEYCLOAK_ADMIN_SECRET')!,
    });
  }

  async crearUsuario(
    username: string,
    password: string,
    nombres: string,
    apellidos: string,
    rol: 'PACIENTE' | 'ESPECIALISTA',
    email?: string,
  ): Promise<void> {
    try {
      await this.autenticarAdmin();

      // 1. Crear el usuario
      const res = await this.kcAdminClient.users.create({
        username,
        email,
        firstName: nombres,
        lastName: apellidos,
        enabled: true,
        emailVerified: !!email,
        credentials: [{ type: 'password', value: password, temporary: false }],
      });

      // 2. Obtener el ID del usuario recién creado
      // Nota: el método .create no siempre devuelve el objeto, a veces hay que buscarlo por username
      const usuarios = await this.kcAdminClient.users.find({ username });
      const userKeycloakId = usuarios[0].id!;

      // 3. Buscar el Rol en el Realm para obtener su ID técnico
      const realmRole = await this.kcAdminClient.roles.findOneByName({
        name: rol,
      });

      if (realmRole) {
        // 4. Asignar el rol al usuario
        await this.kcAdminClient.users.addRealmRoleMappings({
          id: userKeycloakId,
          roles: [{ id: realmRole.id!, name: realmRole.name! }],
        });
        console.log(`Rol ${rol} asignado a ${username}`);
      }
    } catch (error: any) {
      const detail =
        error.response?.data?.errorMessage ||
        error.message ||
        'Error desconocido';
      throw new Error(`Error en el sistema de identidad: ${detail}`);
    }
  }
}
