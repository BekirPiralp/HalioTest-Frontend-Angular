import { Component } from '@angular/core';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-tool-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css'
})
export class Spinner {
  constructor(spinnerService:SpinnerService) {
    spinnerService.spinnerDisplay$.subscribe(result=>{
      this.display=result;
    })
  }
  protected display=false;

}
