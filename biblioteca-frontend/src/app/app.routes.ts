import { Routes } from '@angular/router';
import { LivrosComponent } from './components/livros/livros';
import { AlugueisComponent } from './components/alugueis/alugueis';

export const routes: Routes = [
  { path: '', redirectTo: 'livros', pathMatch: 'full' },
  { path: 'livros', component: LivrosComponent },
  { path: 'alugueis', component: AlugueisComponent }
];