import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MediatorService {
  private eventSubject = new Subject<any>();
  events$: Observable<any> = this.eventSubject.asObservable();

  emit(event: any): void {
    this.eventSubject.next(event);
  }
}