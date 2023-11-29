import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MostrarReportesComponent } from './reporte/mostrar-reportes/mostrar-reportes.component';
import { SeguimientoComponent } from './reporte/seguimiento/seguimiento.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',

    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'crearReporte',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.RegistroPageModule)

  },
  {
    path: 'reportes',
    component: MostrarReportesComponent
  }, 
  {
    path: 'reportes/seguimiento',
    component: SeguimientoComponent
  },
  {
    path: 'reporte',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./admin-e/admin.module').then( m => m.AdminModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./administrador/administrador.module').then( m => m.AdministradorModule)
  }
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
