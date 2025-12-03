import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class Acceso {
  server: string="http://localhost/WSAGENDA26/datos/persona.php"
  

constructor(public toastCtrl: ToastController, public http:HttpClient){ 
}

enviarDatos(cuerpo:any){
  let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  let opciones={
    headers:head
  }
  return this.http.post(this.server, JSON.stringify(cuerpo), opciones)
  //return this.http.post(this.server, cuerpo, opciones);

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
