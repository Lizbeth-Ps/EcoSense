import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss'],
})
export class SeguimientoComponent  implements OnInit {

  reportId: string | null = null;
  estatus: string;
  nuevoComentario: string;
  comentarios: { timestamp: string, comentario: string }[] = [];
  email: any;

  constructor(
    private route: ActivatedRoute, 
    private firebaseService: FirebaseService){
    this.estatus = 'Pendiente';
    this.nuevoComentario = '';
    this.reportId = '';
    this.email = localStorage.getItem('email');

  }

  ngOnInit() {
    this.tomarReporte();
    this.obtenerComentarios();
    this.reportId = this.route.snapshot.paramMap.get('reportId');

  // Asegurarte de tener reportId antes de llamar a tomarReporte
  if (this.reportId) {
    this.obtenerComentarios();
    this.tomarReporte();
  } else {
    console.error('Error: reportId no se ha proporcionado en la URL.');
  }
  }

  tomarReporte() {
    if (this.reportId && this.email !== null) {
      const seguimientoData = {
        userEmail: this.email, 
        estatus: this.estatus,
        comentarios: this.comentarios,
      };

      this.firebaseService.registrarSeguimiento(seguimientoData)
        .then((docRef) => {
          console.log('Seguimiento registrado exitosamente con ID:', docRef.id);
          
        })
        .catch((error) => {
          console.error('Error al registrar el seguimiento:', error);
        });
    } else {
      console.error('Error: userEmail es nulo.');
    }
  }
  
  agregarComentario() {
    if (this.email !== null) {
      if (this.nuevoComentario.trim() !== '') {
        this.firebaseService.agregarComentarioAReporte(this.email, this.nuevoComentario)
          .then(() => {
            // Limpiar el campo después de agregar el comentario
            this.nuevoComentario = '';
            // Actualizar la lista de comentarios
            this.obtenerComentarios();
          })
          .catch((error) => {
            console.error('Error al agregar comentario:', error);
          });
      }
    } else {
      console.error('Error: userEmail es nulo.');
    }
  }
  
  obtenerComentarios() {
    if (this.email !== null) {
      this.firebaseService.obtenerComentariosDeReporte(this.email)
        .subscribe((comentarios) => {
          this.comentarios = comentarios;
        });
    } else {
      console.error('Error: userEmail es nulo.');
    }
  }
}
