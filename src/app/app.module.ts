import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroPageModule } from './registro/registro.module';
import { HttpClientModule } from '@angular/common/http';

//import { firebaseConfig } from '../environments/firebaseconfig';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';






@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AngularFireModule.initializeApp(environment.fIREBASE_CONFIG),
    AppRoutingModule, 
    RegistroPageModule,
    HttpClientModule,
    
   
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
