export abstract class PacientePort {
  abstract obtenerPorId(documento: string): Promise<{
    documento: string;
    activo: boolean;
  } | null>;
}
