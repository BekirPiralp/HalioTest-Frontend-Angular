import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { CaseStatusModel } from '../../models/concrete/entity-models/case-status.model';
import { CaseStatusUrl } from '../url/entity-models-url/case-status.url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaseStatusService extends BaseService<CaseStatusModel,CaseStatusUrl> {
  
  constructor(http:HttpClient) {
    super(http,new CaseStatusUrl());
  }
  
}
