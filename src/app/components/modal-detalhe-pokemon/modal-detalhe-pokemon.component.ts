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
  public objPokemon = {} as Pokemon;

  @Input() idPoke: number;
  indexPokemon: number = 0;
  @Input() lst_pokemons: any[] = [];
  @Output() PokeGrafico = {} as Pokemon;



  constructor(config: NgbModalConfig, private modalService: NgbModal, private pokeService: PokedexService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  proximo() {
    let anima = document.getElementById("animaItem") as HTMLElement;
    anima.classList.remove("fadeIn");

    if (this.lst_pokemons.length > this.indexPokemon + 1) {
      this.indexPokemon++

      anima.classList.add("fadeIn");

      setTimeout(() => {
        anima.classList.remove("fadeIn"); 
      },1000);

    } else {
      anima.classList.add("animaItem");
      
      setTimeout(() => {
        anima.classList.remove("animaItem"); 
      },1000);

    }

    this.setPokemonDetalhes(this.indexPokemon);

  }

  anterior() {
    let anima = document.getElementById("animaItem") as HTMLElement;
    anima.classList.remove("animaItem");
    anima.classList.remove("fadeIn");

    if (this.indexPokemon - 1 >= 0) {
      this.indexPokemon--

      anima.classList.add("fadeIn");

      setTimeout(() => {
        anima.classList.remove("fadeIn"); 
      },1000);

    } else {
      anima.classList.add("animaItem");

      setTimeout(() => {
        anima.classList.remove("animaItem"); 
      },1000);
    }

    this.setPokemonDetalhes(this.indexPokemon);

  }

  open(content) {
    this.modalService.open(content);

    this.indexPokemon = this.lst_pokemons.findIndex((p) => p.id == this.idPoke);

    this.objPokemon = this.lst_pokemons[this.indexPokemon];
  }

  fechar() {
    this.modalService.dismissAll();
  }

  traduzTipo(tipo): string {
    return this.pokeService.traduzNomeTipo(tipo);
  }

  setPokemonDetalhes(idPokemon: number) {
    this.objPokemon = this.lst_pokemons[idPokemon];
  }

}

