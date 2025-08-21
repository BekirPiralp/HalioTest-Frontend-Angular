import { Component } from '@angular/core';
import { CaseFormModalService } from './services/case-form-modal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CasesModel } from '../../../models/concrete/entity-models/cases.model';

@Component({
  selector: 'app-tool-case-form',
  imports: [FormsModule,CommonModule],
  templateUrl: './case-form.html',
  styleUrl: './case-form.css'
})
export class CaseForm {
onSubmit($event: Event) {
  alert(this.caseForCretate);
  console.log(this.caseForCretate)
}

  constructor(private thisModalService: CaseFormModalService) {
    this.subscribeToModalService()
  }

  protected isOpen = false;

  protected caseForCretate:CasesModel = CasesModel.prototype;


  subscribeToModalService() {
    this.thisModalService.isOpen$.subscribe((result) => {
      this.isOpen = result;
      console.log(this.caseForCretate)
    });
  }

  close() {
    console.log("girdi")
    this.thisModalService.close();
  }

}
