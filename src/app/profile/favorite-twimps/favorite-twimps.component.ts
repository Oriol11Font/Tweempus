import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { AuthorService } from 'src/app/shared/author/author.service';
import { Twimp } from 'src/app/shared/twimp/twimp.model';
import { TwimpService } from 'src/app/shared/twimp/twimp.service';

@Component({
  selector: 'tweempus-favorite-twimps',
  templateUrl: './favorite-twimps.component.html',
  styleUrls: ['./favorite-twimps.component.css']
})
export class FavoriteTwimpsComponent implements OnInit {
  idAuthor!: string;
  twimpList: Twimp [] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private authorService: AuthorService,
    private twimpService: TwimpService) { }

  ngOnInit() {
    this.idAuthor = this.route.parent?.snapshot.params['id'];
    this.twimpService.getTwimps().subscribe(twimps => {
      from(twimps).subscribe(twimp => {
        this.authorService.getAuthor(twimp.author.id).subscribe(author => {
          twimp.author = author;
          this.twimpService.getFavoritesByAuthor(this.idAuthor, twimp.id).subscribe(favorite => {
            twimp.favorite = favorite;
            if (favorite) {
              this.twimpList.push(twimp);
            }
          })
        })
      })
    })
  }

}
