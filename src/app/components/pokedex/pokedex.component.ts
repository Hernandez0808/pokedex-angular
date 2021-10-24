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
   public PokeFiltro = [];
   public pokemons:Pokemon[];
   public pokemon = {} as Pokemon;
   public poke = [];
   public tipos = [];
   public vazio //deixar o select em branco

   public ativa:boolean = false;
   public data = new Date();

   @Output() idPoke: number;
  
  ngOnInit() {
    this.getPokemons();
 
  }
  getPokemons(){
    this.pokemonService.getPokemon().subscribe((pokemons)=>{
      this.pokemon = pokemons;
      this.pokemons = this.pokemon.results;
      
      this.pokemons.forEach((s,i)=>{
        this.pokemonService.urlPoke = s.url;
        let pts = [];
        let type = [];
        let p;
      this.pokemonService.getPok().subscribe((pokemons)=>{
         pts = pokemons.stats;
         type = pokemons.types;
         p = pts.reduce((a, b) =>  a + b.base_stat, 0);
         type = type.map(o=> o.type.name);
        this.tipos.push(...type);
        let obj = {id:pokemons.id, name:pokemons.name, pts:p, types:type }

        this.poke.push(obj);     
          this.poke.forEach((s, i)=>{
          this.poke[i].name = this.poke[i].name[0].toUpperCase() + this.poke[i].name.substr(1);
          
          
        });
       this.tipos = this.tipos.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        });
        this.tipos.forEach((s,i)=>{
          this.tipos[i] = this.tipos[i][0].toUpperCase() + this.tipos[i].substr(1);
        });
        this.tipos.sort((a,b)=>{
          let x = a.toUpperCase(),
          y = b.toUpperCase();
          return x == y ? 0   : x > y ? 1 :-1; 
    //sem distinção entre letras maiúsculas e minúsculas, você passa a função de comparação transformando todas as letras das strings em maiúsculas antes de efetuar a comparação, da seguinte forma:
           });
      this.padraoInit();  
      this.PokeFiltro = this.poke;  
    });
  
  });  
   
  });
}
selTipo(s){
  
  s = s.toLowerCase();
  if(s == "inicial"){
    this.getPokemons();
  }
  this.poke = this.PokeFiltro.filter((o,i)=>{return o.types[0] == s || o.types[1] == s;  });
  
  console.log(this.poke);
  console.log(s);
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
