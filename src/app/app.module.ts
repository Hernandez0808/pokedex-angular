import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { ModalDetalhePokemonComponent } from './components/modal-detalhe-pokemon/modal-detalhe-pokemon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { GraficoPokemonComponent } from './components/grafico-pokemon/grafico-pokemon.component';
import { ChartModule } from 'angular-highcharts';





@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    ModalDetalhePokemonComponent,
    GraficoPokemonComponent,

    
  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    ChartModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
