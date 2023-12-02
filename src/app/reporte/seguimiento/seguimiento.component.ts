import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';
import { CommunicationService } from 'src/app/services/comunication.service';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss'],
})
export class SeguimientoComponent implements OnInit {
  reportId: string | null = null;
  estatus: string;
  nuevoComentario: string;
  comentarios: any[] = [];
  user: any[] = [];
  email: any;
  reporteId!: string;

  cadena = window.location.href;
  lastSlash = this.cadena.lastIndexOf("/");
  idURL = this.cadena.substring(this.lastSlash + 1);

  comentarioNuevo: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private toastCtrl: ToastController,
  ) {
    this.estatus = 'Pendiente';
    this.nuevoComentario = '';
    this.reportId = '';
    this.email = localStorage.getItem('email');
  }

  ngOnInit() {
    this.obtenerComentarios();
    this.obtenerUsuario();

  }

  obtenerComentarios() {
      this.firebaseService.getComentarios(this.idURL).subscribe(comentarios => {
        this.comentarios = comentarios;
    });
  }

  obtenerUsuario() {
    this.firebaseService.getUserByEmail(this.email).subscribe(user => {
      this.user = user;
  });
  }

  formatearFecha(fecha: Date): string {
    const opcionesDeFecha: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opcionesDeFecha);
  }
  

  async agregarComentario() {
    if (this.nuevoComentario.trim() !== '') {
      const comentario = {
        comentario: this.nuevoComentario,
        fecha: this.formatearFecha(new Date()),
        idReporte: this.idURL,
        email: this.email
      };

      try {
        // Llama al método addComentario del servicio
        await this.firebaseService.addComentario(comentario);
        this.showToast("Comentario agregado exitosamente") 
        
        // Limpia el campo de comentario después de agregarlo
        this.nuevoComentario = '';
      } catch (error) {
        this.showToast("Error al agregar comentario") 
      }
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }
  
}
