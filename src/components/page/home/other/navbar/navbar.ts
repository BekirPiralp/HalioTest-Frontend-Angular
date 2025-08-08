import { Component, OnInit } from '@angular/core';
import { UsersModel } from '../../../../../models/concrete/entity-models/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  constructor( private router: Router) {

  }

  user= new UsersModel(0,'Foo','Fouter','5554443322','test01@mail.com','asdasdas');

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    
    if(storedUser)
      this.user = JSON.parse(storedUser) as UsersModel;
    else
      this.exit();
  
  }

  

  exit():void{
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
