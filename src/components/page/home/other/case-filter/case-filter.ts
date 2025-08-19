import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Params } from '../../../../tools/combo-box/models/abstract/params';
import { FilterModel } from '../../../../tools/combo-box/models/concrete/filter-model';
import { ComboBox } from "../../../../tools/combo-box/combo-box";
import { CasesService } from '../../../../../services/main/cases.service';
import { CaseStatusService } from '../../../../../services/main/case-status.service';
import { CaseStatus } from '../../../../../models/concrete/other/case-status';
import { AssignedCaseService } from '../../../../../services/main/assigned-case.service';
import { UsersService } from '../../../../../services/main/users.service';
import { UsersModel } from '../../../../../models/concrete/entity-models/users.model';
import { CasesModel } from '../../../../../models/concrete/entity-models/cases.model';
import { CaseStatusModel } from '../../../../../models/concrete/entity-models/case-status.model';
import { forkJoin, of, tap } from 'rxjs';

@Component({
  selector: 'app-home-case-filter',
  imports: [CommonModule, FormsModule, ComboBox],
  templateUrl: './case-filter.html',
  styleUrl: './case-filter.css'
})
export class CaseFilter {
  constructor(private _caseService:CasesService,
    private _caseStatusService:CaseStatusService,
    private _assignedCaseService:AssignedCaseService,
    private _usersService:UsersService
  ) {
    
  }
  
  @Output() listCaseChange = new EventEmitter<CasesModel[]|undefined>();
  
  private _listCase:CasesModel[]|undefined;
  
  protected menu: boolean = false;
  
  
  _filterList: Array<FilterModel> = [
    /*"@case-name:",
    "@case-description:",
    "@status:",
    "@status-description:",
    "@asigned-user:",*/
    new FilterModel({
      key:"",
      isDefault: true,
      func:(_):void=>{
        this._caseService.getAllDesc().subscribe(response=>{
          this._listCase=response && response.length > 0? response : undefined;
          this.listCaseChange.emit(this._listCase);
        })
      }
    }),
    new FilterModel(
      {
        key:"@case-name:",
        isDefault: true,
        func:(_fModel)=>{
          this._caseService.getAll().subscribe(response=>{
            if(response?.length>0){
              response.forEach((item)=>{
                if(!this._filterList.some(p=>(p.data as CasesModel).id === item.id)){
                  this._filterList.push(new FilterModel({
                    key:`@case-name:${item.name}`,
                    data: item,
                    func:(filterModel)=>{
                      //case name e göre arama yapılacak
                      if(filterModel?.value)
                        this._caseService.getByName(filterModel?.value).subscribe((response)=>{
                            //case işlem; ve case list güncellencek
                            
                            if(response && response.length > 0)
                              this._listCase=response;
                            
                            else
                              this._listCase=undefined;

                            this.listCaseChange.emit(this._listCase);
                          }
                        )
                    },
                  }))
                }
              })
            }
          })
        }
      }
    ),
    new FilterModel(
      <Params>{
        key:"@case-description:",
        isDefault: true,
        isUseSelectingKey: true,
        func:(filterModel)=>{
          let searchKey = filterModel?.value;
          if(searchKey?.trim()){
            this._caseService.getBySearchtoDescription(searchKey).subscribe(response=>{
              //case list güncellenecek
              if(response && response.length > 0)
                this._listCase=response;
              
              else
                this._listCase=undefined;

              this.listCaseChange.emit(this._listCase);
            })
          }
        },
      }),
    new FilterModel({
      key:"@status:",
      isDefault: true,
      func:(filterModel)=>{
        //enum a göre yeni sattusler ile vryant eklenecek
         var values= Object.values(CaseStatus)
         values.filter(v=>typeof(v) == "number")
         .forEach((item)=>{
            
            if(!this._filterList.some(p=>p.value === CaseStatus[item as number])){

              this._filterList.push(new FilterModel({
                key:`${filterModel?.key}${CaseStatus[item as number]}`,
                func:(itemModel)=>{
                  //ilk olarak date göre ters sıralı halde getir
                  this._caseStatusService.getOrderedDateDesc().subscribe(response=>{
                    //Liste yok yada boş ise çık
                    if(!response || response.length<=0){
                      this._listCase = undefined;
                      this.listCaseChange.emit(this._listCase);
                      return;
                    }
                      
                    //listeyi for ile dön ve farklı case id li ilk itemı al
                    const uniqStatusModelMap = new Map<number,CaseStatusModel>();
                    response.forEach((itemStatus)=>{
                      if(!uniqStatusModelMap.has(itemStatus.caseId))
                        uniqStatusModelMap.set(itemStatus.caseId,itemStatus);
                      }
                    );
                    
                    //CaseSutasu number ı eşit olanı filtrele
                    var newList = Array.from(uniqStatusModelMap.values()).filter(p=>p.status === item as number);

                    //case nesnesi olamayanın nesnesini al
                    let observables = newList?.filter(s=>!s.cases && s.caseId && s.caseId>0)
                    .map(s=> this._caseService.getById(s.caseId).pipe(
                        tap((c)=>{
                          if(c)
                            s.cases=c;
                        })
                      )
                    )

                    //observable yok ise de tetikelensin diye of(undifined) => bu tüm caseler zaten gelmiş demek
                    const safeObservables = (observables && observables.length>0?observables:[of(undefined as unknown as CasesModel)]);

                    forkJoin(safeObservables).subscribe(()=>{
                      //yeni listeye göre case listi oluştur 
                      
                      let responseList:CasesModel[]|undefined = newList
                      .map(p=>p.cases)
                      .filter((c):c is CasesModel => !!c) || undefined; //!!c eşittir !c != true , !c ise boş olmadurumu , direk c verince liste (casesmodel|undefine)[]|undifined şekline dönüyor // runtimeda sıkıntı yok ama
                      
                      this._listCase = responseList;

                      this.listCaseChange.emit(this._listCase);
                    })
                      
                  })
                },
              }));
              
            }

         });
      },
    }),
    new FilterModel({
      key:"@status-description:",
      isDefault: true,
      isUseSelectingKey: true,
      func:(filterModel)=>{
        if(filterModel?.value){
          this._caseStatusService.getBySearchtoDescription(filterModel?.value).subscribe((response)=>{
            if(!response || response.length<=0){
              this._listCase = undefined;
              this.listCaseChange.emit(this._listCase);
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

            this._listCase = list;
            this.listCaseChange.emit(this._listCase);
          })
          
        }
      }
    }),
    new FilterModel({
      key:"@asigned-user:",
      isDefault: true,
      func:(filterModel)=>{
        
        //Users listesini getir
        this._usersService.getAll().subscribe((response)=>{
          if(response && response.length > 0){
            //userları filter list e ekle 
            response.forEach((item)=>{
              //userların daha önce eklenmemiş olduğunu kanıtla
              if(!this._filterList.some(p=>p.value === `${item.name}-${item.surName}`))
                //users filter liste ekemek için model oluşumu
                this._filterList.push(new FilterModel({
                  key:`${filterModel?.key}${item.name}-${item.surName}`,
                  data:item,
                  func:(itemModel)=>{
                    let user = <UsersModel>(itemModel?.data);

                    //user a ait listeyi getir
                    this._assignedCaseService.getByUserId(user.id).subscribe(
                      (responseAssigned)=>{
                        //liste boş ise
                        if(!responseAssigned || responseAssigned.length <=0){
                          this._listCase = undefined;
                          this.listCaseChange.emit(this._listCase);
                          return;
                        }

                        //caselerin varlığı yok ise 
                        const observables=responseAssigned.filter(s=>!s.cases && s.caseId && s.caseId>0)
                         .map(
                          (a)=>this._caseService.getById(a.caseId).pipe(
                            tap(
                              (c)=>a.cases=c
                            )
                          )
                        )

                        //observarebles tip güvenliği
                        const safeObservables = (observables && observables.length > 0 ?observables:[of(undefined as unknown as CasesModel)]);

                        //fork ile işleme
                        forkJoin(safeObservables).subscribe(()=>{
                          //listeyi oluşturma
                          const list = responseAssigned.map(a=>a.cases).filter((c):c is CasesModel => !!c) || undefined;

                          //listeyi gönderme
                          this._listCase = list;
                          this.listCaseChange.emit(this._listCase);
                        })
                      }
                    )
                  }
                }));
            });
          }
        })
      },
    })
  ]

  menuDisplay() {
    this.menu = true;
  }
  menuHidden() {
    this.menu = false;
  }

}