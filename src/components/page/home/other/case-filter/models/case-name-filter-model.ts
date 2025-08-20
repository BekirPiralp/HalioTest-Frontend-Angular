import { CasesModel } from "../../../../../../models/concrete/entity-models/cases.model";
import { DefaultFilterKeys } from "../../../../../../models/concrete/other/default-filter-keys";
import { CasesService } from "../../../../../../services/main/cases.service";
import { IFilterModel } from "../../../../../tools/combo-box/models/abstract/ifilter-model";
import { FilterModel } from "../../../../../tools/combo-box/models/concrete/filter-model";
import { FilterListService } from "../../../../../tools/combo-box/services/filter-list.service";
import { ListCaseService } from "../services/list-case.service";

export class CaseNameFilterModel extends FilterModel implements IFilterModel {
    constructor(private _caseService: CasesService,
        private _filterListService: FilterListService,
        private _listCaseService: ListCaseService) {
        super({
            key: DefaultFilterKeys.caseName,
            isDefault: true,
            func: (_fModel, secondaryProccess) => {
                this.CaseNameFilterFunc(_fModel,secondaryProccess);
            }
        });
    }

    private CaseNameFilterFunc(_fModel?: IFilterModel | undefined, secondaryProccess?: (() => void)): void {
        this._caseService.getAll().subscribe(response => {
            if (response?.length > 0) {
                response.forEach((item) => {
                    let _filterList = this._filterListService.filterListInstant;
                    let kntrlList = _filterList?.filter(p => p.data).map(f => {
                        return f.data as CasesModel;
                    });

                    if (!(kntrlList?.some(p => p.id == item.id))) {
                        _filterList?.push(new FilterModel({
                            key: `${_fModel?.key}${item.name}`,
                            data: item,
                            func: (filterModel) => {
                                //case name e göre arama yapılacak
                                if (filterModel?.value)
                                    this._caseService.getByName(filterModel?.value).subscribe((response) => {
                                        //case işlem; ve case list güncellencek

                                        this._listCaseService.listCase$ = response;
                                    }
                                    )
                            },
                        }));

                        this._filterListService.filterList$ = _filterList;
                    }
                })
            }

            if (secondaryProccess)
                secondaryProccess();
        })
    }

}
