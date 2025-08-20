import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DefaultFilterKeys } from '../../../../models/concrete/other/default-filter-keys';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  //#region Dışarı haber dar edilirken
    private filterSelectedKeySubject = new BehaviorSubject<string>(DefaultFilterKeys.default);

    /**
     * Observariable olarak filtrede seçili keyi verir
     * Alt kullanımlar ve componenetler buraya kayıt / subscribe olarak haberdar olur
     */
    get filterSelectedKey$():Observable<string>{
      return this.filterSelectedKeySubject.asObservable();
    }

    /**
     * Filtre için geçerli olan key bilgisini günceller
     * Tüm aboneler haberdar edilir.
     */
    set filterSelectedKey$(value:string|undefined){
      if(value && typeof value === "string")
        this.filterSelectedKeySubject.next(value);
      else
        this.filterSelectedKeySubject.next(DefaultFilterKeys.default)
    }

    /**
     * Anlık olarak filter da seçili Key i verir
     */
    get filterSelectedKeyInstant(){
      return this.filterSelectedKeySubject.value;
    }
  //#endregion

  //#region içeri haberdar edilirken
    
    private filterSelectKeySubject = new BehaviorSubject<{key:string,isExtraProccess?:boolean}>({key:DefaultFilterKeys.default,isExtraProccess:false});

    /**
     * combo box kullanması için select key verme
     */
    set selectKey$(value:{key:string,isExtraProccess?:boolean}){
      console.log("selectKey$")
      console.log(value);
      this.filterSelectKeySubject.next(value);
    }

    /**
     * combo box içi işlem için
     * abone olma
     */
    get selectKey$():Observable<{key:string,isExtraProccess?:boolean}>{
      return this.filterSelectKeySubject.asObservable();
    }
  //#endregion
}
