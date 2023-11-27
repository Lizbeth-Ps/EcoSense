import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
//import { HomePage } from './home.page';
import { ReporteComponent } from './reporte.component'; 
import { ReportePageRoutingModule } from './reporte-routing.modules';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MostrarReportesComponent } from './mostrar-reportes/mostrar-reportes.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportePageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ReporteComponent, MostrarReportesComponent, SeguimientoComponent]//[HomePage]
})
export class RegistroPageModule {}
