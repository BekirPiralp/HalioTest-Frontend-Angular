import { Component, Input, Output } from '@angular/core';
import { IFilterModel } from './models/abstract/ifilter-model';

@Component({
  selector: 'app-combo-box',
  imports: [],
  templateUrl: './combo-box.html',
  styleUrl: './combo-box.css'
})
export class ComboBox {
  
  @Input() filterList?:IFilterModel[];
  @Output() filterListChange = this.filterList;
  @Output() selectedValue?:IFilterModel;
}
