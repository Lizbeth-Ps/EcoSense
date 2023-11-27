import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-mostrar-reportes',
  templateUrl: './mostrar-reportes.component.html',
  styleUrls: ['./mostrar-reportes.component.scss'],
})
export class MostrarReportesComponent  implements OnInit {

  reportes: any[] = [];
  fotos: any[] =[];

  constructor( private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.reportesTodos();
  }

  reportesTodos(): void {
    this.firebaseService.getItems().subscribe((data) => {
      this.reportes = data;
      
    });
  }

  reportesUsuario(): void {
    //const userId= +localStorage.getItem('idUsuario');
    this.firebaseService.getItems()
      .subscribe((data) => {
        // Filtrar los resultados por el ID del usuario
        //this.reportes = data.filter(item => item.userId === userId);
      });
  }

  reportesAceptados(): void {
    this.firebaseService.getItems()
      .subscribe((data) => {
        // Filtrar los resultados por estatus
        this.reportes = data.filter(item => item.estatus === 1);
      });
  }

  


}
