// src/app/firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


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

  getEventos(): Observable<any[]> {
    return this.firestore.collection('evento').valueChanges();
  }

  getComentarios(idReporte: string) {
    return this.firestore.collection('comentarios', ref => ref.where('idReporte', '==', idReporte)).valueChanges();
  }

  getUserByEmail(email: string) {
    return this.firestore.collection('usuarios', ref => ref.where('correo', '==', email)).valueChanges();
  }

  setUserEmail(email: string | null): void {
    this.userEmail = email;
  }

  // Método para actualizar el estatus de un reporte
  actualizarEstatusReporte(titulo: string, nuevoEstatus: number): Promise<void> {
    const reporteRef = this.firestore.collection('reporte', ref => ref.where('titulo', '==', titulo));

    return reporteRef.get().toPromise().then((querySnapshot) => {
      if (querySnapshot !== undefined && querySnapshot.size > 0) {
        const docId = querySnapshot.docs[0].id;
        return this.firestore.collection('reporte').doc(docId).update({ estatus: nuevoEstatus });
      } else {
        console.error('Documento no encontrado con el título:', titulo);
        throw new Error('Documento no encontrado');
      }
    });
  }

  reportesPorUsuario(email: string): Promise<void | any[]> {
    const reporteRef = this.firestore.collection('reporte', ref => ref.where('emailCreador', '==', email));
  
    return reporteRef.get().toPromise().then((querySnapshot) => {
      if (querySnapshot !== undefined && querySnapshot.size > 0) {
        const docId = querySnapshot.docs[0].id;
        // Puedes devolver el valor directamente si es lo que necesitas
        return this.firestore.collection('reporte').valueChanges().toPromise();
      } else {
        console.error('No existen registros');
        throw new Error('Documento no encontrado');
      }
    });
  }
  



  getReporte(id: string): Observable<any> {
    return this.firestore.collection('reporte').doc(id).valueChanges();
  }

  addComentario(data: any) {
    return this.firestore.collection('comentarios').add(data);
  }

  
  
}
