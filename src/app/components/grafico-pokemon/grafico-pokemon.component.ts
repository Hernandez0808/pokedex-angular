import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from "highcharts";

import { Options } from 'highcharts';
import { Chart } from 'angular-highcharts';
import { ChartService } from './chart.service';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-grafico-pokemon',
  templateUrl: './grafico-pokemon.component.html',
  styleUrls: ['./grafico-pokemon.component.css']
})
export class GraficoPokemonComponent{

  @Input() PokeGrafico = {} as Pokemon;
  public pokemonDados:Pokemon [];
  public chart;
  public totalPokemon:string;
  constructor(){}

  ngOnInit():void{
    this.filtraDados();
  }
  filtraDados(){
    
    this.pokemonDados = this.PokeGrafico.results
  

    let data = [];
    this.pokemonDados[0].stats.forEach((e, i)=>{
      let obj = [];
      obj.push(e.stat.name, e.base_stat);
      data.push(obj)
    });

    let total = this.pokemonDados[0].stats.reduce((a, b) => a + b.base_stat, 0);
    let totalPokemon = total.toString();


    this.chart = new Chart({
      chart: {
        plotBackgroundColor: '#47475c',
        plotBorderWidth: 0,
        plotShadow: true,
        height: 200,
    },
    title: {
        text: totalPokemon+ 'pts '+'<br>  ' + 'de atributos' ,
        align: 'center',
        verticalAlign: 'middle',
        y: 40
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
        
    },
    plotOptions: {  
      pie: {
            dataLabels: {
                enabled: true,
                distance: -30,
                style: {
                    fontWeight: 'bold',
                    color: 'white',
                    padding:'50px'
                    
                    
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '80%'],
            size: '190%',   
        }
    },
    series: [{
        type: 'pie',
        name: this.PokeGrafico.name,
        innerSize: '50%',
        data: data
    }]
  });
    
  }
  

}