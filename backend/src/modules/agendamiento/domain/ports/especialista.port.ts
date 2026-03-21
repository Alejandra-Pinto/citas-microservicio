export abstract class EspecialistaPort {
  abstract obtenerPorId(id: string): Promise<{
    id: string;
    intervaloAtencion: number;
    activo: boolean;
  } | null>;
}
