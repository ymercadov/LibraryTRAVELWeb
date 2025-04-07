import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from '../entidades/libros';
import { LibrosService } from '../servicios/libros.service';
@Component({
  selector: 'app-libro-details',
  templateUrl: './libro-details.component.html',
  styleUrls: ['./libro-details.component.css']
})  
export class LibroDetailsComponent implements OnInit {


  libro: Libro = { isbn: null, titulo: '', editorialesId: null, sinopsis: '', nPagina : null, autores:null };
  isLoadingResults = true;
  
  constructor(private route: ActivatedRoute, private api: LibrosService, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.getLibroDetails(this.route.snapshot.params['id']);
  }

  getLibroDetails(isbn) {
    this.api.getLibro(isbn)
      .subscribe(data => {
        this.libro = data;
        console.log(this.libro);
        this.isLoadingResults = false;
      });
  }

  deleteLibro(isbn) {
    this.isLoadingResults = true;
    this.api.deleteLibro(isbn)
      .subscribe(res => {
        console.log('registro eliminado => ');
        console.log(res)
          this.isLoadingResults = false;
          this.router.navigate(['/libros']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }


}
