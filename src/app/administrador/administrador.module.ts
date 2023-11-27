import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmininistradorPageRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdmininistradorPageRoutingModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AdministradorComponent]
})
export class AdministradorModule { }
