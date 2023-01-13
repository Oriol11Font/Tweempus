import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTwimpsComponent } from './favorite-twimps.component';

describe('FavoriteTwimpsComponent', () => {
  let component: FavoriteTwimpsComponent;
  let fixture: ComponentFixture<FavoriteTwimpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteTwimpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteTwimpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
