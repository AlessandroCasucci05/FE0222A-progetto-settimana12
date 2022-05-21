import { Component, OnInit } from '@angular/core';
import { DashMovie } from 'src/app/model/dash-movie';
import { Movie } from 'src/app/model/movie';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  posterURL: string= 'https://image.tmdb.org/t/p/w500';
  movies?: DashMovie[];

  constructor(private movieSrv:MoviesService) { }

  ngOnInit(): void {
     this.movieSrv.getMovies().then(res=>{
       this.movies=res;
     })
  }

  async addFav(movie:DashMovie){
    try{
      await (await this.movieSrv.addFavorite(movie)).toPromise();
      movie.fav=true;
    }catch(err){
       console.log(err);
    }


  }

  async removeFav(movie:DashMovie){
    try{
      if (movie.favId!==undefined){
         this.movieSrv.removeFavorite(movie.favId).toPromise();
      }
       movie.fav=false;

    }catch(err){

    }
  }




}
