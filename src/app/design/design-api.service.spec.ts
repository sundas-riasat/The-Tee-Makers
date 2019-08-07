import { TestBed } from '@angular/core/testing';

import { DesignApiService } from './design-api.service';

describe('DesignApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignApiService = TestBed.get(DesignApiService);
    expect(service).toBeTruthy();
  });
});
