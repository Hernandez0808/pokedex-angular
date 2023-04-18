import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';



const routes: Routes = [ 
   
  { path: '', redirectTo: 'pokemon/1/ordenacao/inicial/tipo/todos', pathMatch: 'full' },
  { path: 'pokemon', redirectTo: 'pokemon/1/ordenacao/inicial/tipo/todos', pathMatch: 'full' },
  { path: 'pokemon/:geracao/ordenacao/:ordenacao/tipo/:tipo', component: PokedexComponent }, 
];

@NgModule({
imports: [RouterModule .forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
