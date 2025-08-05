import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../../../services/login.service';
import { UsersService } from '../../../../../services/main/users.service';
import { Router } from '@angular/router';
import alertify from 'alertifyjs';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
  constructor(private login:LoginService,
    private userService:UsersService,
    private router:Router) {
    
  }
  email: string = '';
  password: string = '';

  
  ngOnInit(){
    localStorage.clear;  
  }

  onSubmit() {
    if (this.email && this.password) {
      this.login.Login(this.email,this.password).subscribe(response=>{
        localStorage.clear();
        if(response)
        {
          alertify.success("Giriş Başarılı.");
          this.userService.getUser(this.email).subscribe(
            response=>{
              localStorage.setItem("user",JSON.stringify(response));
              this.router.navigate(["/"]);
            }
          )
        }else{
          alertify.error("Giriş işlemi başarısız");
        }
      } 
      )
    }
  }
}
