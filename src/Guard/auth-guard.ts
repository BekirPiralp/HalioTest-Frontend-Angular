import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/other/local-storage.service';
import alertify from 'alertifyjs';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if(localStorageService.loginedUser && localStorageService.loginedUser.id>0){
    return true;
  }else{
    router.navigate(["/login"])
    return false;
  }

  return true;
};

