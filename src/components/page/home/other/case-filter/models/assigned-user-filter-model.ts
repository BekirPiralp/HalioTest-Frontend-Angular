import { tap, of, forkJoin, map, Observable, concatMap, firstValueFrom } from "rxjs";
import { CasesModel } from "../../../../../../models/concrete/entity-models/cases.model";
import { UsersModel } from "../../../../../../models/concrete/entity-models/users.model";
import { DefaultFilterKeys } from "../../../../../../models/concrete/other/default-filter-keys";
import { CasesService } from "../../../../../../services/main/cases.service";
import { IFilterModel } from "../../../../../tools/combo-box/models/abstract/ifilter-model";
import { FilterModel } from "../../../../../tools/combo-box/models/concrete/filter-model";
import { ListCaseService } from "../services/list-case.service";
import { UsersService } from "../../../../../../services/main/users.service";
import { FilterListService } from "../../../../../tools/combo-box/services/filter-list.service";
import { AssignedCaseService } from "../../../../../../services/main/assigned-case.service";
import { SpinnerService } from "../../../../../tools/spinner/service/spinner.service";

export class AssignedUserFilterModel extends FilterModel implements IFilterModel {
  constructor(
    private _listCaseService: ListCaseService,
    private _filterListService: FilterListService,
    private _caseService: CasesService,
    private _usersService: UsersService,
    private _assignedCaseService: AssignedCaseService,
    private _spinnerService:SpinnerService
  ) {
    super({
      key: DefaultFilterKeys.asignedUser,
      isDefault: true,
      func: (filterModel, secondaryProccess) => {
        this.AssignedUserFilterFunc(filterModel, secondaryProccess);
      },
    });

  }

  private isRunProcess = false;
  private _filterList: IFilterModel[] | undefined;

  private AssignedUserFilterFunc(filterModel?: IFilterModel, secondaryProccess?: () => void) {

    this._spinnerService.spinnerDisplay$=true;

    //Users listesini getir
    this._usersService.getAll().pipe(map(async (response) => {

      if (response && response.length > 0) {

        this._filterList = this._filterListService.filterListInstant;
        
        if(!this._filterList)
          this._filterList = await firstValueFrom(this._filterListService.filterList$);

        // let _filterList = this._filterListService.filterListInstant;
        let kntrlList = this._filterList?.filter(p => p.data && p.key!.toLowerCase().startsWith(DefaultFilterKeys.asignedUser.toLowerCase())).map(p => p.data as UsersModel)
        //userları filter list e ekle 
        response.forEach((item) => {
          //userların daha önce eklenmemiş olduğunu kanıtla
          if (!kntrlList?.some(p => p.id === item.id)) {
            if (!this._filterList)
              this._filterList = [];

            //users filter liste ekemek için model oluşumu
            this._filterList?.push(new FilterModel({
              key: `${filterModel?.key}${item.name}-${item.surName}`,
              data: item,
              func: (itemModel) => {
                let user = <UsersModel>(itemModel?.data);

                //user a ait listeyi getir
                this._assignedCaseService.getByUserId(user.id).subscribe(
                  (responseAssigned) => {
                    //liste boş ise
                    if (!responseAssigned || responseAssigned.length <= 0) {
                      this._listCaseService.listCase$ = undefined;
                      return;
                    }

                    //caselerin varlığı yok ise 
                    const observables = responseAssigned.filter(s => !s.cases && s.caseId && s.caseId > 0)
                      .map(
                        (a) => this._caseService.getById(a.caseId).pipe(
                          tap(
                            (c) => a.cases = c
                          )
                        )
                      )

                    //observarebles tip güvenliği
                    const safeObservables = (observables && observables.length > 0 ? observables : [of(undefined as unknown as CasesModel)]);

                    //fork ile işleme
                    forkJoin(safeObservables).subscribe(() => {
                      //listeyi oluşturma
                      const list = responseAssigned.map(a => a.cases).filter((c): c is CasesModel => !!c) || undefined;

                      //listeyi gönderme
                      this._listCaseService.listCase$ = list;
                    })
                  }
                )
              }
            }));

            console.log("burda")
            this.isRunProcess = true;
          }
        });

        this._filterListService.filterList$ = this._filterList;
        if (!this.isRunProcess)
          return;

        this.isRunProcess = false;

        if (secondaryProccess)
          secondaryProccess();

      }
    })).subscribe(()=>this._spinnerService.spinnerDisplay$=false);

  }
}
