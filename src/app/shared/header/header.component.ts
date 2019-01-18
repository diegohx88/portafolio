import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(
  		public _infoPagina:InfoPaginaService,
  		public router:Router
  	) { }

  ngOnInit() {
  }

//Función definida para pasar por parametros al search.component.ts lo que se escribe en la busqueda
  buscar( termino:string ){
  	this.router.navigate( ['/search',termino] );
  }

}
