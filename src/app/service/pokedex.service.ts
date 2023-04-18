import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

    // url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=10 '; // api rest fake 
    url = 'https://pokeapi.co/api/v2/pokemon?limit='; // api rest fake 
    urlId = 'https://pokeapi.co/api/v2/pokemon'; // api rest fake 

    // injetando o HttpClient
    constructor(private httpClient: HttpClient) { }
  
    // Headers
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    // Obtem Pokemon por id
    getPokemonByid(id:number): Observable<Pokemon> {
      return this.httpClient.get<Pokemon>(this.urlId+'/'+ id)
        .pipe(
          retry(2),
          catchError(this.handleError))
    }
     // Obtem todos os pokemons
    getPokemon(geracao:number): Observable<Pokemon> {
      if(geracao == 1){
        this.url = 'https://pokeapi.co/api/v2/pokemon?limit=151'; 
      }else if(geracao == 2){
        this.url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151'; 
      }else if(geracao == 3){
        this.url = 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251'; 
      }else if(geracao == 4){
        this.url = 'https://pokeapi.co/api/v2/pokemon?limit=108&offset=386'; 
      }else if(geracao == 5){
        this.url = 'https://pokeapi.co/api/v2/pokemon?limit=156&offset=494'; 
      }else if(geracao == 6){
        this.url = 'https://pokeapi.co/api/v2/pokemon?limit=72&offset=649'; 
      }else if(geracao == 7){
        this.url = 'https://pokeapi.co/api/v2/pokemon?limit=87&offset=721'; 
      }else if(geracao == 8){
        this.url = 'https://pokeapi.co/api/v2/pokemon?limit=96&offset=809'; 
      }else if(geracao == 9){
        this.url = 'https://pokeapi.co/api/v2/pokemon?limit=103&offset=905'; 
      }
      console.log(geracao)
      return this.httpClient.get<Pokemon>(this.url)
        .pipe(
          retry(2),
          catchError(this.handleError))
    }

    getPok(pokemon_url:string): Observable<Pokemon> {//requisição dos detalhes de todos os pokemons
      return this.httpClient.get<Pokemon>(pokemon_url)
        .pipe(
          retry(2),
          catchError(this.handleError));
    }

    getAllTiposPokemon(): Observable<Pokemon> {//requisição dos detalhes de todos os pokemons
      return this.httpClient.get<Pokemon>('https://pokeapi.co/api/v2/type')
        .pipe(
          retry(2),
          catchError(this.handleError))
    }

    traduzNomeTipo(tipo:string):string{
                            if(tipo == 'poison'){
                              return 'Tóxico';
                            }
                            else if(tipo == 'grass'){
                              return 'Grama';
                            }
                            else if(tipo == 'fire'){
                              return 'Fogo';
                            }
                            else if(tipo == 'water'){
                              return 'Água';
                            }
                            else if(tipo == 'bug'){
                              return 'Inseto';
                            }
                            else if(tipo == 'normal'){
                              return 'Normal';
                            }
                            else if(tipo == 'electric'){
                              return 'Elétrico';
                            }
                            else if(tipo == 'ground'){
                              return 'Chão';
                            }
                            else if(tipo == 'fighting'){
                              return 'Lutador';
                            }
                            else if(tipo == 'psychic'){
                              return 'Psíquico';
                            }
                            else if(tipo == 'rock'){
                              return 'Rocha';
                            }
                            else if(tipo == 'flying'){
                              return 'Voador';
                            }
                            else if(tipo == 'ghost'){
                              return 'Fantasma';
                            }
                            else if(tipo == 'ice'){
                              return 'Gelo';
                            }
                            else if(tipo == 'dragon'){
                              return 'Dragão';
                            }
                            else if(tipo == 'steel'){
                              return 'Aço';
                            }
                            else if(tipo == 'fairy'){
                              return 'Fada';
                            }
                            else if(tipo == 'shadow'){
                              return 'Sombra';

                            }else if(tipo == 'dark'){
                              return 'Sombrio';
                            }
                            else{
                              return tipo;
                            }
    } 
    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    };
  
  }