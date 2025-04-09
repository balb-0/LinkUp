import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { ApexChart, ApexFill, ApexNonAxisChartSeries, ApexPlotOptions } from 'ng-apexcharts';
import { DropDownComponent } from '../drop-down/drop-down.component';

@Component({
  selector: 'app-radial-gauge',
  standalone: true,
  imports: [NgApexchartsModule, DropDownComponent],
  templateUrl: './radial-gauge.component.html'
})
export class RadialGaugeComponent implements OnChanges {
  @Input() value: number = 0;
  @Input() label: string = 'Porcentagem de Alunos Atendidos';
  @Input() opcoes: string[] = [];
  @Input() selecionado: string = '';
  @Output() selecaoChange = new EventEmitter<string>();

  chartOptions = {
    series: [this.value],
    chart: {
      type: 'radialBar',
      offsetY: -20,
      width: 586,
      height: 639
    } as ApexChart,
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e29d9d",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            opacity: 0.31,
            blur: 2
          }
        },
        dataLabels: {
          name: { show: false },
          value: { offsetY: -2, fontSize: "22px" }
        }
      }
    } as ApexPlotOptions,
    fill: {
      type: "solid",
      colors: ["#7E0000"]
    } as ApexFill,
    labels: [this.label]
  };

  ngOnChanges() {
    this.chartOptions.series = [this.value];
    this.chartOptions.labels = [this.label];
  }

  onItemSelecionado(item: string) {
    this.selecaoChange.emit(item);
  }
}
