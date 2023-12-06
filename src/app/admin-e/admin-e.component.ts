import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-admin-e',
  templateUrl: './admin-e.component.html',
  styleUrls: ['./admin-e.component.scss'],
})
export class AdminEComponent  implements OnInit {

  eventosForm: FormGroup;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) { 
    this.eventosForm = this.formBuilder.group({
      nombreEvento: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      costo: ['', Validators.required],
      lugar: ['', Validators.required],
    })
  }

  ngOnInit() {}


  async onSubmit() {
    if (this.eventosForm.valid) {
      let loader = await this.loadingCtrl.create({
        message: "Un momento Porfavor..."
      });
      await loader.present();

      try {
        const formData = this.eventosForm.value;

        const evento = {
          nombreEvento: formData.nombreEvento,
          descripcion: formData.descripcion,
          fecha: formData.fecha,
          costo: formData.costo,
          lugar: formData.lugar,
        };


        await this.firebaseService.registrarEvento(evento);

        this.navCtrl.navigateRoot("eventos");
      } catch (error: any) {
        let errorMessage = error.message || "Error al guardar el Evento";
        this.showToast(errorMessage);
      }

      await loader.dismiss();
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }

}
