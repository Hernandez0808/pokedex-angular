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
  public pokemon :Pokemon [];
  public pokemonId = {} as Pokemon;
  public idOriginal:number;
  @Input() P = {} as Pokemon;
  @Input() idPoke: number;
  @Output() PokeGrafico = {} as Pokemon;
  @Output() PokeGraficoId = {} as Pokemon;


  constructor(config: NgbModalConfig, private modalService: NgbModal, private pokeService:PokedexService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
  }
  proximo(){
    this.idPoke =  this.idPoke + 1; 
    this.pokemonId.id = this.idPoke; 

    this.pokeService.getPokemonByid(this.idPoke).subscribe((pokemon:Pokemon)=>{
      this.pokemonId = pokemon;
      this.P.name = this.pokemonId.name[0].toUpperCase() + this.pokemonId.name.substr(1);
      this.pokemon[0].stats = this.pokemonId.stats;
      this.pokemon[0].types = this.pokemonId.types;
      this.pokemon[0].name = this.pokemonId.name[0].toUpperCase() + this.pokemonId.name.substr(1);
      this.PokeGraficoId = this.pokemonId;
    });
  }
  anterior(){
    this.idPoke =  this.idPoke - 1; 
    this.pokemonId.id = this.idPoke; 

    this.pokeService.getPokemonByid(this.idPoke).subscribe((pokemon:Pokemon)=>{
      this.pokemonId = pokemon;
      this.P.name = this.pokemonId.name[0].toUpperCase() + this.pokemonId.name.substr(1);
      this.pokemon[0].stats = this.pokemonId.stats;
      this.pokemon[0].types = this.pokemonId.types;
      this.pokemon[0].name = this.pokemonId.name[0].toUpperCase() + this.pokemonId.name.substr(1);
      this.PokeGraficoId = this.pokemonId;

    });
  }

  open(content) {
    this.idOriginal = this.P.id;
    this.modalService.open(content);

      this.pokemon = this.P.results;
      this.pokemon[0].name = this.P.name[0].toUpperCase() + this.P.name.substr(1);
      this.pokemonId.id = this.P.id;
      this.pokemonId.name = this.P.name;
      
      console.log(this.pokemon);
      console.log(this.P);

  }

  fechar(){ 
    console.log(this.idOriginal);
    this.P.id = this.idOriginal; 
    this.pokeService.getPokemonByid(this.idOriginal).subscribe((pokemon:Pokemon)=>{
      this.pokemonId = pokemon;
      this.P.name = this.pokemonId.name[0].toUpperCase() + this.pokemonId.name.substr(1);
      this.pokemon[0].stats = this.pokemonId.stats;
      this.pokemon[0].types = this.pokemonId.types;
      this.PokeGraficoId = this.pokemonId;
      console.log(this.pokemonId);
      this.modalService.dismissAll();
    });

  }

}

