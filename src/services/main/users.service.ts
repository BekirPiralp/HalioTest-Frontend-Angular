import { Injectable } from '@angular/core';
import { BaseUrl } from '../url/base-url';
import { BaseService } from './base/base.service';
import { UsersModel } from '../../models/concrete/entity-models/users.model';
import { UsersUrl } from '../url/entity-models-url/users.url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UsersModel, UsersUrl> {
  
  constructor(http: HttpClient) {
    super(http, new UsersUrl());

  }
}
