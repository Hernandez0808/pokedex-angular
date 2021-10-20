import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { ModalDetalhePokemonComponent } from './components/modal-detalhe-pokemon/modal-detalhe-pokemon.component';
import { GraficoPokemonComponent } from './components/grafico-pokemon/grafico-pokemon.component';



const routes: Routes = [ 
   
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
  // { path: 'pokemon', component: PokedexComponent },
  { path: 'pokemon', component: PokedexComponent },
 
];

@NgModule({
imports: [RouterModule .forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
