/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEnum, IsOptional, IsDate, IsEmail, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { GeneroEnum } from '../../domain/entities/paciente.entity';
import { Exclude } from 'class-transformer';

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

  @IsString()
  @MinLength(8)
  @Exclude({ toPlainOnly: true })
  password: string;
}
