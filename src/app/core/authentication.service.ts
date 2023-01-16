import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthorService } from '../shared/author/author.service';
import { Token } from './token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url:string = 'http://localhost:3000/authenticated';

  token: Token | null = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authorService: AuthorService
  ) { }

  login(idAuthor: string): void {
    this.authorService.getAuthors(idAuthor).subscribe(author => {
      let tokenGenerated = this.generateToken();
      this.saveSession(tokenGenerated, author.id).subscribe((response: any) => {
        this.token = new Token(response['id'], response['author']);
        this.router.navigate(['/dashboard'])
      })
    });
  }

  logout(): void {
    this.deleteSession().subscribe((response: any) => {
      this.token = null;
      this.router.navigate(['/login']);
    });
  }

  generateToken(): string {
    let date: number = new Date().getTime();
    let text: string = "";
    let possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    text += date;

    return text;
  }

  saveSession(tokenGenerated: string, idAuthor: string): Observable<Object> {
    let session: Object = { 'id': tokenGenerated, 'author': idAuthor };

    return this.httpClient.post(this.url, session).pipe(
      catchError(this.handleError)
    );
  }

  deleteSession(): Observable<Object> {
    return this.httpClient.delete(this.url + '/' + this.token!.key).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? '${error.status} - ${error.statusText}' : 'Server error';
      console.error(errMsg);
      return throwError(() => errMsg);
  }
}
