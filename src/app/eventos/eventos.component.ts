import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent  implements OnInit {

  eventos: any[] = [];

  constructor(
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit() {
    this.reportesTodos();
  }

  reportesTodos(): void {
    this.firebaseService.getEventos().subscribe((data) => {
      this.eventos = data;
      
    });
  }

}
