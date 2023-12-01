import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroPageModule } from './registro/registro.module';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { firebaseConfig } from '../environments/firebaseconfig';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ReportesComponent } from './reportes/reportes.component';
import { CommunicationService } from './services/comunication.service';



@NgModule({
  declarations: [AppComponent, ReportesComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AngularFireModule.initializeApp(environment.fIREBASE_CONFIG),
    AppRoutingModule, 
    RegistroPageModule,
    HttpClientModule,
    
    
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy
  }, CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
