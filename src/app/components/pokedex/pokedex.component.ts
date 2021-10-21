import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
    private router:Router,
     config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
    }
   public pesquisa : any;
   public pokemons:Pokemon[];
   public pokemon = {} as Pokemon;
   public poke = [];
   public padrao;
   public ativa:boolean = false;
   public data = new Date();
   @Output() idPoke: number;
  
  ngOnInit(): void {
    this.getPokemons();
   
  }
  getPokemons(){
    this.pokemonService.getPokemon().subscribe((pokemons)=>{
      this.pokemon = pokemons;
      this.pokemons = this.pokemon.results;


      this.poke = this.pokemons.map((k, i)=>{
        let o = { name:"", id:1, pts:1};
          o.name = k.name;
          o.id = i+1;

         return o;
        }); 
  
      this.poke.forEach((s, i)=>{
          this.poke[i].name = this.poke[i].name[0].toUpperCase() + this.poke[i].name.substr(1);
      });
      this.pokemons.forEach((s,i)=>{
        this.pokemonService.urlPoke = s.url;
        let pts = [];
        let p;
      this.pokemonService.getPok().subscribe((pokemons)=>{
         pts = pokemons.stats;
         p = pts.reduce((a, b) =>  a + b.base_stat, 0);
           this.poke[i].pts = p;
           
          });
      });
      this.padrao = this.poke;
    });

  }
  padraoInit(){
    this.poke.sort((a,b)=> {
      if(a.id > b.id) {//ordenando do mais forte ao mais fraco 
        return 1;
      } else {
        return -1;
      }
    });
    let ac1 = document.getElementById("ac1") as HTMLElement;
    ac1.classList.add("active");

    let ac2 = document.getElementById("ac2") as HTMLElement;
    ac2.classList.remove("active");
    let ac3 = document.getElementById("ac3") as HTMLElement;
    ac3.classList.remove("active");
    let ac4 = document.getElementById("ac4") as HTMLElement;
    ac4.classList.remove("active"); 
    let ac5 = document.getElementById("ac5") as HTMLElement;
    ac5.classList.remove("active"); 
  }
  alfabeticoAZ(){
    this.poke.sort((a,b)=>{
      let x = a.name.toUpperCase(),
      y = b.name.toUpperCase();
      return x == y ? 0   : x > y ? 1 :-1; 
//sem distinção entre letras maiúsculas e minúsculas, você passa a função de comparação transformando todas as letras das strings em maiúsculas antes de efetuar a comparação, da seguinte forma:
       });
       let ac2 = document.getElementById("ac2") as HTMLElement;
       ac2.classList.add("active"); 

    let ac1 = document.getElementById("ac1") as HTMLElement;
    ac1.classList.remove("active"); 
    let ac3 = document.getElementById("ac3") as HTMLElement;
    ac3.classList.remove("active");
    let ac4 = document.getElementById("ac4") as HTMLElement;
    ac4.classList.remove("active"); 
    let ac5 = document.getElementById("ac5") as HTMLElement;
    ac5.classList.remove("active");
  }

  alfabeticoZA(){
    this.poke.sort((a,b)=>{
      let x = a.name.toUpperCase(),
      y = b.name.toUpperCase();
      return x == y ? 0   : y > x ? 1 :-1; 
//sem distinção entre letras maiúsculas e minúsculas, você passa a função de comparação transformando todas as letras das strings em maiúsculas antes de efetuar a comparação, da seguinte forma:
       });
       let ac3 = document.getElementById("ac3") as HTMLElement;
       ac3.classList.add("active"); 

    let ac1 = document.getElementById("ac1") as HTMLElement;
    ac1.classList.remove("active");
    let ac2 = document.getElementById("ac2") as HTMLElement;
    ac2.classList.remove("active");
    let ac4 = document.getElementById("ac4") as HTMLElement;
    ac4.classList.remove("active");
    let ac5 = document.getElementById("ac5") as HTMLElement;
    ac5.classList.remove("active");
  }

  pontosAtributoMaior(){
    this.poke.sort((a,b)=> {
      if(a.pts < b.pts) {//ordenando do mais forte ao mais fraco 
        return 1;
      } else {
        return -1;
      }
    });
    let ac4 = document.getElementById("ac4") as HTMLElement;
    ac4.classList.add("active"); 

    let ac1 = document.getElementById("ac1") as HTMLElement;
    ac1.classList.remove("active"); 
    let ac2 = document.getElementById("ac2") as HTMLElement;
    ac2.classList.remove("active"); 
    let ac3 = document.getElementById("ac3") as HTMLElement;
    ac3.classList.remove("active"); 
    let ac5 = document.getElementById("ac5") as HTMLElement;
    ac5.classList.remove("active"); 
  }

  
  pontosAtributoMenor(){
    this.poke.sort((a,b)=> {
      if(b.pts < a.pts) {//ordenando do mais forte ao mais fraco 
        return 1;
      } else {
        return -1;
      }
    });

    let ac5 = document.getElementById("ac5") as HTMLElement;
    ac5.classList.add("active"); 

    let ac1 = document.getElementById("ac1") as HTMLElement;
    ac1.classList.remove("active"); 
    let ac2 = document.getElementById("ac2") as HTMLElement;
    ac2.classList.remove("active"); 
    let ac3 = document.getElementById("ac3") as HTMLElement;
    ac3.classList.remove("active"); 
    let ac4 = document.getElementById("ac4") as HTMLElement;
    ac4.classList.remove("active"); 
  }



}
