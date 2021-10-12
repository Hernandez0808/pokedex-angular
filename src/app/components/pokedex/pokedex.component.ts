import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokedexService } from 'src/app/service/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  constructor(private pokemonService:PokedexService) { }

   public pokemons:Pokemon[];
   public pokemon = {} as Pokemon;

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(){
    this.pokemonService.getPokemon().subscribe((pokemons)=>{
      this.pokemon = pokemons;
      this.pokemons = this.pokemon.results
      console.log(this.pokemon);
      console.log(this.pokemons);
      // let s = this.pokemons[0].name[0].toLocaleUpperCase() + this.pokemons[0].name.substr(1);

      // this.pokemons.forEach((s, i)=>{
      // this.pokemons[i].name = this.pokemons[i].name[i].toLocaleUpperCase() + this.pokemons[i].name.substr(1);
      //   // console.log(i);
      // });
    
    });
  }

}
