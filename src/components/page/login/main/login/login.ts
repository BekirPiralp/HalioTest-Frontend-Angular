import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../../../services/login.service';
import { UsersService } from '../../../../../services/main/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private login:LoginService,
    private userService:UsersService,
    private router:Router) {
    
  }
  email: string = '';
  password: string = '';

  onSubmit() {
    if (this.email && this.password) {
      this.login.Login(this.email,this.password).subscribe(response=>{
        if(response)
        {
          this.userService.getUser(this.email).subscribe(
            response=>{
              localStorage.clear();
              localStorage.setItem("user",JSON.stringify(response));
              this.router.navigate(["/"]);
            }
          )
        }else{
          //alertify gelecek
          alert("Giriş başarısız");
        }
      } 
      )
    }
  }
}
