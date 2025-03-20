import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Define las interfaces según tu modelo de datos (ajusta la ruta si es necesario)
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
    verticalBarChart: ChartConfig;
    horizontalBarChart: ChartConfig;
    // Aquí podrías añadir más tipos de gráficos en el futuro
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  // BehaviorSubject para mantener y emitir los datos de gráficos
  private chartsSubject = new BehaviorSubject<ChartsJson | null>(null);
  charts$: Observable<ChartsJson | null> = this.chartsSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Carga los datos de gráficos desde el JSON ubicado en /assets/data.json.
   * Cuando se reciben los datos, se actualiza el BehaviorSubject.
   */
  loadChartsData(): Observable<ChartsJson> {
    return this.http.get<ChartsJson>('/assets/data.json').pipe(
      tap((data: ChartsJson) => {
        this.chartsSubject.next(data);
      })
    );
  }

  /**
   * Método para actualizar manualmente los datos de gráficos.
   * Esto es útil si en el futuro se quiere actualizar los datos de forma reactiva.
   */
  updateChartsData(newData: ChartsJson): void {
    this.chartsSubject.next(newData);
  }
}