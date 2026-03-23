// src/modules/agendamiento/infrastructure/adapters/exportador-citas.adapter.ts
import { Injectable } from '@nestjs/common';
import * as PDFDocumentProxy from 'pdfkit';
import { Workbook } from 'exceljs';
import { ExportadorCitasPort } from '../../domain/ports/exportador-citas.port';
import { Cita } from '../../domain/entities/cita.entity';

@Injectable()
export class ExportadorCitasAdapter extends ExportadorCitasPort {
  async generarPdf(citas: Cita[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        /**
         * 1. Definimos el tipo del constructor para que ESLint esté feliz.
         */
        type PDFConstructor = new (
          options?: PDFKit.PDFDocumentOptions,
        ) => PDFKit.PDFDocument;

        /**
         * 2. Accedemos a la clase usando unknown.
         * Esto evita "no-unsafe-assignment" porque unknown es seguro para el linter.
         */
        const documentModule = PDFDocumentProxy as unknown as {
          default?: PDFConstructor;
        };
        const ActualConstructor =
          documentModule.default ||
          (PDFDocumentProxy as unknown as PDFConstructor);

        const doc = new ActualConstructor({ margin: 50 });

        const chunks: Buffer[] = [];

        // Usamos funciones normales para evitar problemas de contexto
        doc.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });

        doc.on('end', () => {
          resolve(Buffer.concat(chunks));
        });

        doc.on('error', (err: unknown) => {
          reject(err instanceof Error ? err : new Error(String(err)));
        });

        // --- Diseño Piedra Azul ---
        doc.fillColor('#1D4ED8').fontSize(20).text('PIEDRA AZUL', 110, 50);
        doc
          .fontSize(10)
          .fillColor('#64748B')
          .text('Gestión de Citas Médicas', 110, 75);

        doc.moveDown(4);
        doc
          .fillColor('#1E293B')
          .fontSize(14)
          .text('REPORTE DE AGENDAMIENTO', { align: 'center' });
        doc.moveDown();

        const tableTop = 180;
        doc.fontSize(10).fillColor('#1D4ED8');
        doc.text('Fecha/Hora', 50, tableTop);
        doc.text('Tipo', 200, tableTop);
        doc.text('Duración', 320, tableTop);
        doc.text('Estado', 420, tableTop);

        doc
          .moveTo(50, tableTop + 15)
          .lineTo(550, tableTop + 15)
          .stroke('#E2E8F0');

        let y = tableTop + 25;
        doc.fillColor('#334155');

        citas.forEach((cita) => {
          const fecha = new Date(cita.fechaHora);
          doc.text(fecha.toLocaleString(), 50, y);
          doc.text(String(cita.tipo), 200, y);
          doc.text(`${cita.duracion} min`, 320, y);
          doc.text(String(cita.estado), 420, y);
          y += 20;

          if (y > 700) {
            doc.addPage();
            y = 50;
          }
        });

        doc.end();
      } catch (error: unknown) {
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  // generarExcel se mantiene igual (ya funcionaba bien)
  async generarExcel(citas: Cita[]): Promise<Buffer> {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('Citas');
    sheet.columns = [
      { header: 'Fecha y Hora', key: 'fecha', width: 25 },
      { header: 'Tipo de Cita', key: 'tipo', width: 20 },
      { header: 'Duración (min)', key: 'duracion', width: 15 },
      { header: 'Estado', key: 'estado', width: 15 },
    ];
    const headerRow = sheet.getRow(1);
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1D4ED8' },
    };
    headerRow.font = { color: { argb: 'FFFFFFFF' }, bold: true };
    citas.forEach((c) => {
      sheet.addRow({
        fecha: new Date(c.fechaHora).toLocaleString(),
        tipo: c.tipo,
        duracion: c.duracion,
        estado: c.estado,
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer as ArrayBuffer);
  }
}
