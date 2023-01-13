import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTwimpsComponent } from './my-twimps.component';

describe('MyTwimpsComponent', () => {
  let component: MyTwimpsComponent;
  let fixture: ComponentFixture<MyTwimpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTwimpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTwimpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
