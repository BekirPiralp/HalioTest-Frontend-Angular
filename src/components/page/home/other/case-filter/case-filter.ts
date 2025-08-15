import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Params } from '../../../../tools/combo-box/models/abstract/params';
import { FilterModel } from '../../../../tools/combo-box/models/concrete/filter-model';
import { ComboBox } from "../../../../tools/combo-box/combo-box";
import { CasesService } from '../../../../../services/main/cases.service';
import { CaseStatusService } from '../../../../../services/main/case-status.service';
import { CaseStatus } from '../../../../../models/concrete/other/case-status';

@Component({
  selector: 'app-home-case-filter',
  imports: [CommonModule, FormsModule, ComboBox],
  templateUrl: './case-filter.html',
  styleUrl: './case-filter.css'
})
export class CaseFilter {
  constructor(private _caseService:CasesService,private _caseStatusService:CaseStatusService
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
         Object.values(CaseStatus).filter((v):v is number=> typeof v === 'number').forEach((item)=>{
          console.log(item)
          this._filterList.push(new FilterModel({
            key:`${filterModel?.key}${CaseStatus[item as number]}`,
            func:(filterModel)=>{
              this._caseStatusService.getAll().subscribe(reponse=>{
                //reponse.filter(p=>p.status && p.status === item)
              })  
            },
          }));
         });
      },
    }),
    new FilterModel({
      key:"@status-description:",
      isDefault: true,
    }),
    new FilterModel({
      key:"@asigned-user:",
      isDefault: true,
    })
  ]


}