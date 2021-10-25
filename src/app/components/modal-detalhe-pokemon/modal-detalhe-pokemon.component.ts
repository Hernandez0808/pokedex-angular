import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from 'src/app/models/pokemon';
import { PokedexService } from 'src/app/service/pokedex.service';

@Component({
  selector: 'app-modal-detalhe-pokemon',
  templateUrl: './modal-detalhe-pokemon.component.html',
  styleUrls: ['./modal-detalhe-pokemon.component.css']
})
export class ModalDetalhePokemonComponent {
  public pokemonId = {} as Pokemon;
  public idControle: number;

  @Input() idPoke: number;
  @Output() PokeGrafico = {} as Pokemon;


  constructor(config: NgbModalConfig, private modalService: NgbModal, private pokeService: PokedexService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  proximo() {
    let anima = document.getElementById("animaItem") as HTMLElement;
    anima.classList.remove("animaItem");
    if (this.idControle + 1 == 152){
      anima.classList.add("animaItem");
    }

    if(151>this.idControle){
      this.idControle = this.idControle + 1; 
      this.pokeService.getPokemonByid(this.idControle).subscribe((pokemon: Pokemon) => {
      this.pokemonId = pokemon;
      this.pokemonId.name = this.pokemonId.name[0].toUpperCase() + this.pokemonId.name.substr(1);
      this.PokeGrafico = this.pokemonId;

    });
    }
  }

  anterior() {
    let anima = document.getElementById("animaItem") as HTMLElement;
    anima.classList.remove("animaItem");
    if (this.idControle - 1 == 0){
      anima.classList.add("animaItem");
    }
    if(this.idControle > 1 ){
    this.idControle = this.idControle - 1;
    
    }
    
    if (this.idControle>0) {
      this.pokeService.getPokemonByid(this.idControle).subscribe((pokemon: Pokemon) => {
        this.pokemonId = pokemon;
        this.pokemonId.name = this.pokemonId.name[0].toUpperCase() + this.pokemonId.name.substr(1);
        this.PokeGrafico = this.pokemonId;
      });
     
    }
  }

  open(content) {
    this.idControle = this.idPoke;
    this.pokeService.getPokemonByid(this.idPoke).subscribe((pokemon: Pokemon) => {
      this.modalService.open(content);
      this.pokemonId = pokemon;
      this.pokemonId.name = this.pokemonId.name[0].toUpperCase() + this.pokemonId.name.substr(1);
      this.PokeGrafico = this.pokemonId;
      console.log(this.pokemonId);
    });

  }
  fechar() {
    this.modalService.dismissAll();
  }

}

