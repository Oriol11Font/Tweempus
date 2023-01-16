import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [HeaderComponent, NavComponent],
  providers: [AuthGuardService, AuthenticationService],
  exports: [HeaderComponent, NavComponent]
})
export class CoreModule { }
