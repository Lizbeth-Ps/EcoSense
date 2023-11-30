import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss'],
})
export class AdministradorComponent implements OnInit {

  mostrarBoton: boolean = true;

  reportes: any[] = [];
  fotos: any[] = [];

  reportesAceptados: any[] = [];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.reportesTodos();
  }

  reportesTodos(): void {
    this.firebaseService.getItems().subscribe((data) => {
      this.reportes = data;
    });
  }

  reportesAceptado(): void {
    this.firebaseService.getItems()
      .subscribe((data) => {
        this.reportesAceptados = (data || []).filter(item => item.estatus === 1);
        this.mostrarBoton = false;
      });
  }

  reportesNoAceptados(): void {
    this.firebaseService.getItems()
      .subscribe((data) => {
        this.reportes = (data || []).filter(item => item.estatus === 0);
      });
  }

  cambiarEstatusAprobado(reporte: any): void {
    // Actualizar el estatus localmente
    reporte.estatus = 1;

    // Filtrar el reporte de la lista de "no aprobados"
    this.reportes = this.reportes.filter(item => item.titulo !== reporte.titulo);

    // Agregar el reporte a la lista de "aprobados"
    this.reportesAceptados = [...this.reportesAceptados, reporte];

    // Actualizar el estatus en la base de datos
    this.firebaseService.actualizarEstatusReporte(reporte.titulo, 1)
      .then(() => {
        console.log('Estatus actualizado correctamente.');
      })
      .catch((error) => {
        console.error('Error al actualizar el estatus:', error);
      });
  }
}





// import { Component, OnInit } from '@angular/core';
// import { FirebaseService } from '../firebase.service';

// @Component({
//   selector: 'app-administrador',
//   templateUrl: './administrador.component.html',
//   styleUrls: ['./administrador.component.scss'],
// })
// export class AdministradorComponent  implements OnInit {

//   //boton de aprobacion evento 
//   mostrarBoton :boolean = true;

//   reportes: any[] = [];
//   fotos: any[] =[];

//   reportesAceptados: any[] = [];


//   constructor( private firebaseService: FirebaseService) { }

//   ngOnInit() {
//     this.reportesTodos();
//   }

//   // TODOS LOS REPORTES QUE PODRA VER EL ADMINISTRADOR 
//   reportesTodos(): void {
//     this.firebaseService.getItems().subscribe((data) => {
//       this.reportes = data;
      
//     });
//   }

//   // TODOS LOS REPORTES QUE YA HAN SIDO ACEPTADOS 
//   reportesAceptado(): void {
//     this.firebaseService.getItems()
//       .subscribe((data) => {
//         // Filtrar los resultados por estatus
//         this.reportes = data.filter(item => item.estatus === 1);
//       });
//   }

//   //TODOS LOS REPORTES QUE NO ESTAN ACEPTADOS 
//   reportesNoAceptados(): void {
//     this.firebaseService.getItems()
//       .subscribe((data) => {
//         // Filtrar los resultados por estatus
//         this.reportes = data.filter(item => item.estatus === 0);
//       });
//   }

//   //Cambiar el estatus del evento 
  
//   cambiarEstatusAprobado(reporte: any): void {
//     // Actualizar el estatus localmente
//     reporte.estatus = 1;

//     // Filtrar el reporte de la lista de "no aprobados"
//     this.reportes = this.reportes.filter(item => item.titulo !== reporte.titulo);

//     // Agregar el reporte a la lista de "aprobados"
//     this.reportesAceptados = [...this.reportesAceptados, reporte];

//     // Actualizar el estatus en la base de datos
//     this.firebaseService.actualizarEstatusReporte(reporte.titulo, 1)
//       .then(() => {
//         console.log('Estatus actualizado correctamente.');
//       })
//       .catch((error) => {
//         console.error('Error al actualizar el estatus:', error);
//       });
//   }

// }
