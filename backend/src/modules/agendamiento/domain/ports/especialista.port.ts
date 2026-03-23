export abstract class EspecialistaPort {
  abstract obtenerPorId(id: string): Promise<{
    id: string;
    intervaloAtencion: number;
    horarioAtencion: any;
    activo: boolean;
  } | null>;
}
