import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { Prod } from '../interfaces/prod.interface';

@Injectable({
	providedIn: 'root'
})
export class ProductosService {

	cargando = true;
	productos:Producto[] = [];
	productoFiltro:Producto[] = [];
	

	constructor(
		public http: HttpClient,  		
		) { 
		this.cargarProductos();
	}

	private cargarProductos(){
		//Declaración de la promesa, que contiene un callback con un resolve y un reject
		return new Promise( (resolve, reject)=>{

			let url = 'https://angular-html-b3e4f.firebaseio.com/productos_idx.json';

			this.http.get(url)
			.subscribe( ( resp:Producto[] ) =>{
				this.productos = resp;				
				this.cargando = false;
				resolve();//con este parametro indicamos q la promesa se resolvio de manera correcta
			});
		});

	}

	obtenerProducto( id:string ){
		let url = 'https://angular-html-b3e4f.firebaseio.com/productos/' + id;
		url += '.json';
		return this.http.get( url );
	}

	//Cuando se realiza la busqueda este servicio se ejecuta antes de tener los productos cargados
	//por lo q tenemos un error de indefined
	//para solventar esto denemos utilizar una promesa en cargar productos
	//Cuando ya se tenga los productos podemos ejecutar el filtro
	buscarProducto( termino:string ){
		//validamos si tenemos productos para ejecutar el filtro
		if ( this.productos.length === 0 ){
			//cargar productos llamando la función y ejecutando un código depués de tener los productos
			//en un callback
			this.cargarProductos().then( ()=>{
				//aplicar filtro
				this.filtrarProductos( termino );
			});
			
		}else{
			//aplicar el filtro
			this.filtrarProductos( termino );
		}
	}

	private filtrarProductos( termino:string ){		
		//seteamos productoFiltro para que no acumule en cada consulta
		this.productoFiltro = [];


		termino = termino.toLocaleLowerCase();

		//Foreach barre el producto y coloca si hay considencias
		this.productos.forEach( prod =>{

			 const tituloLower = prod.titulo.toLocaleLowerCase();
			//colocamos las coincidencias que pueda haber en base al termino en el producto filtrado
			if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){

				this.productoFiltro.push( prod );	
			}
		});		
	}


}
