export abstract class ExportadorCitasPort {
  abstract generarPdf(citas: any[]): Promise<Buffer>;
  abstract generarExcel(citas: any[]): Promise<Buffer>;
}
