import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  chart;
  PokeGraficoName:string = "";
  data:any = [];
  totalPokemon:string = "";
 
  // configuração do grafico
  Chart(){
    this.chart = new Chart({
      chart: {
        plotBackgroundColor: 'none',
        plotBorderWidth: 0,
        plotShadow: false,
        height: 200,
        
        
      },
      title: {
        text: this.totalPokemon+ 'pts '+'<br>' + 'de atributos' ,
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
          size: '180%',   
        }
      },
      series: [{
        type: 'pie',
        name: this.PokeGraficoName,
        innerSize: '50%',
        data: this.data
      }]
      
    });
    return this.chart;
  }
}



