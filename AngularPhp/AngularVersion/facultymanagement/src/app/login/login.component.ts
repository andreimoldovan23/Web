import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: Login = {
    name: "",
    password: "",
    isTeacher: false
  };

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() : void {
      this.service.getLogin(this.loginData)
          .subscribe(_ => {
            this.loginData.isTeacher ? this.router.navigate(['/teacher']) : this.router.navigate(['/student']);
          });
  }

}
