import { Component, OnInit } from '@angular/core';
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
  public pokemon = {} as Pokemon;
  public id : number;
  constructor(config: NgbModalConfig, private modalService: NgbModal,
     private router:Router,
     private pokemonService: PokedexService,
     private route: ActivatedRoute) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    // this.getPokemon();  
  }
  

  open(content, id) {
    
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    console.log(this.id);
    
    this.modalService.open(content);
    
  }

    getPokemon(){
      

      this.pokemonService.getPokemonById(this.id).subscribe((pokemon:Pokemon)=>{
        this.pokemon = pokemon;
        console.log(this.pokemon);
        
      });
    }
  }

