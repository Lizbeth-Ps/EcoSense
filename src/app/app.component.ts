import { Component, OnInit } from '@angular/core';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor() {
    defineCustomElements(window);
  }
  isOn:boolean = false;
  ngOnInit(): void {
    console.log("isOn: ", this.isOn);
    console.log("Status:",localStorage.getItem("SessionStatus"));
    if(localStorage.getItem("SessionStatus") == "true"){
      this.isOn = true;
      console.log("Aquí lo muestra");
    }else{
      console.log("Aquí no lo muestra");
      this.isOn = false;
    }
  }

  logOut(){
    localStorage.clear();
  }

  isAdministrador(): boolean {
    const email = localStorage.getItem('email');
    return email === "admineco@gmail.com";
  }
}
