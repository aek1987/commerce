import { TestBed } from '@angular/core/testing';

import { AlerteServiceService } from './alerte-service.service';

describe('AlerteServiceService', () => {
  let service: AlerteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlerteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
