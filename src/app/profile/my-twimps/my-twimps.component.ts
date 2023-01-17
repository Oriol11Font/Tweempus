import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { AuthorService } from 'src/app/shared/author/author.service';
import { Twimp } from 'src/app/shared/twimp/twimp.model';
import { TwimpService } from 'src/app/shared/twimp/twimp.service';

@Component({
  selector: 'tweempus-my-twimps',
  templateUrl: './my-twimps.component.html',
  styleUrls: ['./my-twimps.component.css']
})
export class MyTwimpsComponent implements OnInit {
  twimpList: Twimp [] = []
  idAuthor!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private authorService: AuthorService,
    private twimpService: TwimpService
  ) { }

  ngOnInit() {
    this.idAuthor = this.route.parent!.snapshot.params['id'];
    this.twimpService.getAuthorTwimps(this.idAuthor!).subscribe(twimps => {
      from(twimps).subscribe((twimp: any) => {
        this.authorService.getAuthor(twimp.author.id).subscribe(author => {
          twimp.author = author;
          this.twimpService.getFavoritesByAuthor(author.id, twimp.id).subscribe(favorite => {
            twimp.favorite = favorite;
            this.twimpList.push(twimp);
          })
        })
      })
    });
  }

}
