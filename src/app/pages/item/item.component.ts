import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Prod } from '../../interfaces/prod.interface';


@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styles: []
})
export class ItemComponent implements OnInit {
	id:string ="";
	prod:Prod;

	constructor(
		public router:ActivatedRoute,
		public _productosService:ProductosService
		) { }

	ngOnInit() {
		this.router.params
		.subscribe( parametros =>{
			console.log(parametros['id']);
			this._productosService.obtenerProducto(parametros['id'])
			.subscribe( (resp:Prod) =>{				
				this.id = parametros['id'];
				this.prod = resp;
			});
		});
	}


}


