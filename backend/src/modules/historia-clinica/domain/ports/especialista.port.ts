export abstract class EspecialistaPort {
  abstract obtenerPorId(id: string): Promise<{
    id: string;
    activo: boolean;
  } | null>;
}
