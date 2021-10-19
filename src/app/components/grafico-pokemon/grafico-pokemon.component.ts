import { Component, Input, OnInit} from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Pokemon } from 'src/app/models/pokemon';


@Component({
  selector: 'app-grafico-pokemon',
  templateUrl: './grafico-pokemon.component.html',
  styleUrls: ['./grafico-pokemon.component.css']
})
export class GraficoPokemonComponent{

  @Input() PokeGrafico = {} as Pokemon;
  @Input() PokeGraficoId = {} as Pokemon;
  public chart;
  public totalPokemon:string;
  public valido = true;

  ngOnChanges() {
    if(!this.valido){
    this.filtraDadosChange();
    }
    this.valido = false;
  }

  ngOnInit():void{
      this.filtraDadosInicial();
  }
  filtraDadosChange(){
  let data = [];  
  this.PokeGraficoId.stats.forEach((e, i)=>{
      let obj = [];
      obj.push(e.stat.name, e.base_stat);
      data.push(obj)
    });
    
    let total = this.PokeGraficoId.stats.reduce((a, b) => a + b.base_stat, 0);
    let totalPokemon = total.toString();


    this.chart = new Chart({
      chart: {
        plotBackgroundColor: 'none',
        plotBorderWidth: 0,
        plotShadow: false,
        height: 200,
        
    },
    title: {
        text: totalPokemon+ 'pts '+'<br>' + 'de atributos' ,
        align: 'center',
        
        verticalAlign: 'middle',
        y: 50,

    
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
                    color: 'black',
    
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '90%'],
            size: '170%',   
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
  filtraDadosInicial(){
    console.log(this.PokeGrafico);
    let data = [];
    this.PokeGrafico.stats.forEach((e, i)=>{
      let obj = [];
      obj.push(e.stat.name, e.base_stat);
      data.push(obj)
    });

    let total = this.PokeGrafico.stats.reduce((a, b) => a + b.base_stat, 0);
    let totalPokemon = total.toString();


    this.chart = new Chart({
      chart: {
        plotBackgroundColor: 'none',
        plotBorderWidth: 0,
        plotShadow: false,
        height: 200,
        
    },
    title: {
        text: totalPokemon+ 'pts '+'<br>' + 'de atributos' ,
        align: 'center',
        
        verticalAlign: 'middle',
        y: 50,

    
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
                    color: 'black',
    
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '90%'],
            size: '170%',   
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