import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

cargando = true;
productos:Producto[] = [];

  constructor(
  		public http: HttpClient,  		
  	) { 
  		this.cargarProductos();
  	}

  private cargarProductos(){
  	let url = 'https://angular-html-b3e4f.firebaseio.com/productos_idx.json';

  	this.http.get(url)
  	.subscribe( (resp:Producto[]) =>{
  		this.productos=resp;
  		console.log(this.productos);
  		this.cargando = false;
  	})
  }


}
