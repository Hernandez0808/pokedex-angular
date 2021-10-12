import { Component, OnInit } from '@angular/core';
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
   public p: Pokemon[] = [];
  
  ngOnInit(): void {
    this.getPokemons();
    // this.pesquisa = this.pesquisar;
  }

  getPokemons(){
    this.pokemonService.getPokemon().subscribe((pokemons)=>{
      this.pokemon = pokemons;
      this.pokemons = this.pokemon.results
      console.log(this.pokemon);
      console.log(this.pokemons);
      // let s = this.pokemons[0].name[0].toLocaleUpperCase() + this.pokemons[0].name.substr(1);
      let k = [];
      this.pokemons.forEach((s, i)=>{
      // this.pokemons[i].name = this.pokemons[i].name[i].toLocaleUpperCase() + this.pokemons[i].name.substr(1);
        this.pokemonService.urlPokemon = s.url;
        
        this.pokemonService.getPok().subscribe((p:Pokemon[])=>{
            // k.push(p);
            

            
            
        });
      });
      console.log(k);
    });
  }

}
