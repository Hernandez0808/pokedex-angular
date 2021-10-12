import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

    // url = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=200'; // api rest fake 
    url = 'https://pokeapi.co/api/v2/pokemon?limit=150'; // api rest fake 
    // url = 'https://pokeapi.co/api/v2/pokemon/ditto'; // api rest fake 
    urlPokemon;
    // injetando o HttpClient
    constructor(private httpClient: HttpClient) { }
  
    // Headers
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  
    // Obtem todos os carros
    getPokemon(): Observable<Pokemon> {
      return this.httpClient.get<Pokemon>(this.url)
        .pipe(
          retry(2),
          catchError(this.handleError))
    }

    getPok(): Observable<Pokemon[]> {
      return this.httpClient.get<Pokemon[]>(this.urlPokemon)
        .pipe(
          retry(2),
          catchError(this.handleError))
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