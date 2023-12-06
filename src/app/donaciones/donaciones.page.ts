import { Component, ElementRef, NgZone } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-donaciones',
  templateUrl: 'donaciones.page.html',
  styleUrls: ['donaciones.page.scss'],
})
export class DonacionesPage {
// donarTarjetaCredito() {
// throw new Error('Method not implemented.');
// }
//   selectedAmount: string = '100'; // Valor predeterminado
//   customAmount: number | undefined;
//   showErrorMessage: boolean = false;

//   constructor(public alertController: AlertController) {}

//   donarPayPal() {
//     if (!this.selectedAmount || (this.selectedAmount === 'customAmount' && !this.customAmount)) {
//       this.showErrorMessage = true;
//       return;
//     }
//     this.showErrorMessage = false;

//     // Configura el pago de PayPal con la cantidad seleccionada
//     const amount = this.selectedAmount === 'customAmount' ? this.customAmount : this.selectedAmount;
//     const currency = 'USD'; // Cambia la moneda según tu preferencia

//     // Abre la ventana de PayPal para procesar el pago
//     window.location.href = `https://www.paypal.com/sdk/js?client-id=Ae1q0suErxixW6-32V9JphRbh51kMMQaD4v9uCp30QcuhlepIE6nYJOkdPPNwTKjQu6vD8pOCxOJWeK1`;
//   }
// }

  paymentAmount: string = '3.33';
  currency: string = 'INR';
  currencyIcon: string = '$';
  selectedAmount: any;

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.loadPaypalScript();
  }

  loadPaypalScript() {
    let script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=Ae1q0suErxixW6-32V9JphRbh51kMMQaD4v9uCp30QcuhlepIE6nYJOkdPPNwTKjQu6vD8pOCxOJWeK1';
    script.onload = () => {
      (<PayPal>window['paypal']).Buttons({ // Usa el tipo definido en el archivo de declaración
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.paymentAmount,
              },
            }],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture()
            .then((details: any) => {
              alert('!Donación realizada con exito! ' + details.payer.name.given_name + '!');
            })
            .catch((err: any) => {
              console.log(err);
            });
        },
      }).render('#paypal-button-container');
    };
    this.el.nativeElement.appendChild(script);
  }

}

