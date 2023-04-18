import { Component, Input, OnInit} from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { ChartService } from './chart.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-grafico-pokemon',
  templateUrl: './grafico-pokemon.component.html',
  styleUrls: ['./grafico-pokemon.component.css']
})
export class GraficoPokemonComponent{
    
    constructor(private chartService:ChartService){}
  @Input() objPokemon = {} as Pokemon;
  public chart;
  public totalPokemon:string;
  public valido = true;

  id_chart;
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
    this.id_chart = 'pokemon-' + this.objPokemon.id;

    let data = [];
    this.objPokemon.stats.forEach((e, i)=>{
      let obj = [];
      obj.push(e.stat.name, e.base_stat);
      data.push(obj)
    });

    let total = this.objPokemon.stats.reduce((a, b) => a + b.base_stat, 0);
    let totalPokemon = total.toString();

    this.chartService.totalPokemon = totalPokemon;
    this.chartService.PokeGraficoName = this.objPokemon.name;
    this.chartService.data = data;

    

    this.chart = this.chartService.Chart();

    // let div_ok = document.getElementById(this.id_chart);
    setTimeout(() => {

      Highcharts.chart(this.id_chart, this.chart);

    });
  }
}