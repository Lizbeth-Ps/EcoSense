import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Platform, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
//import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
})
export class ReporteComponent implements OnInit {

  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;

  private platform: Platform;


  reporteDatos: any;

  //items: Observable<String[]>

  fotosService: any = "";

  mapa: boolean = false;

  fotos: any[] = [];

  fotosCelular: any[] = [];

  fotosAll: any[] = [];

  formData = {
    lugar: '',
    descripcion: '',
    titulo: ''
  };

  ubicacion = {
    latitud: 0,
    longitude: 0
  }


  constructor(public photoService: PhotoService, platform: Platform, private toastCtrl: ToastController,
    private firebaseService: FirebaseService) {
    this.platform = platform;
  }

  async ngOnInit() {
    await this.obtenerPosicionActual();
    //await this.ubicacionUsuario();
    // await this.photoService.loadSaved();
    //this.iniciar()
  }

  
  async obtenerPosicionActual() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.ubicacion.latitud = coordinates.coords.latitude;
      this.ubicacion.longitude = coordinates.coords.longitude;
    } catch (error) {
      console.error('Error al obtener la posición:', error);
    }
  }

  async guardar() {
    // Aquí puedes usar this.formData.nombre y this.formData.correo para acceder a los datos ingresados

    const email = localStorage.getItem('email');

    const randomString = Math.floor(Math.random() * 1000000000).toString(36);


    const reporte: Reporte = {
      titulo: this.formData.titulo,
      lugar: this.formData.lugar,
      descripcion: this.formData.descripcion,
      longitude: this.ubicacion.longitude,
      latitude: this.ubicacion.latitud,
      estatus: 0,
      emailCreador: email,
      idReporte : randomString,
      imagenes: []
    };

    interface Reporte {
      titulo: String,
      lugar: String,
      descripcion: String,
      longitude: Number,
      latitude: Number,
      estatus: Number;
      emailCreador:any,
      idReporte:any,
      imagenes: any[]; // Aquí asumo que las imágenes son cadenas (strings)
      // ... otras propiedades del objeto Reporte si las tienes ...
    }

    if (this.platform.is('hybrid')) {

      reporte.imagenes = this.fotosCelular;

    } else{
      reporte.imagenes = this.fotos;
    }

    this.reporteDatos = reporte;

    console.log("Este es el final", this.reporteDatos);

    //this.mapa = false;

    this.fotos = [];
    this.fotosCelular = [];
    this.formData.descripcion = "";
    this.formData.lugar = "";
    this.formData.titulo = "";
    this.mapa = false;

    await this.firebaseService.registrarReporte(reporte);

    this.showToast("Registro guardado correctamente")

    // Puedes enviar los datos a un servicio, guardar en una base de datos, etc.
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }

  async ubicacionUsuario() {
    this.mapa =true;
    await this.obtenerPosicionActual();
    await this.createMap();

  }


  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }



  /*iniciar(){
    CapacitorGoogleMaps.initialize({
      key: environment.mapsKey
     });
  }*/


  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsKey,
      config: {
        center: {
          lat: this.ubicacion.latitud,
          lng: this.ubicacion.longitude,
        },
        zoom: 15,
      },
    });
  }

  async addPhotoToGallery() {

    if (this.platform.is('hybrid')) {
      const isImageSavedCel = await this.photoService.addNewToGallery();

      const imagenCel = "data:image/jpeg;base64,"+ isImageSavedCel

      this.fotosCelular.push(imagenCel);
     
     /* this.photoService.photos.forEach((photo, index) => {
        // Aquí puedes acceder a cada elemento 'photo' y su índice 'index'
        console.log(`Índice: ${index}, Foto:`, photo.imagen64);
         this.fotosCelular.push(photo.imagen64);
      });*/

    } else {
      try {
        const isImageSaved = await this.photoService.addNewToGalleryCPU(this.reporteDatos)
        if (isImageSaved) {
          // La imagen se ha guardado correctamente, muestra el div
          this.fotos.push(isImageSaved);
          //this.eliminar = true;
        } else {
          // Error al guardar la imagen, puedes manejar el error o mostrar un mensaje al usuario
          console.error('Error al guardar la imagen. por if');
          // También puedes dejar this.eliminar como falso para ocultar el div en caso de error
          //this.eliminar = false;
        }
      } catch (error) {
        // Error al guardar la imagen, puedes manejar el error o mostrar un mensaje al usuario
        console.error('Error al guardar la imagen:', error);
        // También puedes dejar this.eliminar como falso para ocultar el div en caso de error
        //this.eliminar = false;
      }
    }
  }

}