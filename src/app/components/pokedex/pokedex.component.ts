import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Pokemon } from 'src/app/models/pokemon';
import { PokedexService } from 'src/app/service/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  constructor(private pokemonService:PokedexService) { }
   public pesquisa : any;
   public pokemons:Pokemon[];
   public pokemon = {} as Pokemon;
   public poke = [];
   public data = new Date();

  
  ngOnInit(): void {
    this.getPokemons();
    // this.pesquisa = this.pesquisar;
  }

  getPokemons(){
    this.pokemonService.getPokemon().subscribe((pokemons)=>{
      this.pokemon = pokemons;
      this.pokemons = this.pokemon.results
      this.pokemons.forEach((s, i)=>{
      // this.pokemons[i].name = this.pokemons[i].name[i].toLocaleUpperCase() + this.pokemons[i].name.substr(1);
        this.pokemonService.urlPokemon = s.url;
        this.pokemonService.getPok().subscribe((p:Pokemon[])=>{
          this.poke[i].result.push(p);
        });
      });
          this.poke = this.pokemons.map((k, i)=>{
          let o = { name:"", url:"", result:[], id:1 };
            o.name = k.name;
            o.url = k.url;
            o.id = i+1;
           return o;
        }); 
    });
  }

}
