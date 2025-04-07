import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LibrosService } from '../servicios/libros.service';
import { EditorialesService } from '../servicios/editoriales.service';
import { AutoresService } from '../servicios/autores.service';
import { Editorial } from '../entidades/editoriales';
import { Autor } from '../entidades/autores';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-libro-edit',
  templateUrl: './libro-edit.component.html',
  styleUrls: ['./libro-edit.component.css']
})
export class LibroEditComponent implements OnInit {

  libroForm: FormGroup;
  isbn:number=null;
  titulo:string='';
  sinopsis:string='';
  editorialesId:number=null;
  nPagina:number=null;
  isLoadingResults = false;
  dataEditorial: Editorial[] = []; 
  dataAutor: Autor[] = [];
  seleccionada: string;
  seleccionadaId:number;
  selectedOptions = [];
  selected = this.selectedOptions;

  constructor(private router: Router, private route: ActivatedRoute, 
              private api: LibrosService,  private apiEditorial: EditorialesService,
              private apiAutor: AutoresService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEditoriales();
    this.getlibro(this.route.snapshot.params['id']);
    this.libroForm = this.formBuilder.group({
      'titulo' : [null, Validators.required],
      'sinopsis' : [null, Validators.required],
      'nPagina' : [null, Validators.required],
      'editorialesId' : [null, Validators.required]
    });
    this.getAutores();
    this.selectedOptions = [];
    this.selected = this.selectedOptions;
  }

  getlibro(id) {
    this.api.getLibro(id).subscribe(data => {
      this.isbn = data.isbn;
      debugger;
      this.libroForm.setValue({        
        titulo: data.titulo,
        sinopsis: data.sinopsis,
        editorialesId: data.editorialesId,
        nPagina: data.nPagina
      });
      console.log(data.autores)
      data.autores.forEach(element => {
        this.selectedOptions.push(element);
      });
      this.selected = this.selectedOptions;      
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    debugger;
    this.api.updateLibro(this.isbn, form, this.selected)
      .subscribe(res => {
          let id = res['isbn'];
          this.isLoadingResults = false;
          this.router.navigate(['/libro-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  getEditoriales(){      
    this.apiEditorial.getEditoriales()
    .subscribe(res => {
      this.dataEditorial = res;
      this.seleccionada = this.dataEditorial[0].nombre;
      console.log( this.seleccionada);
      console.log( this.dataEditorial);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  getAutores(){      
    this.apiAutor.getAutores()
    .subscribe(res => {
      this.dataAutor = res;
      console.log(this.dataAutor[0].id);
      this.seleccionadaId = this.dataAutor[0].id;
      console.log( this.seleccionadaId);
      console.log( this.dataAutor);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  getSelectedOptions(selected) {
    console.log(selected);
    this.selected = selected;
    }
  
  libroDetails() {
    this.router.navigate(['/libro-details', this.isbn]);
  }

}
