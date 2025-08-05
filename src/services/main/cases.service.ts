import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { CasesModel } from '../../models/concrete/entity-models/cases.model';
import { CasesUrl } from '../url/entity-models-url/cases.url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CasesService extends BaseService<CasesModel,CasesUrl>{

  constructor(http:HttpClient) {
    super(http,new CasesUrl());
    
  }
}
