import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { ModalDetalhePokemonComponent } from './components/modal-detalhe-pokemon/modal-detalhe-pokemon.component';
import { GraficoPokemonComponent } from './components/grafico-pokemon/grafico-pokemon.component';



const routes: Routes = [ 
   
  { path: '', redirectTo: 'pokemon/inicial', pathMatch: 'full' },
  // { path: 'pokemon', component: PokedexComponent },
  { path: 'pokemon/inicial', component: PokedexComponent },
  // { path: 'pokemon/:id', component: PokedexComponent },
  { path: 'pokemon/ordenado/A-Z', component: PokedexComponent },
  { path: 'pokemon/ordenado/Z-A', component: PokedexComponent },
  { path: 'pokemon/ordenado/maisForte', component: PokedexComponent },
  { path: 'pokemon/ordenado/maisFraco', component: PokedexComponent },
];

@NgModule({
imports: [RouterModule .forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
