import { DefaultFilterKeys } from "../../../../../../models/concrete/other/default-filter-keys";
import { CasesService } from "../../../../../../services/main/cases.service";
import { IFilterModel } from "../../../../../tools/combo-box/models/abstract/ifilter-model";
import { FilterModel } from "../../../../../tools/combo-box/models/concrete/filter-model";
import { ListCaseService } from "../services/list-case.service";

export class DefaultFilterModel extends FilterModel implements IFilterModel {
    constructor(private _listCaseService: ListCaseService, private _caseService: CasesService) {
        super({
            key: DefaultFilterKeys.default,
            isDefault: true,
            func: (_): void => {
                console.log("girdi");
                this._caseService.getAllDesc().subscribe(response => {
                    this._listCaseService.listCase$ = response && response.length > 0 ? response : undefined;
                })
            }
        });

    }
}