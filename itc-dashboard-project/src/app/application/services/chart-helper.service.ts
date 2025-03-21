import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartConfig, ChartsJson } from '../../presentation/components/shared/data-view/chart.model';
import { ChartDataService } from '../../presentation/components/shared/data-view/chart-data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartHelperService {
  constructor(
    private chartDataService: ChartDataService,
    private http: HttpClient
  ) {}

  /**
   * Carga la configuración para un gráfico concreto usando la clave (por ejemplo, 'horizontalBarChart').
   * Si se proporciona un dataSource, se realiza una petición directa a ese URL;
   * de lo contrario se utiliza el BehaviorSubject del ChartDataService.
   */
  loadChartConfig(chartType: keyof ChartsJson['charts'], dataSource?: string): Observable<ChartConfig> {
    if (dataSource) {
      // Cargar la configuración directamente desde el URL especificado
      return this.http.get<ChartsJson>(dataSource).pipe(
        map((chartsJson: ChartsJson) => {
          const config = chartsJson.charts[chartType];
          if (config) {
            return config;
          }
          throw new Error(`No se encontró configuración para ${chartType}`);
        })
      );
    } else {
      // Usar el BehaviorSubject del ChartDataService
      return this.chartDataService.charts$.pipe(
        map((chartsJson: ChartsJson | null) => {
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

  /**
   * Combina (merge) una configuración parcial de apariencia con la configuración actual.
   */
  setAppearance(config: Partial<ChartConfig>, currentConfig: ChartConfig): ChartConfig {
    return {
      ...currentConfig,
      theme: config.theme || currentConfig.theme,
      view: config.view || currentConfig.view,
      data: config.data || currentConfig.data
    };
  }

  /**
   * Procesa un evento y devuelve una configuración actualizada.
   * Por ejemplo, filtra los datos o actualiza la apariencia.
   */
  processEvent(event: any, currentConfig: ChartConfig): ChartConfig {
    if (event.type === 'filterData' && event.filter) {
      const filteredData = currentConfig.data.filter(item => item.name.includes(event.filter));
      return { ...currentConfig, data: filteredData };
    }
    if (event.type === 'updateAppearance' && event.appearance) {
      return this.setAppearance(event.appearance, currentConfig);
    }
    return currentConfig;
  }
}