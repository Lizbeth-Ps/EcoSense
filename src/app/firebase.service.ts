// src/app/firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  registrarUsuario(data: any) {
    return this.firestore.collection('usuarios').add(data);
  }
}
