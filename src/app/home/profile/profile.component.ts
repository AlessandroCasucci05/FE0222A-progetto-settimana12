import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { Authdata } from 'src/app/model/authdata';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: Authdata;

  constructor(private movieSrv:MoviesService) { }

  ngOnInit(): void {
    this.profile();
  }

  async profile(){
     await this.movieSrv.getProfile().then((res)=>{
      this.user=res;
   })
  }

}
