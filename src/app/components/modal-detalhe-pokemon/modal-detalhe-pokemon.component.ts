import { Component, Input, OnInit } from '@angular/core';
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
  public pokemon :Pokemon [] ;
  @Input() idPokemon: number;
  @Input() P = {} as Pokemon;


  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private router: Router,
    private pokemonService: PokedexService,
    private route: ActivatedRoute) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content);
      this.pokemon = this.P.results;
      this.P.name = this.P.name[0].toUpperCase() + this.P.name.substr(1);

      // console.log(s);
  }

}

