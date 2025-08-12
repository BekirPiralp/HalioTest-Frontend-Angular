import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Params } from '../../../../tools/combo-box/models/abstract/params';
import { FilterModel } from '../../../../tools/combo-box/models/concrete/filter-model';
import { ComboBox } from "../../../../tools/combo-box/combo-box";

@Component({
  selector: 'app-home-case-filter',
  imports: [CommonModule, FormsModule, ComboBox],
  templateUrl: './case-filter.html',
  styleUrl: './case-filter.css'
})
export class CaseFilter {
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
        func:(a)=>{
          console.log("function içi:")
          console.log(a)
          console.log(a?.toString());
          console.log("bitti");
          if(!this._filterList.find(p=>p.key==="@case-name:asd"))
              this._filterList.push(...[
                new FilterModel(
                    {
                      key:"@case-name:asd",
                      func:(a)=>{
                        console.log("function içi:")
                        console.log(a)
                        console.log(a?.value);
                        console.log("bitti");
                      }
                    })
              ]);
        }
      }
    ),
    new FilterModel(
      <Params>{
        key:"@case-description:",
        isDefault: true,
      }),
    new FilterModel({
      key:"@status:",
      isDefault: true,
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