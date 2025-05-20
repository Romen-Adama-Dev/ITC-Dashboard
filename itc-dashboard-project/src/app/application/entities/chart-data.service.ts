import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ChartData {
  name: string;
  value: number;
}

export interface ChartConfig {
  theme: 'default' | 'dark';
  view: [number, number];
  data: ChartData[];
}

export interface ChartsJson {
  charts: {
    advancedPieChart: ChartConfig;
    areaChart: ChartConfig;
    boxChart: ChartConfig;
    bubbleChart: ChartConfig;
    gaugeChart: ChartConfig;
    heatmapChart: ChartConfig;
    horizontalBarChart: ChartConfig;
    lineChart: ChartConfig;
    linearGaugeChart: ChartConfig;
    normalizedAreaChart: ChartConfig;
    normalizedHorizontalBarChart: ChartConfig;
    normalizedVerticalBarChart: ChartConfig;
    numberCards: ChartConfig;
    percentGaugeChart: ChartConfig;
    pieChart: ChartConfig;
    pieGridChart: ChartConfig;
    polarChart: ChartConfig;
    stackedAreaChart: ChartConfig;
    stackedHorizontalBarChart: ChartConfig;
    stackedVerticalBarChart: ChartConfig;
    treeMap: ChartConfig;
    verticalBarChart: ChartConfig;
    
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private chartsSubject = new BehaviorSubject<ChartsJson | null>(null);
  charts$: Observable<ChartsJson | null> = this.chartsSubject.asObservable();
  private defaultUrl = '/assets/datasets/data-set-1.json';
  constructor(private http: HttpClient) { }
  loadChartsData(url: string = this.defaultUrl): Observable<ChartsJson> {
    return this.http.get<ChartsJson>(url).pipe(
      tap((data: ChartsJson) => this.chartsSubject.next(data))
    );
  }

  updateChartsData(newData: ChartsJson): void {
    this.chartsSubject.next(newData);
  }
}