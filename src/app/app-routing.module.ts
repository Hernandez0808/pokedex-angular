import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';



const routes: Routes = [ 
   
  { path: 'pokemon/:id', component: PokedexComponent },
  // { path: 'teste', component: PokedexComponent },
  // { path: 'home', component: HomeComponent},
  // { path: 'services', component: ServicesComponent },
];

@NgModule({
imports: [RouterModule .forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
