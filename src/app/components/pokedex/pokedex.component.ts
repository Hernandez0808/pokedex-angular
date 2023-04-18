import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { concatAll, from, map } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokedexService } from 'src/app/service/pokedex.service';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  constructor(private pokemonService: PokedexService,
    private router: Router,
    private rota_ativa: ActivatedRoute,
    config: NgbModalConfig) {

    config.backdrop = 'static';
    config.keyboard = false;
  }
  public pesquisa: any;
  public lst_pokemons_backup: any[] = [];
  public lst_pokemons: any[] = [];
  public _lst_pokemons_tipos: any[] = [];

  public lst_geracao: any[] = [{ name: '1ª Geração - Kanto', geracao: 1 }, { name: '2ª Geração - Johto', geracao: 2 },
  { name: '3º Geração - Hoenn', geracao: 3 }, { name: '4º Geração - Sinnoh', geracao: 4 }, { name: '5º Geração - Unova', geracao: 5 },
  { name: '6º Geração - Kalos', geracao: 6 }, { name: '7º Geração - Alola', geracao: 7 }, { name: '8º Geração - Galar', geracao: 8 }, { name: '9º Geração - Paldea', geracao: 9 }]
  public tipo_selecionado: string = "" //deixar o select em branco

  public ativa: boolean = false;
  public data = new Date();

  _geracao: number = 1;

  @Output() idPoke: number;

  ngOnInit() {
    const _geracao = Number(this.rota_ativa.snapshot.paramMap.get('geracao'));

    if (!isNaN(_geracao)) {
      if (_geracao > 0 && 9 >= _geracao) {
        this._geracao = _geracao;
      }
    }
    this.getAllPokemonsTipos();

    this.getPokemons();

  }
  getPokemons() {

    this.lst_pokemons = [];
    this.pokemonService.getPokemon(this._geracao).subscribe((pokemons) => {

      pokemons.results.forEach((pokemon: any, index: number) => {

        this.pokemonService.getPok(pokemon.url).subscribe((pokemon: any) => {
          let objPokemon = {} as any;

          objPokemon.id = pokemon.id;
          objPokemon.name = pokemon.name;
          objPokemon.pts = pokemon.stats.reduce((a, b) => a + b.base_stat, 0);
          objPokemon.tipos = pokemon.types.map((t) => t.type.name);

          this.lst_pokemons.push(objPokemon);

          this.lst_pokemons.forEach((s, i) => {
            this.lst_pokemons[i].name = this.lst_pokemons[i].name[0].toUpperCase() + this.lst_pokemons[i].name.substr(1);
          });

          this.padraoInit();
          this.lst_pokemons_backup = JSON.parse(JSON.stringify(this.lst_pokemons));

          if (this.tipo_selecionado) {
            this.selTipo(this.tipo_selecionado);
          }

        });
      });
      // setTimeout(() => { 
      //   // let s  = this.itensUnicos(this.tipos); 
      //   console.log(tipos_pokemons);
      //   tipos_pokemons.forEach((tipo)=>{
      //     console.log(tipo)
      //   });
      // });
      //   let observables = pokemons.results.map((pokemon:any, index:number)=>{//cria observaveis para tipos

      //     return this.pokemonService.getPok(pokemon.url).pipe(map((pokemon:any)=>{

      //       let objPokemon = {} as any;
      //       objPokemon.id = pokemon.id;
      //       objPokemon.name = pokemon.name;
      //       objPokemon.pts = pokemon.stats.reduce((a, b) =>  a + b.base_stat, 0);
      //       objPokemon.tipos = pokemon.types.map(o =>{
      //         let obj = {name:""};
      //         obj.name = o.type.name;
      //         tipos_pokemons.push(o.type.name);
      //         return obj;
      //       });
      //       this.lst_pokemons.push(objPokemon);          
      //       this.lst_pokemons.forEach((s, i)=>{
      //         this.lst_pokemons[i].name = this.lst_pokemons[i].name[0].toUpperCase() + this.lst_pokemons[i].name.substr(1);
      //       });
      //       this.padraoInit();  
      //       this.lst_pokemons_backup = JSON.parse(JSON.stringify(this.lst_pokemons));  
      //       return tipos_pokemons
      //     }));

      //   });

      //   // concatenar os observables em um único observable e converter em uma promise
      //   let observableConcat = from(observables).pipe(concatAll()); 
      //   // from para converter o array de observables em um único observable e o operador
      //   //concatAll() para concatenar os resultados de todas as Promises geradas pela chamada ao serviço
      //   let promise = observableConcat.toPromise();

      //   promise.then((tipos_pokemons) => {
      //     this.tipos = this.itensUnicos(tipos_pokemons);

      //   }).catch((err) => {
      //     console.error(err);
      //   });
    });
  }

  getAllPokemonsTipos() {
    const param_url_tipo = this.rota_ativa.snapshot.paramMap.get('tipo');
    this.pokemonService.getAllTiposPokemon().subscribe((lst_pokemons_tipos: Pokemon) => {
      this._lst_pokemons_tipos = lst_pokemons_tipos.results.map((t: any) => t.name);

      let tipo = this._lst_pokemons_tipos.find((t) => t == param_url_tipo);

      if (tipo) {
        this.tipo_selecionado = tipo;
      }
    });
  }

  selTipo(tipo) {
    tipo = tipo.toLowerCase();
    if (tipo == "inicial") {
      this.getPokemons();
    }
    this.router.navigate(['pokemon/' + this._geracao + '/tipo/' + tipo]);
    this.lst_pokemons = this.lst_pokemons_backup.filter((o, i) => { return o.tipos[0] == tipo || o.tipos[1] == tipo; });

  }

  selGeracao(_geracao) {
    this.router.navigate(['pokemon/' + this._geracao]);
    this.getPokemons();

  }

  padraoInit() {
    this.lst_pokemons.sort((a, b) => {
      if (a.id > b.id) {//ordenando do mais forte ao mais fraco 
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

  alfabeticoAZ() {
    this.lst_pokemons.sort((a, b) => {
      let x = a.name.toUpperCase(),
        y = b.name.toUpperCase();
      return x == y ? 0 : x > y ? 1 : -1;
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

  alfabeticoZA() {
    this.lst_pokemons.sort((a, b) => {
      let x = a.name.toUpperCase(),
        y = b.name.toUpperCase();
      return x == y ? 0 : y > x ? 1 : -1;
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

  pontosAtributoMaior() {
    this.lst_pokemons.sort((a, b) => {
      if (a.pts < b.pts) {//ordenando do mais forte ao mais fraco 
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

  pontosAtributoMenor() {
    this.lst_pokemons.sort((a, b) => {
      if (b.pts < a.pts) {//ordenando do mais forte ao mais fraco 
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

  traduzTipo(tipo): string {
    return this.pokemonService.traduzNomeTipo(tipo);
  }

  itensUnicos(arr: string[]) {
    return arr.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
  }




}
