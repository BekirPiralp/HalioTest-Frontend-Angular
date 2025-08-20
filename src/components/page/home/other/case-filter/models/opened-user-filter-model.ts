import { forkJoin, map, Observable } from "rxjs";
import { UsersModel } from "../../../../../../models/concrete/entity-models/users.model";
import { DefaultFilterKeys } from "../../../../../../models/concrete/other/default-filter-keys";
import { CasesService } from "../../../../../../services/main/cases.service";
import { UsersService } from "../../../../../../services/main/users.service";
import { IFilterModel } from "../../../../../tools/combo-box/models/abstract/ifilter-model";
import { FilterModel } from "../../../../../tools/combo-box/models/concrete/filter-model";
import { FilterListService } from "../../../../../tools/combo-box/services/filter-list.service";
import { ListCaseService } from "../services/list-case.service";

export class OpenedUserFilterModel extends FilterModel implements IFilterModel {
  constructor(
    private _listCaseService: ListCaseService,
    private _filterListService: FilterListService,
    private _caseService: CasesService,
    private _usersService: UsersService) {
    super({
      key: DefaultFilterKeys.openedUser,
      isDefault: true,
      func: (filterModel, secondaryProccess) => {
        this.OpenedUserFilterFunc(filterModel, secondaryProccess);
      },
    });

  }

  private isRunProcess = false;

  private OpenedUserFilterFunc(filterModel?: IFilterModel, secondaryProccess?: () => void) {
    //Users listesini getir
    let forRunProcess = this._usersService.getAll().pipe(map((response) => {
      if (response && response.length > 0) {

        let _filterList = this._filterListService.filterListInstant;

        let kntrlList = _filterList?.filter(p => p.data).map(p => p.data as UsersModel)
        //userları filter list e ekle 
        response.forEach((item) => {
          //userların daha önce eklenmemiş olduğunu kanıtla
          if (!kntrlList?.some(p => p.id === item.id)) {
            //users filter liste ekemek için model oluşumu
            _filterList?.push(new FilterModel({
              key: `${filterModel?.key}${item.name}-${item.surName}`,
              data: item,
              func: (itemModel) => {
                let user = <UsersModel>(itemModel?.data);

                //user a ait listeyi getir
                if (user)
                  this._caseService.getByUserId(user.id).subscribe(result => {

                    this._listCaseService.listCase$ = result;
                  })
                else {
                  this._listCaseService.listCase$ = undefined;
                }

              }
            }));

            this.isRunProcess = true;
          }
        });
        console.log("girdi55")
        console.log(_filterList)
        this._filterListService.filterList$ = _filterList;
      }
    }));

    forkJoin([forRunProcess]).subscribe(() => {
      if (!this.isRunProcess)
        return;

      this.isRunProcess = false;

      if (secondaryProccess) {
        secondaryProccess();
      }
    })
  }
}
