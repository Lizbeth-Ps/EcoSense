import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private reporteSeleccionadoSubject = new Subject<string>();

  reporteSeleccionado$ = this.reporteSeleccionadoSubject.asObservable();

  emitirReporteSeleccionado(reportId: string) {
    this.reporteSeleccionadoSubject.next(reportId);
  }
}