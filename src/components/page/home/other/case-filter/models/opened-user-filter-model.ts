import { concatMap, EMPTY, firstValueFrom, forkJoin, map, Observable, take } from "rxjs";
import { UsersModel } from "../../../../../../models/concrete/entity-models/users.model";
import { DefaultFilterKeys } from "../../../../../../models/concrete/other/default-filter-keys";
import { CasesService } from "../../../../../../services/main/cases.service";
import { UsersService } from "../../../../../../services/main/users.service";
import { IFilterModel } from "../../../../../tools/combo-box/models/abstract/ifilter-model";
import { FilterModel } from "../../../../../tools/combo-box/models/concrete/filter-model";
import { FilterListService } from "../../../../../tools/combo-box/services/filter-list.service";
import { ListCaseService } from "../services/list-case.service";
import { SpinnerService } from "../../../../../tools/spinner/service/spinner.service";
import alertify from "alertifyjs";

export class OpenedUserFilterModel extends FilterModel implements IFilterModel {
  constructor(
    private _listCaseService: ListCaseService,
    private _filterListService: FilterListService,
    private _caseService: CasesService,
    private _usersService: UsersService,
    private _spinnerService:SpinnerService
  ) {
    super({
      key: DefaultFilterKeys.openedUser,
      isDefault: true,
      func: (filterModel, secondaryProccess) => {
        this.OpenedUserFilterFunc(filterModel, secondaryProccess);
      },
    });


  }

  private isRunProcess = false; //secondaryprocres için
  private _filterList: IFilterModel[] | undefined;

  set filterList(value:IFilterModel[] | undefined){
    this._filterList=value
  }

  private OpenedUserFilterFunc(filterModel?: IFilterModel, secondaryProccess?: () => void) {
    //Users listesini getir
    this._spinnerService.spinnerDisplay$=true;
    this._usersService.getAll().pipe(map(async (response) => {
      
      if (response && response.length > 0) {
        
        this._filterList = this._filterListService.filterListInstant;
        
        if(!this._filterList)
          this._filterList = await firstValueFrom(this._filterListService.filterList$);
        
        let kntrlList = this._filterList?.filter(p => p.data && p.key!.toLowerCase().startsWith(DefaultFilterKeys.openedUser.toLowerCase())).map(p => p.data as UsersModel)
        
        //userları filter list e ekle 
        response.forEach((item) => {
          //userların daha önce eklenmemiş olduğunu kanıtla
          if (!kntrlList || !kntrlList?.some(p => p.id === item.id)) {
            
            if (!this._filterList)
              this._filterList = [];
            
            //users filter liste ekemek için model oluşumu
            this._filterList?.push(new FilterModel({
              key: `${filterModel?.key}${item.name}-${item.surName}`,
              data: item,
              func: (itemModel) => {
                let user = <UsersModel>(itemModel?.data);

                //user a ait listeyi getir
                if (user){
                  this._caseService.getByUserId(user.id).subscribe(result => {

                    this._listCaseService.listCase$ = result;
                  })}
                else {
                  this._listCaseService.listCase$ = undefined;
                }

              }
            }));

            this.isRunProcess = true; //yeni user var ise
          }
        });

        this._filterListService.filterList$ = this._filterList;

        if (!this.isRunProcess)
          return;

        this.isRunProcess = false;

        if (secondaryProccess)
          secondaryProccess();

      }
    })).subscribe(()=>{
      this._spinnerService.spinnerDisplay$=false;
    });

  }
}
