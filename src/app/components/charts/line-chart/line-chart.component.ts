import { ApiService } from "./../../../service/api.service";
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  EventEmitter
} from "@angular/core";
import * as Chart from "chart.js";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"]
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @Input("companyName")
  companyName: string;

  @Input("prices")
  values: number[];

  @Input("companyName2")
  companyName2: string;

  @Input("prices2")
  values2: number[];

  @Input("dates")
  labels: string[];

  @Input("compareCompany")
  compareCompany: boolean = false;

  @Input("exchangeIndex")
  exchangeIndex: number;

  chart: Chart;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  @ViewChild("canvas", { static: true }) canvas: ElementRef;

  ngAfterViewInit() {}

  createChart() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: "line",
      data: {
        datasets: [
          {
            data: this.values,
            label: this.companyName,
            fill: false,
            borderColor: this.compareCompany ? "rgba(255,69,0)" : "#FFFF00"
          }
        ],
        labels: this.labels
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: false
            }
          ]
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }
    });
  }

  createMergedChart() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: "line",
      data: {
        datasets: [
          {
            data: this.values,
            label: this.companyName,
            fill: false,
            borderColor: "#FFFF00"
          },
          {
            data: this.values2,
            label: this.companyName2,
            fill: false,
            borderColor: "rgba(255,69,0)"
          }
        ],
        labels: this.labels
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: false
            }
          ]
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }
    });
  }
}
