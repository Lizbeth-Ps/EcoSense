import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/firebase.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  
  redirectToYoutube() {
    throw new Error('Method not implemented.');
  }
  redirectToFacebook() {
    throw new Error('Method not implemented.');
  }
  redirectToInstagram() {
    throw new Error('Method not implemented.');
  }
  redirectToOtherUsefulPage() {
    throw new Error('Method not implemented.');
  }
  redirectToPrivacyPolicy() {
    throw new Error('Method not implemented.');
  }
  signin() {
    throw new Error('Method not implemented.');
  }
  registroForm: FormGroup;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: '',
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  async onSubmit() {
    if (this.registroForm.valid) {
      let loader = await this.loadingCtrl.create({
        message: "Espere por favor..."
      });
      await loader.present();

      try {
        const formData = this.registroForm.value;
        await this.afAuth.createUserWithEmailAndPassword(formData.correo, formData.contrasena);

        const usuario = {
          nombre: formData.nombre,
          apellidoPaterno: formData.apellidoPaterno,
          apellidoMaterno: formData.apellidoMaterno,
          correo: formData.correo,
        };


        await this.firebaseService.registrarUsuario(usuario);

        this.navCtrl.navigateRoot("login");
      } catch (error: any) {
        let errorMessage = error.message || "Error al registrarse";
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
