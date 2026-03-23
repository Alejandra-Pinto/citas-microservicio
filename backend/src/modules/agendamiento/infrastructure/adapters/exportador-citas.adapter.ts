import { Injectable } from '@nestjs/common';
import * as PDFDocumentProxy from 'pdfkit';
import { Workbook } from 'exceljs';
import { ExportadorCitasPort } from '../../domain/ports/exportador-citas.port';
import { Cita, EstadoCita } from '../../domain/entities/cita.entity';

interface PDFKitDocCustom extends PDFKit.PDFDocument {
  fillColor(
    color: string | string[] | PDFKit.Mixins.ColorValue,
    opacity?: number,
  ): this;
}

@Injectable()
export class ExportadorCitasAdapter extends ExportadorCitasPort {
  async generarPdf(citas: Cita[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const ActualConstructor =
          (
            PDFDocumentProxy as unknown as {
              default: new (
                options?: PDFKit.PDFDocumentOptions,
              ) => PDFKitDocCustom;
            }
          ).default ||
          (PDFDocumentProxy as unknown as new (
            options?: PDFKit.PDFDocumentOptions,
          ) => PDFKitDocCustom);

        const doc = new ActualConstructor({
          margin: 40,
          size: 'A4',
          bufferPages: true,
        });
        const chunks: Buffer[] = [];

        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err: unknown) => {
          reject(err instanceof Error ? err : new Error(String(err)));
        });

        const dibujarCabeceraTabla = (posTop: number) => {
          doc.rect(40, posTop, 520, 20).fillColor('#F1F5F9').fill();
          doc.fillColor('#1D4ED8').fontSize(9);
          doc.text('HORA', 50, posTop + 6);
          doc.text('PACIENTE', 110, posTop + 6);
          doc.text('TIPO', 280, posTop + 6);
          doc.text('DURACIÓN', 380, posTop + 6);
          doc.text('ESTADO', 470, posTop + 6);
        };

        // --- ENCABEZADO ---
        doc.rect(0, 0, 612, 80).fillColor('#1D4ED8').fill();
        doc.fillColor('#FFFFFF').fontSize(22).text('PIEDRA AZUL', 40, 30);
        doc.fontSize(10).text('SISTEMA DE GESTIÓN DE CITAS MÉDICAS', 40, 55);

        const especialista =
          citas.length > 0 ? citas[0].especialista?.nombre : 'N/A';
        const totalCitas = citas.length;

        doc
          .fillColor('#1E293B')
          .fontSize(16)
          .text('REPORTE DIARIO DE AGENDA', 40, 100);

        doc
          .fontSize(10)
          .fillColor('#64748B')
          .text(`Especialista: `, 40, 125, { continued: true })
          .fillColor('#1E293B')
          .text(especialista || 'No especificado');

        doc
          .fontSize(10)
          .fillColor('#64748B')
          .text(`Cantidad total de citas: `, 40, 140, { continued: true })
          .fillColor('#1D4ED8')
          .text(`${totalCitas}`, { oblique: true });

        // --- INICIO DE TABLA ---
        const tableTop = 170;
        dibujarCabeceraTabla(tableTop);
        let y = tableTop + 30;

        citas.forEach((cita, index) => {
          // Bajamos un poco el límite de y (de 730 a 700) para asegurar espacio al pie
          if (y > 700 && index < citas.length - 1) {
            doc.addPage();
            y = 50;
            dibujarCabeceraTabla(y);
            y += 30;
          }

          const hora = new Date(cita.fechaHora).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          const nombrePaciente = cita.paciente?.nombre || 'Paciente no cargado';

          doc.fillColor('#334155').fontSize(9).text(hora, 50, y);
          doc.text(nombrePaciente.toUpperCase(), 110, y, {
            width: 160,
            ellipsis: true,
          });
          doc.text(String(cita.tipo), 280, y);
          doc.text(`${cita.duracion} min`, 380, y);

          const colorEstado =
            cita.estado === EstadoCita.CANCELADA ? '#EF4444' : '#059669';
          doc.fillColor(colorEstado).text(String(cita.estado), 470, y);

          y += 25;
          doc
            .moveTo(40, y - 5)
            .lineTo(560, y - 5)
            .strokeColor('#F1F5F9')
            .stroke();
        });

        // --- PIE DE PÁGINA CORREGIDO ---
        const fechaDescarga = new Date().toLocaleString();
        const range = doc.bufferedPageRange();

        for (let i = range.start; i < range.start + range.count; i++) {
          doc.switchToPage(i);

          // Subimos el pie de página de 805 a 780 para que no "desborde" la hoja
          const pieY = 780;

          doc
            .moveTo(40, pieY)
            .lineTo(560, pieY)
            .strokeColor('#E2E8F0')
            .stroke();

          doc
            .fontSize(8)
            .fillColor('#94A3B8')
            .text(`Generado el: ${fechaDescarga}`, 40, pieY + 5)
            .text(`Página ${i + 1} de ${range.count}`, 40, pieY + 5, {
              align: 'right',
            });
        }

        doc.end();
      } catch (error: unknown) {
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  async generarExcel(citas: Cita[]): Promise<Buffer> {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('Agenda');

    sheet.mergeCells('A1:E1');
    const title = sheet.getCell('A1');
    title.value = 'PIEDRA AZUL - REPORTE DE AGENDAMIENTO';
    title.font = { name: 'Arial Black', size: 14, color: { argb: 'FF1D4ED8' } };
    title.alignment = { horizontal: 'center' };

    const medico = citas.length > 0 ? citas[0].especialista?.nombre : 'N/A';
    sheet.getCell('A2').value = `Especialista: ${medico}`;
    sheet.getCell('A2').font = { bold: true };

    sheet.getCell('A3').value = `Cantidad total de citas: ${citas.length}`;
    sheet.getCell('A3').font = { italic: true, color: { argb: 'FF475569' } };

    sheet.getRow(4).values = [
      'HORA',
      'PACIENTE',
      'TIPO DE CITA',
      'DURACIÓN',
      'ESTADO',
    ];
    sheet.columns = [
      { key: 'hora', width: 12 },
      { key: 'paciente', width: 35 },
      { key: 'tipo', width: 20 },
      { key: 'duracion', width: 15 },
      { key: 'estado', width: 15 },
    ];

    sheet.getRow(4).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1D4ED8' },
      };
      cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      cell.alignment = { horizontal: 'center' };
    });

    citas.forEach((c) => {
      sheet
        .addRow({
          hora: new Date(c.fechaHora).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          paciente: c.paciente?.nombre || 'N/A',
          tipo: c.tipo,
          duracion: `${c.duracion} min`,
          estado: c.estado,
        })
        .eachCell((cell) => {
          cell.border = {
            bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          };
        });
    });

    const lastRow = 4 + citas.length;
    if (citas.length > 0) {
      sheet.addConditionalFormatting({
        ref: `A5:E${lastRow}`,
        rules: [
          {
            priority: 1,
            type: 'expression',
            formulae: ['$E5="CANCELADA"'],
            style: {
              fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFEE2E2' },
              },
              font: { color: { argb: 'FFB91C1C' }, bold: true },
            },
          },
        ],
      });
    }

    sheet.autoFilter = 'A4:E4';
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer as ArrayBuffer);
  }
}
