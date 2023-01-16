import { TestBed } from '@angular/core/testing';

import { TwimpService } from './twimp.service';

describe('TwimpService', () => {
  let service: TwimpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwimpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
