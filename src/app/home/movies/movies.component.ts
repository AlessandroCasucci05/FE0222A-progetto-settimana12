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

  addFav(movie:DashMovie){
     this.movieSrv.addFavorite(movie);
     movie.fav=true;
  }

  removeFav(movie:DashMovie){
    if (movie.favId!==undefined){
      this.movieSrv.removeFavorite(movie.favId);
    }
     movie.fav=false;
  }




}
