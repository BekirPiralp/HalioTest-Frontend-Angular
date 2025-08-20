import { CaseStatusModel } from "../../../../../../models/concrete/entity-models/case-status.model";
import { CasesModel } from "../../../../../../models/concrete/entity-models/cases.model";
import { DefaultFilterKeys } from "../../../../../../models/concrete/other/default-filter-keys";
import { CaseStatusService } from "../../../../../../services/main/case-status.service";
import { IFilterModel } from "../../../../../tools/combo-box/models/abstract/ifilter-model";
import { FilterModel } from "../../../../../tools/combo-box/models/concrete/filter-model";
import { ListCaseService } from "../services/list-case.service";

export class CaseStatusDescriptionFilterModel extends FilterModel implements IFilterModel {
    constructor(private _caseStatusService:CaseStatusService,private _listCaseService:ListCaseService){
        super({
              key:DefaultFilterKeys.statusDescription,
              isDefault: true,
              isUseSelectingKey: true,
              func:(filterModel)=>{
                if(filterModel?.value){
                  this._caseStatusService.getBySearchtoDescription(filterModel?.value).subscribe((response)=>{
                    if(!response || response.length<=0){
                        this._listCaseService.listCase$ = undefined;
                      return;
                    }
                    
                    //aynı case 1 defa listede olsun
                    const uniqCaseStatusMap = new Map<number,CaseStatusModel>();
                    
                    response.forEach((s)=>{
                      if(!uniqCaseStatusMap.has(s.caseId))
                        uniqCaseStatusMap.set(s.caseId,s);
                    })
                    
                    
                    //gelenlere göre case list oluştur;
                    const list= Array.from(uniqCaseStatusMap.values()).map(s=>s.cases).filter((c):c is CasesModel=>!!c) || undefined;
        
                    this._listCaseService.listCase$ = list;
                  })
                  
                }
              }
            });
    }
}
