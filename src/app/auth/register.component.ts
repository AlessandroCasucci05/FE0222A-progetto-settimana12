import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginForm:FormGroup;


  constructor(private fb: FormBuilder, private authSrv: AuthService, private router:Router) {
    this.loginForm= this.fb.group({
      nome:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    });
   }

  ngOnInit(): void {

  }

  get nome(){
  return this.loginForm.get("nome");
}

  get email(){
    return this.loginForm.get("email");
  }
  get password(){
    return this.loginForm.get("password");
  }

  async onRegister(){
    try{
      await this.authSrv.signUp(this.loginForm.value).toPromise();
      this.router.navigate(['/login']);
    }catch(error){
       this.loginForm.reset();
       console.log(error);
    }

  }


}
