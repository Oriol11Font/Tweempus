import { Component, Input } from '@angular/core';

import { Twimp } from '../twimp.model';
import { TwimpService } from '../twimp.service';

@Component({
  selector: 'tweempus-twimp-card',
  templateUrl: './twimp-card.component.html',
  styleUrls: ['./twimp-card.component.css']
})
export class TwimpCardComponent {
  @Input() twimp!: Twimp;

  constructor(private twimpService: TwimpService) { }

  favoriteTwimps() {
    this.twimpService.intervalFavorite('1').subscribe(favorites => {
      this.twimpService.updateFavoritesTwimps(favorites, this.twimp.id, '1');
    })
  }
}
