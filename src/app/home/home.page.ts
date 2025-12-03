import { Component } from '@angular/core';
import { Acceso } from '../servicio/acceso';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
txt_usu: string=""
txt_cla: string=""

  constructor(public servicio:Acceso, public navCtrl: NavController) {}

  login(){
    let datos={
      accion:'loggin',
      usuario: this.txt_usu,
      clave:this.txt_cla
    }
    this.servicio.enviarDatos(datos).subscribe((res:any)=>{
      if(res.estado){
        this.servicio.mostrarToast(res.codigo,3000)
        this.servicio.crearSession('idpersona',res.codigo)
        this.navCtrl.navigateRoot(['/menu'])
      }
      else{
        this.servicio.mostrarToast(res.mensaje,3000)
      }
    })
  }

  recuperar(){

  }

  crear(){

  }
}
