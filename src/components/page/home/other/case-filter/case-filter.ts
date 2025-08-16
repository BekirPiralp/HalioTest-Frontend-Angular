import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  _filterList: Array<FilterModel> = [
    /*"@case-name:",
    "@case-description:",
    "@status:",
    "@status-description:",
    "@asigned-user:",*/
    new FilterModel(
      {
        key:"@case-name:",
        isDefault: true,
        func:(_fModel)=>{
          this._caseService.getAll().subscribe(response=>{
            if(response?.length>0){
              response.forEach((item)=>{
                this._filterList.push(new FilterModel({
                  key:`@case-name:${item.name}`,
                  data: item,
                  func(filterModel) {
                    // case işlem; ve case list güncellencek
                  },
                }))
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
        func:(filterModel)=>{
          let searchKey = filterModel?.value;
          if(searchKey?.trim()){
            this._caseService.getBySearchtoDescription(searchKey).subscribe(reponse=>{
              //case list güncellenecek
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
                  this._caseStatusService.getAll().subscribe(reponse=>{
                    //ilk olarak date göre ters sıralı ve case göre gruplu halde getir
                    //listeyi for ile dön ve aynı case idli ilk itemı yeni listeye al
                    //yeni listeye göre case listi oluştur ve yolla
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
      func:(filterModel)=>{
        if(filterModel?.value){
          this._caseStatusService.getBySearchtoDescription(filterModel?.value).subscribe((response)=>{
            //gelenlere göre case list oluştur;
            //aynı case 1 defa listede olsun
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
                        //caseleri listeye al
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


}