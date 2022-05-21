import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take} from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Authdata } from 'src/app/model/authdata';
import { DashMovie } from 'src/app/model/dash-movie';
import { Favorite } from 'src/app/model/favorite';
import { Movie } from 'src/app/model/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {


  apiURL:string = "http://localhost:4201/"

  constructor(private http:HttpClient, private AuthSrv: AuthService) {}

  async getProfile(){
    const utente: Authdata = (await this.AuthSrv.user$.pipe(take(1))
    .toPromise() as Authdata);
    return utente;
  }





  async getMovies(): Promise<DashMovie[]> {
    const utente: Authdata = (await this.AuthSrv.user$.pipe(take(1))
    .toPromise() as Authdata);
    const movies = await this.http.get<Movie[]>(this.apiURL+'movie/popular')
    .toPromise();

    const fav = await this.http.get<Favorite[]>(this.apiURL+`favorites?userId=${utente.user.id}`).toPromise();
    return movies!.map((m)=>({
      movie: m,
      fav: !!fav?.find((x)=>x.movieId===m.id),
      favId: fav?.find((f)=> f.movieId === m.id)?.id,
    }));

  }

  async addFavorite(movie:DashMovie){
    const utente: Authdata = (await this.AuthSrv.user$.pipe(take(1))
    .toPromise() as Authdata);
    return this.http.post<Favorite>(this.apiURL+'favorites', {
      userId: utente.user.id,
      movieId: movie.movie.id,

    });
  }

    removeFavorite(id:number){
    return this.http.delete(this.apiURL+"favorites/"+id)
  }

}
