import { Component } from '@angular/core';
import { Acceso } from '../servicio/acceso';
import { ModalController, NavController } from '@ionic/angular';
import { CuentaPage } from '../cuenta/cuenta.page';
import { RecuperarPage } from '../recuperar/recuperar.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
txt_usu: string=""
txt_cla: string=""

  constructor(
    public servicio:Acceso, 
    public navCtrl: NavController,
    public modalCtrl: ModalController
    ) {}

  login(){
    let datos={
      accion:'loggin',
      usuario: this.txt_usu,
      clave:this.txt_cla
    }
    this.servicio.enviarDatos(datos,"persona").subscribe((res:any)=>{
      if(res.estado){
        this.servicio.crearSession('idpersona',res.codigo)
        this.navCtrl.navigateRoot(['/menu'])
      }
      else{
        this.servicio.mostrarToast(res.mensaje,3000)
      }
    })
  }

  async recuperar(){
    const modal = await this.modalCtrl.create({
      component:RecuperarPage
     })
     return await modal.present()
  }

  async crear(){
    const modal = await this.modalCtrl.create({
     component:CuentaPage 
    })
    return await modal.present()
  }
  
}
