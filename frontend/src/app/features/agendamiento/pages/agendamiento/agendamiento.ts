import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../../../core/services/citas-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PacienteResumenComponent } from './paciente-resumen-component/paciente-resumen-component';
import { HeaderComponent } from './header/header';
import { EspecialistaSelectorComponent } from './especialista-selector/especialista-selector';
import { EspecialistaService } from '../../../../core/services/especialista.service';
import { HorarioSelectorComponent } from './horario-selector/horario-selector';
import { FormActionsComponent } from '../../../../components/form-actions/form-actions';
import Swal from 'sweetalert2';
import { NgModel } from '@angular/forms';
import { PacienteService } from '../../../../core/services/paciente.service';

@Component({
  selector: 'app-agendamiento',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PacienteResumenComponent,
    HeaderComponent,
    EspecialistaSelectorComponent,
    HorarioSelectorComponent,
    FormActionsComponent,
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
        this.mostrarError('Error de conexión con el servidor');
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
    if (!this.formData.especialistaid || !this.formData.fecha) return;

    this.citasService
      .getDisponibilidad(this.formData.especialistaid, this.formData.fecha)
      .subscribe((data) => {
        this.horarios = data;
      });
  }
  manejarCambioEspecialista(id: number) {
    this.formData.especialistaid = id.toString();
    this.cargarDisponibilidad(); // Refrescamos horarios de inmediato
  }

  actualizarFecha(nuevaFecha: string) {
    this.formData.fecha = nuevaFecha;
    this.cargarDisponibilidad(); // Esto dispara la petición al puerto 3000
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

    const fechaHoraStr = `${this.formData.fecha}T${this.formData.hora}:00`;
    console.log("Hora seleccionada:", this.formData.hora);
    console.log("Fecha final enviada:", fechaHoraStr);

    const dto = {
      pacienteId: this.formData.cedula,
      especialistaId: this.formData.especialistaid.toString(),
      fechaHora: fechaHoraStr,
      tipo: this.formData.tipo || 'CONTROL',
    };

    // Mostramos un mensaje de "Procesando..."
    Swal.fire({
      title: 'Procesando cita...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.citasService.crearCita(dto).subscribe({
      next: () => {
        // Mensaje de éxito elegante
        Swal.fire({
          icon: 'success',
          title: '¡Cita Agendada!',
          text: `La cita para ${this.formData.nombre} ha sido registrada con éxito.`,
          confirmButtonColor: '#3b82f6', // El azul de tu tema
        });

        this.limpiarFormulario(); // <--- AQUÍ BORRAMOS TODO
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al agendar',
          text: 'No pudimos conectar con el servidor. Revisa tu conexión.',
          confirmButtonColor: '#ef4444',
        });
        console.error('Error:', err);
      },
    });
  }

  validar(): boolean {
    if (!this.formData.cedula) {
      this.mostrarError('La cédula es obligatoria');
      return false;
    }
    if (!this.pacienteEncontrado) {
      this.mostrarError('Debe buscar un paciente válido');
      return false;
    }
    if (!this.formData.especialistaid) {
      this.mostrarError('Seleccione un especialista');
      return false;
    }
    if (!this.formData.fecha || !this.formData.hora) {
      this.mostrarError('Seleccione fecha y hora');
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

  private mostrarError(mensaje: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
