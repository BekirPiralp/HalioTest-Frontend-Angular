import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { AssignedCaseModel } from '../../models/concrete/entity-models/assigned-case.model';
import { AssignedCaseUrl } from '../url/entity-models-url/assigned-case.url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignedCaseService extends BaseService<AssignedCaseModel,AssignedCaseUrl> {
  constructor(http:HttpClient) {
    super(http,new AssignedCaseUrl());
  }
  
}
