import { tap, of, forkJoin } from "rxjs";
import { CaseStatusModel } from "../../../../../../models/concrete/entity-models/case-status.model";
import { CasesModel } from "../../../../../../models/concrete/entity-models/cases.model";
import { CaseStatus } from "../../../../../../models/concrete/other/case-status";
import { DefaultFilterKeys } from "../../../../../../models/concrete/other/default-filter-keys";
import { IFilterModel } from "../../../../../tools/combo-box/models/abstract/ifilter-model";
import { FilterModel } from "../../../../../tools/combo-box/models/concrete/filter-model";
import { FilterListService } from "../../../../../tools/combo-box/services/filter-list.service";
import { ListCaseService } from "../services/list-case.service";
import { CaseStatusService } from "../../../../../../services/main/case-status.service";
import { CasesService } from "../../../../../../services/main/cases.service";

export class CaseStatusFilterModel extends FilterModel implements IFilterModel {
    constructor(private _caseStatusService: CaseStatusService,
        private _caseService: CasesService,
        private _filterListService: FilterListService,
        private _listCaseService: ListCaseService) {
        super({
            key: DefaultFilterKeys.status,
            isDefault: true,
            func: (filterModel, _) => {
                this.CaseStatusFilterFunc(filterModel);
            },
        });

    }

    private CaseStatusFilterFunc(filterModel: IFilterModel | undefined) {

        //enum a göre yeni sattusler ile vryant eklenecek
        var values = Object.values(CaseStatus)
        values.filter(v => typeof (v) == "number")
            .forEach((item) => {
                let _filterList = this._filterListService.filterListInstant;

                if (!_filterList?.some(p => p.value === CaseStatus[item as number])) {

                    _filterList?.push(new FilterModel({
                        key: `${filterModel?.key}${CaseStatus[item as number]}`,
                        func: (itemModel) => {
                            //ilk olarak date göre ters sıralı halde getir
                            this._caseStatusService.getOrderedDateDesc().subscribe(response => {
                                //Liste yok yada boş ise çık
                                if (!response || response.length <= 0) {
                                    this._listCaseService.listCase$ = undefined;
                                    return;
                                }

                                //listeyi for ile dön ve farklı case id li ilk itemı al
                                const uniqStatusModelMap = new Map<number, CaseStatusModel>();
                                response.forEach((itemStatus) => {
                                    if (!uniqStatusModelMap.has(itemStatus.caseId))
                                        uniqStatusModelMap.set(itemStatus.caseId, itemStatus);
                                }
                                );

                                //CaseSutasu number ı eşit olanı filtrele
                                var newList = Array.from(uniqStatusModelMap.values()).filter(p => p.status === item as number);

                                //case nesnesi olamayanın nesnesini al
                                let observables = newList?.filter(s => !s.cases && s.caseId && s.caseId > 0)
                                    .map(s => this._caseService.getById(s.caseId).pipe(
                                        tap((c) => {
                                            if (c)
                                                s.cases = c;
                                        })
                                    )
                                    )

                                //observable yok ise de tetikelensin diye of(undifined) => bu tüm caseler zaten gelmiş demek
                                const safeObservables = (observables && observables.length > 0 ? observables : [of(undefined as unknown as CasesModel)]);

                                forkJoin(safeObservables).subscribe(() => {
                                    //yeni listeye göre case listi oluştur 

                                    let responseList: CasesModel[] | undefined = newList
                                        .map(p => p.cases)
                                        .filter((c): c is CasesModel => !!c) || undefined; //!!c eşittir !c != true , !c ise boş olmadurumu , direk c verince liste (casesmodel|undefine)[]|undifined şekline dönüyor // runtimeda sıkıntı yok ama

                                    this._listCaseService.listCase$ = responseList;
                                })

                            })
                        },
                    }));
                }

                this._filterListService.filterList$ = _filterList;

            });
    }
}
