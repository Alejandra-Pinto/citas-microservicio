import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../../../core/services/citas-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PacienteResumenComponent } from '../../componentes/paciente-resumen-component/paciente-resumen-component';
import { EspecialistaSelectorComponent } from '../../componentes/especialista-selector/especialista-selector';
import { EspecialistaService } from '../../../../core/services/especialista.service';
import { HorarioSelectorComponent } from '../../componentes/horario-selector/horario-selector';
import { FormActionsComponent } from '../../componentes/form-actions/form-actions';
import Swal from 'sweetalert2';
import { NgModel } from '@angular/forms';
import { DisponibilidadDoctores } from '../../componentes/disponibilidad-doctores/disponibilidad-doctores';
import { PacienteService } from '../../../../core/services/paciente.service';

@Component({
  selector: 'app-agendamiento',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PacienteResumenComponent,
    EspecialistaSelectorComponent,
    HorarioSelectorComponent,
    FormActionsComponent,
    DisponibilidadDoctores,
  ],
  templateUrl: './agendamiento.html',
  styleUrl: './agendamiento.scss',
})
export class Agendamiento implements OnInit {
  especialistas: any[] = [];
  horarios: any[] = [];
  intentoEnvio: boolean = false;
  pacienteEncontrado: any = null;

  formData = {
    cedula: '',
    nombre: '',
    especialistaid: '',
    fecha: '',
    hora: '',
    tipo: '',
  };

  constructor(
    private citasService: CitasService,
    private especialistaService: EspecialistaService,
    private pacienteService: PacienteService
  ) {}

  sugerencias: any[] = []; // Array para guardar los resultados temporales

  onInputCedula() {
    const query = this.formData.cedula.trim();
    console.log('Buscando:', query); // Para que veas si está entrando a la función

    if (query.length >= 3) {
      this.citasService.buscarSugerencias(query).subscribe({
        next: (data) => {
          console.log('Resultados:', data); // Mira si llegan datos
          this.sugerencias = data;
        },
        error: (err) => {
          console.error('Error en sugerencias:', err);
          this.sugerencias = [];
        },
      });
    } else {
      this.sugerencias = [];
    }
  }

  seleccionarPaciente(paciente: any) {
    this.formData.cedula = paciente.cedula;
    this.formData.nombre = `${paciente.nombres} ${paciente.apellidos}`;
    this.pacienteEncontrado = paciente;

    // Limpiamos las sugerencias al elegir uno
    this.sugerencias = [];

    // Opcional: Cargar disponibilidad si ya hay especialista elegido
    this.cargarDisponibilidad();
  }
  ngOnInit(): void {
    console.log('AGENDAMIENTO CARGADO');
    this.cargarEspecialistas();
  }

  cargarEspecialistas() {
    this.especialistaService.listarEspecialistas().subscribe((data) => {
      console.log('Datos recibidos del Back:', data);
      this.especialistas = data;
    });
  }

  buscarPaciente() {
    const cedula = this.formData.cedula.trim();

    // 1. Si está vacío, no hacemos nada y reseteamos
    if (!cedula) {
      this.pacienteEncontrado = null;
      this.formData.nombre = '';
      return;
    }

    // 2. Llamada al servicio
    this.pacienteService.getPaciente(cedula).subscribe({
      next: (data) => {
        if (data) {
          // ¡Éxito! Guardamos los datos
          this.pacienteEncontrado = data;
          this.formData.nombre = `${data.nombres} ${data.apellidos}`;
          Swal.close();
        } else {
          // CASO: PACIENTE NO EXISTE
          this.manejarPacienteNoEncontrado();
        }
      },
      error: (err) => {
        console.error('Error de conexión:', err);
        this.mostrarNotificacion('Error de conexión con el servidor');
      },
    });
  }
  private manejarPacienteNoEncontrado() {
    this.pacienteEncontrado = null;
    this.formData.nombre = '';

    if (!Swal.isVisible()) {
      Swal.fire({
        icon: 'info',
        title: 'Paciente no registrado',
        text: `La cédula ${this.formData.cedula} no coincide con nuestra base de datos de Piedra Azul.`,
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Entendido',
      });
    }
  }
  limpiarFormulario() {
    // 1. Reseteamos la bandera de validación
    this.intentoEnvio = false;

    // 2. Limpiamos los datos como ya lo hacías
    this.formData = {
      cedula: '',
      nombre: '',
      especialistaid: '',
      fecha: '',
      hora: '',
      tipo: 'CONTROL',
    };
    this.pacienteEncontrado = null;
    this.horarios = [];

    console.log('Formulario reseteado y validaciones limpias.');
  }

  cargarDisponibilidad() {
    const { especialistaid, fecha } = this.formData;
    if (!especialistaid || !fecha) return;

    this.citasService.getDisponibilidad(especialistaid, fecha).subscribe({
      next: (data) => {
        // Si hay datos, usamos los del back (citas ocupadas filtradas, etc.)
        if (data && data.length > 0) {
          this.horarios = data;
        } else {
          // Si no hay datos (fecha pasada/no laborable), generamos su agenda real
          this.horarios = this.generarHorariosDesdeConfiguracion(especialistaid);
        }
      },
      error: () => {
        // Ante error de red, también mostramos su agenda base para no bloquear
        this.horarios = this.generarHorariosDesdeConfiguracion(especialistaid);
      },
    });
  }

  private generarHorariosDesdeConfiguracion(id: string): any[] {
    // Buscamos al doctor en nuestra lista local de especialistas
    const doctor = this.especialistas.find((e) => e.id.toString() === id.toString());

    if (!doctor || !doctor.horarioAtencion) return [];

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

  manejarCambioEspecialista(id: number) {
    this.formData.especialistaid = id.toString();
    this.cargarDisponibilidad(); // Refrescamos horarios de inmediato
  }

  actualizarFecha(nuevaFecha: string) {
    this.formData.fecha = nuevaFecha;
    this.formData.hora = ''; // Resetear hora para obligar a elegir una del nuevo día
    this.cargarDisponibilidad();
  }

  get esFormularioInvalido(): boolean {
    return (
      !this.formData.cedula ||
      !this.pacienteEncontrado ||
      !this.formData.especialistaid ||
      !this.formData.fecha ||
      !this.formData.hora
    );
  }

  agendar() {
    this.intentoEnvio = true;
    if (!this.validar()) return;

    const [horas, minutos] = this.formData.hora.split(':');
    const horaFormateada = `${horas.padStart(2, '0')}:${minutos.padStart(2, '0')}`;
    const fechaHoraStr = `${this.formData.fecha}T${horaFormateada}:00`;

    const dto = {
      pacienteId: this.formData.cedula,
      especialistaId: this.formData.especialistaid.toString(),
      fechaHora: fechaHoraStr,
      tipo: this.formData.tipo || 'CONTROL',
    };

    Swal.fire({
      title: 'Procesando cita...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.citasService.crearCita(dto).subscribe({
      next: () => {
        /* ... success ... */
        Swal.fire({
          icon: 'success',
          title: '¡Cita Agendada!',
          text: `La cita para ${this.formData.nombre} ha sido registrada con éxito.`,
          confirmButtonColor: '#3b82f6',
        });

        this.limpiarFormulario();
      },
      error: (err) => {
        const msg = Array.isArray(err.error?.message)
          ? err.error.message.join('. ')
          : err.error?.message || 'Error de conexión';

        // 1. Identificar si es error de "fecha pasada" (Rojito)
        const esFechaPasada = msg.toLowerCase().includes('pasado');

        // 2. Identificar si es advertencia de agenda (Naranja)
        // Por ejemplo: "No atiende los Jueves" o "Fuera de ventana"
        const esAdvertencia =
          msg.toLowerCase().includes('atiende') ||
          msg.toLowerCase().includes('ventana') ||
          msg.toLowerCase().includes('rango');

        Swal.fire({
          icon: esFechaPasada ? 'error' : esAdvertencia ? 'warning' : 'error',
          title: esFechaPasada ? 'Fecha Inválida' : esAdvertencia ? 'Atención' : 'Error',
          text: msg,
          confirmButtonColor: esFechaPasada ? '#ef4444' : esAdvertencia ? '#f59e0b' : '#ef4444',
        });
      },
    });
  }

  validar(): boolean {
    if (!this.formData.cedula) {
      this.mostrarNotificacion('La cédula es obligatoria', 'warning');
      return false;
    }
    if (!this.pacienteEncontrado) {
      this.mostrarNotificacion('Debe buscar un paciente válido', 'warning');
      return false;
    }
    if (!this.formData.especialistaid) {
      this.mostrarNotificacion('Seleccione un especialista', 'warning');
      return false;
    }
    if (!this.formData.fecha || !this.formData.hora) {
      this.mostrarNotificacion('Seleccione fecha y hora', 'warning');
      return false;
    }
    return true;
  }

  getEdad(): string {
    if (!this.pacienteEncontrado?.fechaNacimiento) return '--';

    const nacimiento = new Date(this.pacienteEncontrado.fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (hoy < new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate())) {
      edad--;
    }
    return `${edad} años`;
  }
  cancelar() {
    Swal.fire({
      title: '¿Limpiar formulario?',
      text: 'Se perderán todos los datos ingresados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'No, continuar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.limpiarFormulario();
      }
    });
  }

  private mostrarNotificacion(mensaje: string, tipo: 'error' | 'warning' = 'error') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: tipo,
      title: mensaje,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  formatearDiasAtencion(diasBrutos: any): string {
    // Cambiamos a any por si viene de un JSON inseguro
    if (!diasBrutos || !Array.isArray(diasBrutos)) return '';

    const normalizar = (s: string) =>
      s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    const diasLimpios = [
      ...new Set(
        diasBrutos.map((dia: string) => {
          const base = normalizar(dia);
          if (base === 'miercoles') return 'Miércoles';
          return base.charAt(0).toUpperCase() + base.slice(1);
        }),
      ),
    ];
    return diasLimpios.join(', ');
  }
}
