import { Component, OnInit } from '@angular/core';
import { Acceso } from '../servicio/acceso';
import { Block } from '@angular/compiler';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone:false,
})
export class RecuperarPage implements OnInit {

  txt_cedula:string=""
  txt_correo:string=""
  txt_clave:string=""
  txt_clave2:string=""

  constructor(public servicio:Acceso, public modalCtrl: ModalController){}
  mensaje: string = ""
  bloqueado=false 
  ngOnInit(){
    
  }

  vclave(){
    if(this.txt_clave==this.txt_clave2){
      this.mensaje=""
      this.bloqueado=false
    }else{
      this.mensaje="La clave no coincide"      
      this.bloqueado=true
    }
  }
 
  cclave(){
    if(this.mensaje!=""){
      this.servicio.mostrarToast("Claves no coinciden",3000)
      this.bloqueado=true
    }else if(this.txt_cedula==""||this.txt_correo==""||this.txt_clave==""){
      this.servicio.mostrarToast("Faltan datos",3000)
      this.bloqueado=true
    }else{
      this.bloqueado=false
      let datos={
        accion:"cclave",
        cedula:this.txt_cedula,
        correo:this.txt_correo,
        clave:this.txt_clave,

      }
      this.servicio.enviarDatos(datos,"persona").subscribe((res:any)=>{
        this.servicio.mostrarToast(res.mensaje,3000)
        if(res.estado){
          this.modalCtrl.dismiss()
        }
      })
    }
  }
}
