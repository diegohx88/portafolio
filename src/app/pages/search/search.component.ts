import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  constructor(
  		public router:ActivatedRoute,
  		public _productosService:ProductosService
  	) { }

  ngOnInit() {
  	//Recibe los parámetros del search en el header.component.ts
  	//busca el producto en el servicio
  	this.router.params
  	.subscribe(params =>{
  		//console.log(params['termino']);
  		this._productosService.buscarProducto( params['termino'] );
  	});
  }

}
