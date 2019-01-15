import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';
@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
	info:infoPagina = {};
	cargada = false;
  equipo:any[] = [];

  constructor(
    public http: HttpClient
    ) {
  	this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    console.log('Servicio info-pagina listo'); 

    //Leer el archivo json con una peticion http
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp:infoPagina) =>{
      //console.log(resp['email']);//de la resp quiero la propiedad titulo
      console.log(resp.email);
      this.cargada = true;
      this.info = resp;        
    });
  }

  //******************************************************
  // Funcion definida para cargar los datos del equipo
  //******************************************************
  private cargarEquipo(){
    let url = 'https://angular-html-b3e4f.firebaseio.com/equpo.json';

    this.http.get(url)
    .subscribe( (resp:any) => {      
      this.equipo = resp;
      console.log(this.equipo);
    });
  }
}
