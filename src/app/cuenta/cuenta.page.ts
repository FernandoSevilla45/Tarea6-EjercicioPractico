import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Acceso } from '../servicio/acceso';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone:false
})
export class CuentaPage {

  ci: string = "";
  nombre: string = "";
  apellido: string = "";
  correo: string = "";
  clave: string = "";
  pregunta: string = "";
respuesta: string = "";


  constructor(public servicio: Acceso, public navCtrl: NavController) {}

  crearCuenta() {

    if(this.ci=="" || this.nombre=="" || this.apellido=="" || this.correo=="" || this.clave==""){
      this.servicio.mostrarToast("Complete todos los campos", 2000);
      return;
    }

    let datos = {
      accion: "insertar",
      ci: this.ci,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      clave: this.clave,
      pregunta: this.pregunta,
      respuesta: this.respuesta
    };
    

    this.servicio.enviarDatos(datos, "persona").subscribe((res:any)=>{
      if(res.estado){
        this.servicio.mostrarToast(res.mensaje, 2000);
        this.navCtrl.back();  // vuelve al login
      } else {
        this.servicio.mostrarToast(res.mensaje, 3000);
      }
    });
  }

}
