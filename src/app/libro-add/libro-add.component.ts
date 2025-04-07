import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LibrosService  } from '../servicios/libros.service';
import { EditorialesService } from '../servicios/editoriales.service';
import { AutoresService } from '../servicios/autores.service';
import { Editorial } from '../entidades/editoriales';
import { Autor } from '../entidades/autores';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-libro-add',
  templateUrl: './libro-add.component.html',
  styleUrls: ['./libro-add.component.css']
})
export class LibroAddComponent implements OnInit {
  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
  libroForm: FormGroup;
  titulo:string='';
  sinopsis:string='';
  nPagina:number=null;
  editorialesId:number=0;
  isLoadingResults = false;
  dataEditorial: Editorial[] = []; 
  dataAutor: Autor[] = [];
  seleccionada: number;
  
  selectedOptions = [];
  selected = this.selectedOptions;

  constructor(private router: Router, private api: LibrosService, private apiEditorial: EditorialesService,
              private apiAutor: AutoresService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.libroForm = this.formBuilder.group({            
      'titulo' : [null, Validators.required],
      'sinopsis' : [null, Validators.required],
      'editorialesId': [null, Validators.required],
      'nPagina' : [null, Validators.required],
      
    });
    this.getEditoriales();
    this.getAutores();
    this.selectedOptions = [];
    this.selected = this.selectedOptions;

  }

  onFormSubmit(form:NgForm) {   
     this.isLoadingResults = true;
     console.log(this.selected);
     debugger;

     this.api.addLibro(form, this.selected)
       .subscribe(res => {      
         console.log("estoy en add");
         console.log(res);
           let id = res['isbn'];
           console.log(id);
           this.isLoadingResults = false;
           //this.router.navigate(['/libro-details', id]);
           this.router.navigate(['/libros']);
         }, (err) => {
           console.log(err);
           this.isLoadingResults = false;
         });
  }

  getEditoriales(){      
    this.apiEditorial.getEditoriales()
    .subscribe(res => {
      this.dataEditorial = res;
      console.log(this.dataEditorial[0].id);
      this.seleccionada = this.dataEditorial[0].id;
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
      this.seleccionada = this.dataAutor[0].id;
      console.log( this.seleccionada);
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


}
