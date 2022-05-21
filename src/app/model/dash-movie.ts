import { Movie } from "./movie";

export interface DashMovie {
  movie:Movie;
  fav: boolean,
  favId:number |undefined,
}
