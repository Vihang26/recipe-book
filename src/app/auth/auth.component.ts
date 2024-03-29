import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;
  isLoading = false;
  error:string;
  constructor(private authservice: AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm){

    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs =this.authservice.login(email,password);
    }else{
      authObs = this.authservice.signup(email,password);
    }

    authObs.subscribe(
      resData =>{
        this.isLoading = false;
        console.log(resData);
        this.router.navigate(['/recipes']); 
      },
      errorMessage =>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

}
