import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartConfig, ChartsJson } from '../../domain/entities/chart.model';
import { ChartDataService } from '../../application/services/chart-data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartHelperService {
  constructor(
    private readonly chartDataService: ChartDataService,
    private readonly http: HttpClient
  ) {}

  loadChartConfig(
    chartType: keyof ChartsJson['charts'],
    dataSource?: string
  ): Observable<ChartConfig> {
    if (dataSource) {
      return this.http.get<ChartsJson>(dataSource).pipe(
        map(chartsJson => {
          const config = chartsJson.charts[chartType];
          if (config) {
            return config;
          }
          throw new Error(`No se encontró configuración para ${chartType}`);
        })
      );
    } else {
      return this.chartDataService.charts$.pipe(
        map(chartsJson => {
          if (chartsJson) {
            const config = chartsJson.charts[chartType];
            if (config) {
              return config;
            }
            throw new Error(`No se encontró configuración para ${chartType}`);
          }
          throw new Error('Datos de gráficos no disponibles');
        })
      );
    }
  }

  setAppearance(
    config: Partial<ChartConfig>,
    currentConfig: ChartConfig
  ): ChartConfig {
    return {
      ...currentConfig,
      theme: config.theme ?? currentConfig.theme,
      view: config.view ?? currentConfig.view,
      data: config.data ?? currentConfig.data
    };
  }

  processEvent(
    event: any,
    currentConfig: ChartConfig
  ): ChartConfig {
    if (event.type === 'filterData' && event.filter) {
      const filteredData = currentConfig.data.filter(item =>
        item.name.includes(event.filter)
      );
      return { ...currentConfig, data: filteredData };
    }
    if (event.type === 'updateAppearance' && event.appearance) {
      return this.setAppearance(event.appearance, currentConfig);
    }
    return currentConfig;
  }
}