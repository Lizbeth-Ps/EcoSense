import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
//Login
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user = {} as User;
  loginForm: FormGroup;
  
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.maxLength(40)]],
      password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]]
    });

  }

  ngOnInit(){}
 
  async login(user:User){

    if(this.loginForm){
      let loader = await this.loadingCtrl.create({
        message: "Espere un momento por favor..."
      });
      await loader.present();

      try {
        const formData = this.loginForm.value;
        await this.afAuth.signInWithEmailAndPassword(formData.email, formData.password).then(data=>{
          console.log(data);
          if(formData.email === "admineco@gmail.com" && formData.password === "admineco23"){
            this.navCtrl.navigateRoot("administrador");
          }else{
            this.navCtrl.navigateRoot("home");
          }
          
        });
      }catch (e:any){
        e.message = "Usuario no registrado";
        let errorMessage = e.message || e.getLocalizedMessage();

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
