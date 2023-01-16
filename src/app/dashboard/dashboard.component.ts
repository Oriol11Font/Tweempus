import { Component, OnInit, ɵisObservable } from '@angular/core';
import { from } from 'rxjs';

import { AuthorService } from '../shared/author/author.service';
import { Twimp } from '../shared/twimp/twimp.model';
import { TwimpService } from '../shared/twimp/twimp.service';

@Component({
  selector: 'tweempus-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  twimpList: Twimp[] = [];

  constructor(
    private authorService: AuthorService,
    private twimpService: TwimpService
  ) { }

  ngOnInit(): void {
      this.twimpService.getTwimps().subscribe(twimps => {
        from(twimps).subscribe(twimp => {
          this.authorService.getAuthors(twimp.author.id).subscribe(author => {
            twimp.author = author;
            this.twimpService.getFavoriteByAuthor('1', twimp.id).subscribe(favorite => {
              twimp.favorite = favorite;
              this.twimpList.push(twimp);
            })
          })
        })
      });
  }
}
