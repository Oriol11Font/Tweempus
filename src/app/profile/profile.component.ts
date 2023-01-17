import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../shared/author/author.model';
import { AuthorService } from '../shared/author/author.service';

@Component({
  selector: 'tweempus-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  idAuthor: string | null = null;
  author: Author | null = null;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService) { }

  ngOnInit() {
    this.idAuthor = this.route.snapshot.params['id'];
    this.authorService.getAuthor(this.idAuthor!).subscribe(author => this.author = author);
  }


}
