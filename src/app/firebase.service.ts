// src/app/firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
}
