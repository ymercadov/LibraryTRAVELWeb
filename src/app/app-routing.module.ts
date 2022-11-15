import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { LibroAddComponent } from './libro-add/libro-add.component';
import { LibroDetailsComponent } from './libro-details/libro-details.component';
import { LibroEditComponent } from './libro-edit/libro-edit.component';
const routes: Routes = [
  {
    path: 'libros',
    component: LibrosComponent,
    data: { title: 'List of books' }
  },
  {
    path: 'libro-details/:id',
    component: LibroDetailsComponent,
    data: { title: 'Book Details' }
  },
  {
    path: 'libro-add',
    component: LibroAddComponent,
    data: { title: 'Add Book' }
  },
  {
    path: 'libro-edit/:id',
    component: LibroEditComponent,
    data: { title: 'Edit Book' }
  },
  { path: '',
    redirectTo: '/libros',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
