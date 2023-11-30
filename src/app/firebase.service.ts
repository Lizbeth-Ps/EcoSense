// src/app/firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

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
  
}
