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
  public tipo_selecionado: string = "todos" //deixar o select em branco

  public ativa: boolean = false;
  public data = new Date();

  _geracao: number = 1;

  @Output() idPoke: number;
  is_card_carregado:boolean = false;

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
    this.card_carregando();

    this.pokemonService.getPokemon(this._geracao).subscribe((pokemons) => {

      let observables = pokemons.results.map((pokemon: any, index: number) => {//cria observaveis para tipos

        return this.pokemonService.getPok(pokemon.url).pipe(map((pokemon: any) => {
          // let objPokemon = {} as any;

          // objPokemon.id = pokemon.id;
          // objPokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.substr(1);
          // objPokemon.pts = pokemon.stats.reduce((a, b) => a + b.base_stat, 0);
          // objPokemon.tipos = pokemon.types.map((t) => t.type.name);

          this.lst_pokemons.push(pokemon);

        }));

      });

      // concatenar os observables em um único observable e converter em uma promise
      let observableConcat = from(observables).pipe(concatAll());
      // from para converter o array de observables em um único observable e o operador
      //concatAll() para concatenar os resultados de todas as Promises geradas pela chamada ao serviço
      let promise = observableConcat.toPromise();

      promise.then(() => {

        this.lst_pokemons_backup = JSON.parse(JSON.stringify(this.lst_pokemons));

        if (this.tipo_selecionado) {
          this.selTipo(this.tipo_selecionado);
        }
        
        this.ordenaByUrl();

      }).catch((err) => {

      });
    });
  }

  getAllPokemonsTipos() {
    const param_url_tipo = this.rota_ativa.snapshot.paramMap.get('tipo');
    this.pokemonService.getAllTiposPokemon().subscribe((lst_pokemons_tipos: Pokemon) => {
      this._lst_pokemons_tipos = lst_pokemons_tipos.results.map((t: any) => t.name);

      this._lst_pokemons_tipos = this._lst_pokemons_tipos.filter((t)=> t != 'unknown');
      let tipo = this._lst_pokemons_tipos.find((t) => t == param_url_tipo);

      if (tipo) {
        this.tipo_selecionado = tipo;
      }
    });
  }

  selTipo(tipo) {
    const _ordenacao = this.rota_ativa.snapshot.paramMap.get('ordenacao');
    
    this.navegaRota(_ordenacao);
    
    tipo = tipo.toLowerCase();
    if (tipo == "todos") {
      this.lst_pokemons = JSON.parse(JSON.stringify(this.lst_pokemons_backup));
    }else{
    
      this.lst_pokemons = this.lst_pokemons_backup.filter((p, i) => {return p.types[0]?.type?.name == tipo || p.types[1]?.type?.name == tipo; });
      this.ordenaByUrl();
    }

  }

  selGeracao(_geracao) {
    const _ordenacao = this.rota_ativa.snapshot.paramMap.get('ordenacao');
    this.navegaRota(_ordenacao);
    this.getPokemons();

  }

  padraoInit() {
    this.lst_pokemons.sort((a, b) => {
      if (a.id > b.id) {
      } else {
        return -1;
      }
    });
  }

  alfabeticoAZ() {

    this.lst_pokemons.sort((a, b) => {
      let x = a.name.toUpperCase(),
        y = b.name.toUpperCase();
      return x == y ? 0 : x > y ? 1 : -1;
      //sem distinção entre letras maiúsculas e minúsculas, você passa a função de comparação transformando todas as letras das strings em maiúsculas antes de efetuar a comparação, da seguinte forma:
    });

  }

  alfabeticoZA() {

    this.lst_pokemons.sort((a, b) => {
      let x = a.name.toUpperCase(),
        y = b.name.toUpperCase();
      return x == y ? 0 : y > x ? 1 : -1;
      //sem distinção entre letras maiúsculas e minúsculas, você passa a função de comparação transformando todas as letras das strings em maiúsculas antes de efetuar a comparação, da seguinte forma:
    });
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
  }

  pontosAtributoMenor() {

    this.lst_pokemons.sort((a, b) => {
      if (b.pts < a.pts) {//ordenando do mais forte ao mais fraco 
        return 1;
      } else {
        return -1;
      }
    });

  }

  traduzTipo(tipo): string {
    return this.pokemonService.traduzNomeTipo(tipo);
  }

  navegaRota(ordenacao:string){
   
    if(this.tipo_selecionado && ordenacao){

      this.router.navigate(['/pokemon/'+ this._geracao +'/ordenacao/'+ ordenacao +'/tipo/'+ this.tipo_selecionado]);
    
    }else if(ordenacao && !this.tipo_selecionado){

      this.router.navigate(['/pokemon/'+ this._geracao +'/ordenacao/' + ordenacao]);
    }
    if(this.tipo_selecionado && !ordenacao){

      this.router.navigate(['/pokemon/'+ this._geracao +'/tipo/' + this.tipo_selecionado]);
    }
  }

  montaUrlHtml(ordenacao:string):string{
   
    if(this.tipo_selecionado && ordenacao){

      return '/pokemon/'+ this._geracao +'/ordenacao/'+ ordenacao +'/tipo/'+ this.tipo_selecionado;
    
    }else if(ordenacao && !this.tipo_selecionado){

      return '/pokemon/'+ this._geracao +'/ordenacao/' + ordenacao;
    }
    if(this.tipo_selecionado && !ordenacao){

      return '/pokemon/'+ this._geracao +'/tipo/' + this.tipo_selecionado;
    }
  }

  ordenaByUrl(){
    const _ordenacao = this.rota_ativa.snapshot.paramMap.get('ordenacao');
        if (_ordenacao) {

          if (_ordenacao == 'az') {
            this.alfabeticoAZ();
          }
          else if ( _ordenacao == 'za') {
            this.alfabeticoZA();
          }
          else if ( _ordenacao == 'maisforte') {
            this.pontosAtributoMaior();
          }
          else if ( _ordenacao == 'maisfraco') {
            this.pontosAtributoMenor();

          }else{
            this.padraoInit();
          }
        }
        this.card_carregado();
  }

  card_carregando(){
    this.is_card_carregado = false;
  }

  card_carregado(){
    this.is_card_carregado = true;
  }


}
