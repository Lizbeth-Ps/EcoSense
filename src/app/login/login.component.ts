import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,Validators.maxLength(40)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(20)])
  })
  constructor() { }

 

}
