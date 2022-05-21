import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Authdata } from '../model/authdata';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL:string = "http://localhost:4201/"
  private utenteSub = new BehaviorSubject<Authdata | null> (null);
   user$ = this.utenteSub.asObservable();
  private temporimasto:any;
  jwt = new JwtHelperService();

  constructor(private http:HttpClient, private router:Router) {
      this.set();
  }

  errors(err:any){
    console.log(err);
    return throwError(err);
  }

  logIn(user:{ email: string; password: string }){
    console.log(user);
     return this.http.post<Authdata>(this.apiURL+'login',user).pipe(
       tap((user)=>{
         this.utenteSub.next(user);
         localStorage.setItem('user', JSON.stringify(user));
         this.autoLogOut(user);
       }),
       catchError(this.errors)
       );
    }


  signUp(user: {name:string, email:string, password:string}){
    return this.http.post<Authdata>(this.apiURL+'register',user);
  }

  logOut(){
    this.utenteSub.next(null);
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
    if (this.temporimasto){
       clearTimeout(this.temporimasto);
    }
  }

  isLogged(){
    if (localStorage.getItem("user")){
      return true;
    }
    return false;
  }

  set(){
    const utentejson= localStorage.getItem("user");
    if (!utentejson){
      return;
    }
     const utente: Authdata = JSON.parse(utentejson);
     if (!this.jwt.isTokenExpired(utente.accessToken)){
        this.utenteSub.next(utente);
        this.autoLogOut(utente);
     }
  }

  autoLogOut(user:Authdata){
     const scandenza = this.jwt.getTokenExpirationDate(user.accessToken) as Date;
     this.temporimasto= setTimeout(()=>{
       this.logOut();
     },scandenza.getTime()- new Date().getTime());
  }

}
