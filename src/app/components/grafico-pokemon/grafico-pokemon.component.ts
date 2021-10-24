import { Component, Input, OnInit} from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Pokemon } from 'src/app/models/pokemon';
import { ChartService } from './chart.service';


@Component({
  selector: 'app-grafico-pokemon',
  templateUrl: './grafico-pokemon.component.html',
  styleUrls: ['./grafico-pokemon.component.css']
})
export class GraficoPokemonComponent{
    
    constructor(private chartService:ChartService){}
  @Input() PokeGrafico = {} as Pokemon;
  public chart;
  public totalPokemon:string;
  public valido = true;

  // é chamado dois eventos para poder rendereziar o grafico, um em seu estado inicial e outro para poder atualizar
  ngOnChanges() {
    if(!this.valido){
    this.filtraDados();
    
    }
    this.valido = false;
  }

  ngOnInit():void{
    this.filtraDados();
  }

  filtraDados(){
    let data = [];
    this.PokeGrafico.stats.forEach((e, i)=>{
      let obj = [];
      obj.push(e.stat.name, e.base_stat);
      data.push(obj)
    });

    let total = this.PokeGrafico.stats.reduce((a, b) => a + b.base_stat, 0);
    let totalPokemon = total.toString();

    this.chartService.totalPokemon = totalPokemon;
    this.chartService.PokeGraficoName = this.PokeGrafico.name;
    this.chartService.data = data;

    this.chart = this.chartService.Chart();
  }
}