import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Pokemon } from 'src/app/models/pokemon';
import { PokedexService } from 'src/app/service/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  constructor(private pokemonService:PokedexService,
   private route: ActivatedRoute,

    config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    }
   public pesquisa : any;
   public pokemons:Pokemon[];
   public pokemon = {} as Pokemon;
   public poke = [];
   public data = new Date();
   @Output() idPoke: number;
 public  teste : Pokemon[];
  
  ngOnInit(): void {
    this.getPokemons();

  }
  getPokemons(){
    
    this.pokemonService.getPokemon().subscribe((pokemons)=>{
      this.pokemon = pokemons;
      this.pokemons = this.pokemon.results;
      
      this.poke = this.pokemons.map((k, i)=>{
        let o = { name:"", id:1 };
          o.name = k.name;
          o.id = i+1;
         return o;
      }); 
     
      this.poke.forEach((s, i)=>{
          this.poke[i].name = this.poke[i].name[0].toUpperCase() + this.poke[i].name.substr(1);
      });
    });
  }

}
