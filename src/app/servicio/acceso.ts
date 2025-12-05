import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class Acceso {
  persona: string="http://localhost/WSAGENDA26/datos/persona.php"
  contacto: string="http://localhost/WSAGENDA26/datos/contacto.php"  
  server:string=""
constructor(public toastCtrl: ToastController, public http:HttpClient){ 
}

enviarDatos(cuerpo:any, tabla:string){
  if(tabla=="persona"){
    this.server=this.persona
  }else{
    this.server=this.contacto
  }
this.mostrarToast(this.server,3000)
  let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  let opciones={
    headers:head
  }
  return this.http.post(this.server, JSON.stringify(cuerpo), opciones)

}


async mostrarToast(mensaje:string, tiempo:number){
  const toast= await  this.toastCtrl.create({
    message: mensaje,
    duration:tiempo,
    position:'top'
  })
  toast.present()
}

async crearSession(id:string, valor:string){
  await Preferences.set({
    key:id,
    value:valor
  })
}

async obtenerSesion(id:string){
  const item= await Preferences.get({
    key:id
  })
  return item.value
}

async cerrarSesion(){
  await Preferences.clear()
}

}
