import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo de enrutamiento

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private router: Router) {}

  redirectToFacebook() {
    // Lógica para redirigir a la página de Facebook
    this.router.navigate(['/facebook']); // Reemplaza '/facebook' con la ruta real de tu página de Facebook
  }

  redirectToInstagram() {
    // Lógica para redirigir a la página de Instagram
    this.router.navigate(['/instagram']); // Reemplaza '/instagram' con la ruta real de tu página de Instagram
  }

  redirectToYoutube() {
    // Lógica para redirigir a la página de YouTube
    this.router.navigate(['/youtube']); // Reemplaza '/youtube' con la ruta real de tu página de YouTube
  }
}
