import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';
import { FavoriteTwimpsComponent } from './favorite-twimps/favorite-twimps.component';
import { MyTwimpsComponent } from './my-twimps/my-twimps.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileComponent, FavoriteTwimpsComponent, MyTwimpsComponent]
})
export class ProfileModule { }
