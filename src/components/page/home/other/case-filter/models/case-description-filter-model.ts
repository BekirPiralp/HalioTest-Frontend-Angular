import { DefaultFilterKeys } from "../../../../../../models/concrete/other/default-filter-keys";
import { CasesService } from "../../../../../../services/main/cases.service";
import { IFilterModel } from "../../../../../tools/combo-box/models/abstract/ifilter-model";
import { Params } from "../../../../../tools/combo-box/models/abstract/params";
import { FilterModel } from "../../../../../tools/combo-box/models/concrete/filter-model";
import { ListCaseService } from "../services/list-case.service";

export class CaseDescriptionFilterModel extends FilterModel implements IFilterModel {
    /**
     *
     */
    constructor(private _caseService: CasesService, private _listCaseService: ListCaseService) {
        super(
            <Params>{
                key: DefaultFilterKeys.caseDescription,
                isDefault: true,
                isUseSelectingKey: true,
                func: (filterModel) => {
                    let searchKey = filterModel?.value;
                    if (searchKey?.trim()) {
                        this._caseService.getBySearchtoDescription(searchKey).subscribe(response => {
                            //case list güncellenecek
                            this._listCaseService.listCase$ = response;
                        })
                    }
                },
            }
        );
    }
}
