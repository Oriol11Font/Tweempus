import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../core/auth-guard.service';
import { FavoriteTwimpsComponent } from './favorite-twimps/favorite-twimps.component';
import { MyTwimpsComponent } from './my-twimps/my-twimps.component';

import { ProfileComponent } from './profile.component';

const profileRoutes: Routes = [
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuardService],
      children: [
        {
          path: '',
          redirectTo: '/profile/my-twimps',
          pathMatch: 'full'
        },
        {
          path: 'my-twimps',
          component: MyTwimpsComponent
        },
        {
          path: 'favorite-twimps',
          component: FavoriteTwimpsComponent
        },
      ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(profileRoutes)
    ]
})
export class ProfileRoutingModule { }
