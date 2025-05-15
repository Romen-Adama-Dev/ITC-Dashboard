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
    verticalBarChart: ChartConfig;
    horizontalBarChart: ChartConfig;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  // Subject que mantiene y emite los datos de gráficos
  private chartsSubject = new BehaviorSubject<ChartsJson | null>(null);
  charts$: Observable<ChartsJson | null> = this.chartsSubject.asObservable();

  // En chart-data.service.ts, cambia la ruta relativa por una ruta absoluta:
  private defaultUrl = '/assets/datasets/data-set-1.json';

  constructor(private http: HttpClient) { }

  /**
   * Carga los datos de gráficos desde el JSON ubicado en la URL indicada (por defecto la URL predeterminada).
   * Al recibir los datos, se actualiza el BehaviorSubject.
   */
  loadChartsData(url: string = this.defaultUrl): Observable<ChartsJson> {
    return this.http.get<ChartsJson>(url).pipe(
      tap((data: ChartsJson) => this.chartsSubject.next(data))
    );
  }

  /**
   * Actualiza manualmente los datos de gráficos.
   * Esto es útil para actualizaciones reactivas.
   */
  updateChartsData(newData: ChartsJson): void {
    this.chartsSubject.next(newData);
  }
}