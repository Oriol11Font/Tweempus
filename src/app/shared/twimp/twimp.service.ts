import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../author/author.model';
import { Twimp } from './twimp.model';

@Injectable({
  providedIn: 'root'
})
export class TwimpService {

  private url:string = environment.url + 'twimps';
  private urlFavorite:string = environment.url + 'author-favorites';

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

  getAuthorTwimps(idAuthor: string): Observable<Twimp[]> {
    let twimps: Twimp[] = [];

    return this.httpClient.get(this.url).pipe(
      map((dbTwimpList: any) => {
        for (let i in dbTwimpList) {
          if (dbTwimpList[i].author === idAuthor) {
            let twimp: Twimp = new Twimp(dbTwimpList[i].id, 'localhost:4200/twimp/' + dbTwimpList[i].id, new Author(dbTwimpList[i].author), dbTwimpList[i].content, dbTwimpList[i].timestamp);
            twimps.push(twimp);
          }
        }
        return twimps;
      }),
      catchError(this.handleError)
    )
  }

  setTwimp(twimp: Twimp): Observable<any> {
    let dbTwimp: any = {
      'id': twimp.id,
      'author': twimp.author.id,
      'by': twimp.author.fullName,
      'content': twimp.content,
      'timestamp': twimp.timestamp
    };

    return this.httpClient.post(this.url, dbTwimp).pipe(
      catchError(this.handleError)
    );
  }

  getFavoritesByAuthor(idAuthor: string, idTwimp: string): Observable<boolean> {
    return this.httpClient.get(this.urlFavorite + '/' + idAuthor).pipe(
      map((response: any) => {
        let favorites: string[] = response['twimps'];
        if (favorites.indexOf(idTwimp) == -1) {
          return false;
        } else {
          return true;
        }
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? '${error.status} - ${error.statusText}' : 'Server error';
      console.error(errMsg);
      return throwError(() => errMsg);
  }

  intervalFavorite(idAuthor: string): Observable<string[]> {
    return this.httpClient.get(this.urlFavorite + '/' + idAuthor).pipe(
      map((response: any) => {
        return response['twimps'];
      }),
      catchError(this.handleError)
    );
  }

  updateFavoritesTwimps(favorites: string[], idTwimp: string, idAuthor: string) {
    let index: number = favorites.indexOf(idTwimp);
    if (index == -1) {
      favorites.push(idTwimp);
    } else {
      favorites.splice(index, 1);
    }

    let favoritesTwimps: Object = { 'id': idAuthor, 'twimps': favorites }
    this.httpClient.patch(this.urlFavorite, favoritesTwimps).pipe(
      catchError(this.handleError)
    );
  }


}
