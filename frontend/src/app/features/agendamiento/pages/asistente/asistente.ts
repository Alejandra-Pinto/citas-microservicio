import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { CitasService } from '../../../../core/services/citas-service';
import { EspecialistaService } from '../../../../core/services/especialista.service';
import { EspecialistaSelectorComponent } from '../../componentes/especialista-selector/especialista-selector';
import { HorarioSelectorComponent } from '../../componentes/horario-selector/horario-selector';
import { FormActionsComponent } from '../../componentes/form-actions/form-actions';
import { Cita } from '../../../../core/models/cita.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistente',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    EspecialistaSelectorComponent,
    HorarioSelectorComponent,
    FormActionsComponent,
  ],
  templateUrl: './asistente.html',
  styleUrl: './asistente.scss',
})
export class AsistenteComponent implements OnInit {
  public authService = inject(AuthStateService);
  private citasService = inject(CitasService);
  private especialistaService = inject(EspecialistaService);

  // Signals de estado
  especialistas = signal<any[]>([]);
  especialidadElegida = signal<string>('');
  doctorSeleccionado = signal<any>(null);
  fechaSeleccionada = signal<string>('');
  horaSeleccionada = signal<string>('');
  tipoCita = signal<string>('');

  citasPasadas = signal<any[]>([]);
  citasFuturas = signal<any[]>([]);
  horarios = signal<any[]>([]);

  minDate: string = new Date().toISOString().split('T')[0];
  intentoEnvio: boolean = false;

  ngOnInit() {
    this.cargarEspecialistas();
    this.cargarHistorialPaciente();
  }

  cargarEspecialistas() {
    this.especialistaService.listarEspecialistas().subscribe((data) => {
      this.especialistas.set(data);
    });
  }

  // asistente.ts

  cargarHistorialPaciente() {
    const usuario = this.authService.usuario();
    if (usuario?.username) {
      this.citasService.obtenerCitasPorPaciente(usuario.username).subscribe({
        next: (citasBack: any[]) => {
          const ahora = new Date();

          const procesadas: Cita[] = citasBack.map((c) => {
            const nombreMedico =
              c.especialista?.nombre || c.especialista?.nombres || 'Médico no asignado';

            return {
              ...c,
              especialistaNombre: nombreMedico,
              notas: c.especialidad ? `Especialidad: ${c.especialidad}` : c.notas,

              estado: this.validarEstado(c.estado || c.estadoCita),
            } as Cita; 
          });

          // Ordenar (Más cercana primero)
          procesadas.sort(
            (a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime(),
          );

          this.citasFuturas.set(procesadas.filter((c) => new Date(c.fechaHora) >= ahora));
          this.citasPasadas.set(procesadas.filter((c) => new Date(c.fechaHora) < ahora).reverse());
        },
      });
    }
  }

  // Función auxiliar para evitar errores de tipos en el estado
  private validarEstado(estado: string): any {
    const validos = ['PROGRAMADA', 'CANCELADA', 'REAGENDADA', 'FINALIZADA'];
    return validos.includes(estado) ? estado : 'PROGRAMADA';
  }

  // Filtrado de doctores según la especialidad seleccionada
  doctoresFiltrados = computed(() => {
    const esp = this.especialidadElegida();
    if (!esp) return [];
    return this.especialistas()
      .filter((d) => d.especialidad === esp)
      .map((doc) => ({
        ...doc,
        nombreMostrar: doc.nombre || `${doc.nombres} ${doc.apellidos}`,
        especialidadLabel: doc.especialidad.replace(/_/g, ' ').toLowerCase(),
      }));
  });

  // Manejadores de eventos del HTML
  onEspecialidadChange(event: any) {
    this.especialidadElegida.set(event.target.value);
    this.doctorSeleccionado.set(null);
    this.horarios.set([]);
  }

  seleccionarDoctor(data: any) {
    if (!data) return;
    const idBuscado = typeof data === 'object' ? data.id : data;
    const doctorConFormato = this.doctoresFiltrados().find((d) => d.id === idBuscado);

    if (doctorConFormato) {
      this.doctorSeleccionado.set(doctorConFormato);
    } else if (typeof data === 'object') {
      this.doctorSeleccionado.set({
        ...data,
        nombreMostrar: data.nombre || `${data.nombres || ''} ${data.apellidos || ''}`.trim(),
      });
    }

    this.horaSeleccionada.set('');
    this.cargarDisponibilidad();
  }

  onFechaChange(fecha: string) {
    this.fechaSeleccionada.set(fecha);
    this.horaSeleccionada.set('');
    this.cargarDisponibilidad();
  }

  // Lógica de carga de horarios (Sincronizada con Signals)
  cargarDisponibilidad() {
    const doctor = this.doctorSeleccionado();
    const fecha = this.fechaSeleccionada();

    // Si no hay doctor, no intentamos llamar al servicio
    if (!doctor || !doctor.id || !fecha) return;

    this.citasService.getDisponibilidad(String(doctor.id), fecha).subscribe({
      next: (res) => this.horarios.set(res || []),
      error: () => this.horarios.set([]),
    });
  }

  doctorResumen = computed(() => {
    const seleccionado = this.doctorSeleccionado();
    return seleccionado ? seleccionado : null;
  });

  private generarHorariosDesdeConfiguracion(doctor: any): any[] {
    if (!doctor?.horarioAtencion) return [];

    const slots = [];
    const [hInicio, mInicio] = doctor.horarioAtencion.horaInicio.split(':').map(Number);
    const [hFin, mFin] = doctor.horarioAtencion.horaFin.split(':').map(Number);
    const intervalo = doctor.intervaloAtencion || 20;

    let actual = hInicio * 60 + mInicio;
    const fin = hFin * 60 + mFin;

    while (actual < fin) {
      const hh = Math.floor(actual / 60)
        .toString()
        .padStart(2, '0');
      const mm = (actual % 60).toString().padStart(2, '0');
      slots.push({ hora: `${hh}:${mm}` });
      actual += intervalo;
    }
    return slots;
  }

  confirmarCita() {
    const perfil = this.authService.usuario();
    const doc = this.doctorSeleccionado();
    const fecha = this.fechaSeleccionada();
    const hora = this.horaSeleccionada();

    if (!perfil?.username || !doc || !fecha || !hora) {
      this.mostrarNotificacion('Completa todos los campos antes de confirmar', 'warning');
      return;
    }

    const [horas, minutos] = hora.split(':');
    const fechaHoraStr = `${fecha}T${horas.padStart(2, '0')}:${minutos.padStart(2, '0')}:00`;

    const dto = {
      pacienteId: perfil.username,
      especialistaId: doc.id.toString(),
      fechaHora: fechaHoraStr,
      tipo: this.tipoCita() || 'CONTROL',
    };

    Swal.fire({ title: 'Procesando cita...', didOpen: () => Swal.showLoading() });

    this.citasService.crearCita(dto).subscribe({
      next: () => {
        const nombreDoc = doc.nombreMostrar || doc.nombre || `${doc.nombres} ${doc.apellidos}`;
        Swal.fire({
          icon: 'success',
          title: '¡Cita Agendada!',
          text: `Tu cita con el Dr(a). ${nombreDoc} ha sido registrada.`,
          confirmButtonColor: '#3b82f6',
        });
        this.cargarHistorialPaciente();
        this.limpiarFormulario();
      },
      error: (err) => {
        const msg = Array.isArray(err.error?.message)
          ? err.error.message.join('. ')
          : err.error?.message || 'Error de conexión';
        const esFechaPasada = msg.toLowerCase().includes('pasado');
        const esAdvertencia =
          msg.toLowerCase().includes('atiende') || msg.toLowerCase().includes('ventana');

        Swal.fire({
          icon: esFechaPasada ? 'error' : esAdvertencia ? 'warning' : 'error',
          title: esFechaPasada ? 'Fecha Inválida' : esAdvertencia ? 'Atención' : 'Error',
          text: msg,
          confirmButtonColor: esFechaPasada ? '#ef4444' : '#3b82f6',
        });
      },
    });
  }

  cancelar() {
    Swal.fire({
      title: '¿Limpiar formulario?',
      text: 'Se perderán los datos de la cita actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'No, continuar',
    }).then((result) => {
      if (result.isConfirmed) this.limpiarFormulario();
    });
  }

  limpiarFormulario() {
    this.especialidadElegida.set('');
    this.doctorSeleccionado.set(null);
    this.tipoCita.set('');
    this.fechaSeleccionada.set('');
    this.horaSeleccionada.set('');
    this.horarios.set([]);
    this.intentoEnvio = false;
  }

  private mostrarNotificacion(mensaje: string, tipo: 'error' | 'warning' = 'error') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: tipo,
      title: mensaje,
      showConfirmButton: false,
      timer: 3000,
    });
  }
}
