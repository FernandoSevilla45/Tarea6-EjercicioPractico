import { Component, OnInit } from '@angular/core';
import { Acceso } from '../servicio/acceso';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-econtacto',
  templateUrl: './econtacto.page.html',
  styleUrls: ['./econtacto.page.scss'],
  standalone:false,
})
export class EcontactoPage implements OnInit {

   contacto:any=[]
  txtnombre:string=""
  txtapellido:string=""
  txttelefono:string=""
  txtemail:string=""
  cod_contacto:string=""
  
    constructor( public servicio:Acceso, public navCtrl:NavController) { 
      this.servicio.obtenerSesion("idcontacto").then((res:any)=>{
        this.cod_contacto=res
        this.cargarDatos(this.cod_contacto)
      })
    }

  ngOnInit() {
  }

  cargarDatos(idcontacto:string){
    let datos={
      accion:"consultarDato",
      cod_contacto:idcontacto
    }
      this.servicio.enviarDatos(datos, "contacto").subscribe((res:any)=>{
        if(res.estado){
          this.contacto=res.contacto
          this.txtnombre=this.contacto.nom_contacto
          this.txtapellido=this.contacto.ape_contacto
          this.txttelefono=this.contacto.telefono_contacto
          this.txtemail=this.contacto.email_contacto
        }else{
          this.servicio.mostrarToast(res.mensaje,3000)
        }
      })
    }

   eliminar(){
    let datos={
      accion: "eliminar",
      cod_contacto:this.cod_contacto,
    }
    this.servicio.enviarDatos(datos,"contacto").subscribe((res:any)=>{
      if(res.estado){
        this.servicio.mostrarToast(res.mensaje,3000)
        this.navCtrl.back()
      }else{
        this.servicio.mostrarToast(res.mensaje,3000)
      }
    })
  }

}
