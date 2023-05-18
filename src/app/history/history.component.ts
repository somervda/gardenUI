import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { MatRadioChange } from '@angular/material/radio';
import { HistoryService } from '../services/history.service';
import { MatSelect, MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  // Google Charts
  showChart = false;
  chartResize = true;
  chartType = ChartType.ComboChart;
  chartColumns: string[] = [];
  // See https://developers.google.com/chart/interactive/docs/gallery/combochart
  chartOptions = {};
  chartData: any[] = [];
  history = [];
  chartDays = '1';
  chartSelection = '1';
  chartTitle = '';

  chartOptions1 = {
    legend: { position: 'bottom' },
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Time' },
    // Note: for multiple axis vAxis is called vAxes !!!
    vAxis: { viewWindow: { min: 0 } },
    vAxes: {
      0: {
        title: 'Humidity %',
        minValue: 0,
        maxValue: 100,
        gridlines: { count: 0 },
      },
      1: {
        title: 'Temperature F',
        minValue: 0,
        gridlines: { count: 0 },
      },
    },
    isStacked: true,
    series: {
      0: { targetAxisIndex: 1 },
      1: { targetAxisIndex: 0 },
      // 2: { targetAxisIndex: 0, type: 'area' },
    },
    // curveType: 'function',
    formatters: {},
  };

  chartOptions2 = {
    legend: { position: 'bottom' },
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Time' },
    // Note: for multiple axis vAxis is called vAxes !!!
    vAxis: { viewWindow: { min: 0 } },
    vAxes: {
      0: {
        title: 'Humidity %',
        minValue: 0,
        maxValue: 100,
        gridlines: { count: 0 },
      },
      1: {
        title: 'Minutes/Level',
        minValue: 0,
        gridlines: { count: 0 },
      },
    },
    isStacked: true,
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 0 },
      2: { targetAxisIndex: 1 },
      3: { targetAxisIndex: 1 },
    },
    // curveType: 'function',
    formatters: {},
  };

  chartOptions3 = {
    legend: { position: 'bottom' },
    chartArea: { width: '80%', height: '70%' },
    hAxis: { title: 'Time' },
    // Note: for multiple axis vAxis is called vAxes !!!

    vAxes: {
      0: {
        title: 'Volts',
        minValue: 10,
        maxValue: 15,
        gridlines: { count: 0 },
      },
      1: {
        title: 'Minutes',
        minValue: 0,
        gridlines: { count: 0 },
      },
    },
    isStacked: true,
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 1 },
      2: { targetAxisIndex: 1 },
    },
    // curveType: 'function',
    formatters: {},
  };

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.doCharting();
  }

  chartSeriesChange($event: MatSelectChange) {
    // Set chart series based on what is to be shown
    this.chartSelection = $event.value;
    this.doCharting();
  }

  historyChange($event: MatRadioChange) {
    this.chartDays = $event.value;
    this.doCharting();
  }

  doCharting() {
    this.showChart = false;
    let startTime = Math.round(Date.now() / 1000);
    startTime -= parseInt(this.chartDays) * 24 * 60 * 60;

    //
    switch (parseInt(this.chartSelection)) {
      case 1: {
        this.chartColumns = ['Hour', 'Temperature F', 'Humidity %'];
        this.chartOptions = this.chartOptions1;
        this.chartTitle = 'Environment History';
        break;
      }
      case 2: {
        this.chartColumns = ['Hour', 'Soil 1', 'Soil 2', 'Pump', 'Water level'];
        this.chartOptions = this.chartOptions2;
        this.chartTitle = 'Irrigation History';
        break;
      }
      case 3: {
        this.chartColumns = ['Hour', 'Volts', 'Camera', 'Pump'];
        this.chartOptions = this.chartOptions3;
        this.chartTitle = 'Power Usage History';
        break;
      }
      default: {
        break;
      }
    }

    this.historyService.getHistory(startTime).subscribe((response) => {
      this.history = Object.values(JSON.parse(JSON.stringify(response)));
      this.chartData = [];
      this.history.forEach((element) => {
        switch (parseInt(this.chartSelection)) {
          case 1: {
            this.chartData.push([
              new Date(element['timeStamp'] * 1000),
              Math.round((element['temp'] * 9) / 5 + 32),
              element['humidity'],
            ]);
            break;
          }
          case 2: {
            this.chartData.push([
              new Date(element['timeStamp'] * 1000),
              element['sm1'] * 10,
              element['sm2'] * 10,
              element['pump'] / 60,
              element['waterLevel'],
            ]);
            break;
          }
          case 3: {
            this.chartData.push([
              new Date(element['timeStamp'] * 1000),
              element['bat'],
              element['cam'],
              element['pump'] / 60,
            ]);
            break;
          }
        }
      });
      this.showChart = true;
    });
  }
}
