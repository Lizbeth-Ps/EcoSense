import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
<<<<<<< Updated upstream
import { ReportesComponent } from './reportes/reportes.component';
import { SeguimientoComponent } from './reportes/seguimiento/seguimiento.component';
=======
import { MostrarReportesComponent } from './reporte/mostrar-reportes/mostrar-reportes.component';
import { SeguimientoComponent } from './reporte/seguimiento/seguimiento.component';
>>>>>>> Stashed changes

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
<<<<<<< Updated upstream
    redirectTo: 'home',
=======
    redirectTo: 'crearReporte',
>>>>>>> Stashed changes
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
<<<<<<< Updated upstream
    path: 'reportes',
    component: ReportesComponent
  }, 
  {
    path: 'reportes/seguimiento',
    component: SeguimientoComponent
=======
    path: 'crearReporte',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.RegistroPageModule)
>>>>>>> Stashed changes
  },
  {
    path: 'reportes',
    component: MostrarReportesComponent
  }, 
  {
    path: 'reportes/seguimiento',
    component: SeguimientoComponent
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
