export interface IdentidadRepository {
  crearUsuario(
    username: string, // Siempre será el documento
    password: string,
    nombres: string,
    apellidos: string,
    rol: 'PACIENTE' | 'ESPECIALISTA',
    email?: string, // Opcional
  ): Promise<void>;
}
