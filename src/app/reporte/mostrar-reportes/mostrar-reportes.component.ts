import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';
import { CommunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-mostrar-reportes',
  templateUrl: './mostrar-reportes.component.html',
  styleUrls: ['./mostrar-reportes.component.scss'],
})
export class MostrarReportesComponent implements OnInit {
  reportes: any[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private communicationService: CommunicationService
  ) {}

  ngOnInit() {
    this.reportesTodos();
  }

  @Output() reporteSeleccionado = new EventEmitter<string>();

  reportesTodos(): void {
    this.firebaseService.getItems().subscribe((data) => {
      this.reportes = data;
      
    });
  }

  reportesUsuario(): void {
    //const userId= + localStorage.getItem('email');
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

  onReportClick(reportId: string) {
    this.router.navigate(['reportes/seguimiento', reportId]);
    console.log('Botón presionado');
     console.log(reportId);
  }



}
