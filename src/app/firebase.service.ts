// src/app/firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  private userEmail: string | null = null;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    // Observar cambios en la autenticación para actualizar el correo electrónico del usuario
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = null; // Asegurarse de que userEmail sea nulo si el usuario no está autenticado
      }
    });
  }

  registrarUsuario(data: any) {
    return this.firestore.collection('usuarios').add(data);
  }

  registrarReporte(data: any) {
    return this.firestore.collection('reporte').add(data);
  }

  registrarEvento(data: any) {
    return this.firestore.collection('evento').add(data);
  }

  getItems(): Observable<any[]> {
    return this.firestore.collection('reporte').valueChanges();
  }

  registrarSeguimiento(data: any) {
    return this.firestore.collection('seguimiento').add(data);
  }

  getSeguimientos(): Observable<any[]> {
    return this.firestore.collection('seguimiento').valueChanges();
  }

  agregarComentarioAReporte(reportId: string, comentario: string) {
    const fechaFormateada = format(new Date(), 'dd MMM yyyy'); 
    const comentarioData = {
      comentario,
      timestamp: fechaFormateada,
    };

    return this.firestore.collection(`reporte/${reportId}/comentarios`).add(comentarioData);
  }

  obtenerComentariosDeReporte(reportId: string): Observable<any[]> {
    return this.firestore.collection(`reporte/${reportId}/comentarios`).valueChanges();
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  setUserEmail(email: string | null): void {
    this.userEmail = email;
  }

  obtenerSeguimientoDeReporte(reportId: string): Observable<any> {
    return this.firestore.collection(`seguimiento`).doc(reportId).valueChanges();
  }
}
