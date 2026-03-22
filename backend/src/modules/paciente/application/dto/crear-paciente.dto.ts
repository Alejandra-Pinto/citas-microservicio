/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEnum, IsOptional, IsDate, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { GeneroEnum } from '../../domain/entities/paciente.entity';

export class CrearPacienteDto {
  @IsString()
  documento: string;

  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  celular: string;

  @IsEnum(GeneroEnum)
  generoP: GeneroEnum;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaNacimiento?: Date;

  @IsOptional()
  @IsEmail()
  email?: string;
}
