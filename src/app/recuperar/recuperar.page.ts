import { Component } from '@angular/core';
import { Acceso } from '../servicio/acceso';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone:false,
})
export class RecuperarPage {

  paso = 1;

  ci = "";
  pregunta = "";
  respuesta = "";
  clave = "";
  codigo = "";  // ID persona

  constructor(public servicio: Acceso) {}

  buscarPregunta() {
    let datos = {
      accion: "buscarPregunta",
      ci: this.ci
    };

    this.servicio.enviarDatos(datos, "persona").subscribe((res:any) => {
      if(res.estado){
        this.pregunta = res.pregunta;
        this.paso = 2;
      } else {
        this.servicio.mostrarToast(res.mensaje, 3000);
      }
    });
  }

  validarRespuesta() {
    let datos = {
      accion: "validarRespuesta",
      ci: this.ci,
      respuesta: this.respuesta
    };

    this.servicio.enviarDatos(datos, "persona").subscribe((res:any) => {
      if(res.estado){
        this.codigo = res.codigo;
        this.paso = 3;
      } else {
        this.servicio.mostrarToast(res.mensaje, 3000);
      }
    });
  }

  actualizarClave() {
    let datos = {
      accion: "actualizarClave",
      codigo: this.codigo,
      clave: this.clave
    };

    this.servicio.enviarDatos(datos, "persona").subscribe((res:any) => {
      this.servicio.mostrarToast(res.mensaje, 3000);
      if(res.estado){
        this.paso = 1; // Reiniciar
        this.ci = "";
        this.respuesta = "";
        this.clave = "";
      }
    });
  }

}
