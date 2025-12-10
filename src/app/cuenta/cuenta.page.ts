import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Acceso } from '../servicio/acceso';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone:false
})
export class CuentaPage {

  txt_cedula: string = "";
  txt_nombre: string = "";
  txt_apellido: string = "";
  txt_correo: string = "";
  txt_clave: string = "";
  txt_clave2: string = "";
  mensaje: string = "";
  pregunta: string = "";
  respuesta: string = "";


  constructor(public servicio: Acceso, public modalCtrl: ModalController) {}

  ngOnInit(){}

  vclave(){
    if(this.txt_clave==this.txt_clave2){
      this.mensaje=""
    }else{
      this.mensaje="La clave no coincide"      
    }
  }

  vcedula(){
    let datos={
      accion:'vcedula',
      cedula:this.txt_cedula,
    }
    this.servicio.enviarDatos(datos,'persona').subscribe((res:any)=>{
      if(res.estado){
        this.txt_cedula=""
        this.servicio.mostrarToast(res.mensaje,3000)
      }
    })
  }
  
  guardar(){}

  cancelar(){
    this.modalCtrl.dismiss()
  }
}
