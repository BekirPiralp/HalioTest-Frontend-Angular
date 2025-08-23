import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerServiceSubject = new BehaviorSubject<boolean>(false);

  get spinnerDisplay$(): Observable<boolean> {
    return this.spinnerServiceSubject.asObservable();
  }

  set spinnerDisplay$(value: boolean) {
    this.spinnerServiceSubject.next(value);
  }
}
