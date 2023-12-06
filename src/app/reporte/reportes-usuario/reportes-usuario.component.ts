import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes-usuario',
  templateUrl: './reportes-usuario.component.html',
  styleUrls: ['./reportes-usuario.component.scss'],
})
export class ReportesUsuarioComponent  implements OnInit {

  reportes: any[] = [];
  email: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
  ) {
    this.email = localStorage.getItem('email');
  }

  ngOnInit() {
    this.reportesUsuario();
  }

  @Output() reporteSeleccionado = new EventEmitter<string>();

  reportesUsuario(): void {
    this.firebaseService.getItems()
      .subscribe((data) => {
        this.reportes = data.filter(item => item.emailCreador === this.email);
      });
  }

  onReportClick(reportId: string) {
    this.router.navigate(['reportes/seguimiento', reportId]);
    console.log('Botón presionado');
     console.log(reportId);
  }

}
