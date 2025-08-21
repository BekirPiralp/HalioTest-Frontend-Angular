import { Component } from '@angular/core';
import { CaseFormModalService } from './services/case-form-modal.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CasesModel } from '../../../models/concrete/entity-models/cases.model';
import { UsersModel } from '../../../models/concrete/entity-models/users.model';
import { CasesService } from '../../../services/main/cases.service';
import alertify from 'alertifyjs';
import { CaseStatusService } from '../../../services/main/case-status.service';
import { CaseStatusModel } from '../../../models/concrete/entity-models/case-status.model';
import { CaseStatus } from '../../../models/concrete/other/case-status';

@Component({
  selector: 'app-tool-case-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './case-form.html',
  styleUrl: './case-form.css'
})
export class CaseForm {


  constructor(private thisModalService: CaseFormModalService, private casesService:CasesService, private caseStatusService:CaseStatusService) {
    const storedUser = localStorage.getItem('user');
            
      if(storedUser)
        this.user = JSON.parse(storedUser) as UsersModel;

    this.subscribeToModalService();
    this.datesValidatorSetting();
    this.caseFormSetting();
  }

  protected user:UsersModel|undefined;

  protected isOpen = false;

  protected caseForCretate: CasesModel|undefined;

  protected datesValidator!: ValidatorFn;

  protected caseForm!: FormGroup<{
    name: FormControl<string | null>;
    desciription: FormControl<string | null>;
    startDate: FormControl<string | null>;
    finishDate: FormControl<string | null>;
  }>;

  subscribeToModalService() {
    this.thisModalService.isOpen$.subscribe((result) => {
      this.isOpen = result;
    });
  }

  close() {
    this.thisModalService.close();
  }



  datesValidatorSetting() {
    this.datesValidator = (control: AbstractControl) => {
      const group = control as FormGroup;

      const start = group.get('startDate')?.value;
      const finish = group.get('finishDate')?.value;

      if (start && finish) {
        return (new Date(start)).valueOf() < (new Date(finish)).valueOf() ? null : { datesInvalid: true };
      }

      return null;
    }
  }



  caseFormSetting() {
    this.caseForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      desciription: new FormControl<string>("", [Validators.required, Validators.minLength(6)]),
      startDate: new FormControl<string>("", [Validators.required]),
      finishDate: new FormControl<string>("", [Validators.required])
    },{validators:this.datesValidator});

  }


  onSubmit() {

    if (this.caseForm.valid && this.user) {
      this.caseForCretate = new CasesModel(0, 
        this.caseForm.value.name!,
        this.caseForm.value.desciription!,
        new Date(this.caseForm.value.startDate!),
        new Date(this.caseForm.value.finishDate!),
        this.user.id,
      );

      this.casesService.create(this.caseForCretate).subscribe((result)=>{
        if(result){
          this.caseStatusService.create(new CaseStatusModel(0,result.id,new Date(),CaseStatus.Active,"")).subscribe(()=>{
            alertify.success("Görev Başarı ile kaydedildi.");
          })
        }
      });
    }

  }
}
