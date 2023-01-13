import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwimpCardComponent } from './twimp/twimp-card/twimp-card.component';
import { TwimpListComponent } from './twimp/twimp-list/twimp-list.component';
import { AuthorCardComponent } from './author/author-card/author-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TwimpCardComponent, TwimpListComponent, AuthorCardComponent],
  exports: [TwimpCardComponent, TwimpListComponent, AuthorCardComponent]
})
export class SharedModule { }
