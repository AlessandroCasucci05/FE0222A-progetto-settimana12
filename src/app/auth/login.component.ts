import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';



@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private fb:FormBuilder, private authSrv: AuthService, private router: Router) {
    this.loginForm= this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  get email(){
    return this.loginForm.get("email");
  }

  get password(){
    return this.loginForm.get("password");
  }

  async onLogin(){
     try{
        await this.authSrv.logIn(this.loginForm.value).toPromise();
        this.router.navigate(['/']);

     }catch(error){
        this.loginForm.reset();
        alert("C'è stato un errore nella chiamata :(");
     }
  }






}
