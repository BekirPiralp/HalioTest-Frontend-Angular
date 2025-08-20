import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterModel } from '../models/concrete/filter-model';
import { IFilterModel } from '../models/abstract/ifilter-model';

@Injectable({
  providedIn: 'root'
})
export class FilterListService {
  private filterListSubject = new BehaviorSubject<IFilterModel[]|undefined>(undefined);

  /**
   * filter list e abone olmayı sağlar böylece
   * filter listteki değişiklikten haberdar olur
   */
  get filterList$ ():Observable<IFilterModel[]|undefined>{
    return this.filterListSubject.asObservable();
  }

  /**
   * filter listi günceller ve abonelere bildirir
   */
  set filterList$(value:IFilterModel[]|undefined){
    this.filterListSubject.next(value);
  }

  /**
   * anlık olarak filter listi döndürür
   */
  get filterListInstant():(IFilterModel[]|undefined){
    return this.filterListSubject.value;
  }

  /**
   * filter list i default modellere çevirir
   */
  resetFilterList(){
    let result = this.filterListInstant;
    if(result && result.length>0){
      this.filterList$ = result.filter(p=>p.isDefault);
    }
  }
}
