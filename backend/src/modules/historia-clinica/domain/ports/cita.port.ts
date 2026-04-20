export abstract class CitaPort {
  abstract obtenerPorId(citaId: string): Promise<{
    citaId: string;
  } | null>;
}
