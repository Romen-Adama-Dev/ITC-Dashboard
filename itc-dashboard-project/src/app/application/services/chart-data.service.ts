import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChartsJson } from '../../domain/entities/chart.model';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private readonly chartsSubject = new BehaviorSubject<ChartsJson | null>(null);
  readonly charts$: Observable<ChartsJson | null> = this.chartsSubject.asObservable();
  private readonly defaultUrl = '/assets/datasets/data-set-1.json';

  constructor(private readonly http: HttpClient) { }

  loadChartsData(url: string = this.defaultUrl): Observable<ChartsJson> {
    return this.http.get<ChartsJson>(url).pipe(
      tap((data: ChartsJson) => {
        const shared = data.charts.sharedChart;
        this.chartsSubject.next({ charts: { sharedChart: shared } });
      })
    );
  }

  updateChartsData(newData: ChartsJson): void {
    this.chartsSubject.next(newData);
  }
}