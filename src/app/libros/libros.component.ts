import { Component, OnInit } from '@angular/core';
import { Libro } from '../entidades/libros'
import { LibrosService } from '../servicios/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  displayedColumns: string[] = ['isbn', 'titulo', 'sinopsis', 'npagina'];
  data: Libro[] = [];
  isLoadingResults = true;

  constructor(private api:LibrosService) { }

  ngOnInit() {
    this.getLibros();
  }

  getLibros(){     
    this.api.getLibros()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
