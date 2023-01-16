import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Author } from '../author/author.model';
import { Twimp } from './twimp.model';

@Injectable({
  providedIn: 'root'
})
export class TwimpService {

  private url:string = 'http://localhost:3000/twimps';
  private urlFavorite:string = 'http://localhost:3000/author-favorites';

  constructor(private httpClient: HttpClient) { }

  getTwimps(): Observable<Twimp[]> {
    let twimps: Twimp[] = [];

    return this.httpClient.get(this.url).pipe(
      map((dbTwimpList: any) => {
        for (let i in dbTwimpList) {
          let twimp: Twimp = new Twimp(dbTwimpList[i].id, 'localhost:4200/twimp/' + dbTwimpList[i].id, new Author(dbTwimpList[i].author), dbTwimpList[i].content, dbTwimpList[i].timestamp);
          twimps.push(twimp);
        }
        return twimps;
      }),
      catchError(this.handleError)
    );
  }

  getFavoriteByAuthor(idAuthor: string, idTwimp: string): boolean {
    this.getFavoriteTwimpsList(idAuthor).subscribe(favorites => {
        if (favorites.indexOf(idTwimp) == -1) {
          return false;
        } else {
          return true;
        }
    });
    return false;
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? '${error.status} - ${error.statusText}' : 'Server error';
      console.error(errMsg);
      return throwError(() => errMsg);
  }

  getFavoriteTwimpsList(idAuthor: string): Observable<string[]> {
    return this.httpClient.get(this.urlFavorite + '/' + idAuthor).pipe(
      map((response: any) => {
        console.log(response)
        return response['twimps'];
      }),
      catchError(this.handleError)
    );
  }

  intervalFavorite(idAuthor: string, idTwimp: string): void {
    this.getFavoriteTwimpsList(idAuthor).subscribe(favTwimps => {
      this.updateFavoritesTwimps(favTwimps, idTwimp, idAuthor);
    });
  }

  updateFavoritesTwimps(favorites: string[], idTwimp: string, idAuthor: string): void {
    console.log("Arriba a update " + favorites)
    let index: number = favorites.indexOf(idTwimp);
    if (index == -1) {
      console.log("añadee: " + index)
      favorites.push(idTwimp);
    } else {
      console.log("borra: " + index)
      favorites.splice(index, 1);
    }

    let favoritesTwimps: Object = { 'id': idAuthor, 'twimps': favorites }
    console.log(favoritesTwimps);
    this.httpClient.patch(this.urlFavorite, favoritesTwimps).pipe(
      catchError(this.handleError)
    );
  }
}
