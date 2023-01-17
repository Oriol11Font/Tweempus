import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/shared/author/author.service';
import { Author } from '../../shared/author/author.model';

@Component({
  selector: 'tweempus-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  newUserForm!: FormGroup;
  idAuthor!: string;
  image!: string;

  constructor (
    private authorService: AuthorService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.idAuthor = this.route.parent!.snapshot.params['id'];
    this.authorService.getAuthor(this.idAuthor).subscribe(author => {
      this.image = author.image;
      this.newUserForm = this.fb.group({
        fullName: [author.fullName, [Validators.required, Validators.minLength(3)]],
        image: [author.image]
      });
    })
  }

  saveProfile(form: any) {
    this.authorService.updateAuthor(this.idAuthor, form.value.fullName, form.value.image);
  }
}
