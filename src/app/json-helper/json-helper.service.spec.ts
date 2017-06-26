import { TestBed, inject } from '@angular/core/testing';

import { JsonHelperService } from './json-helper.service';

describe('JsonHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonHelperService]
    });
  });

  it('should be created', inject([JsonHelperService], (service: JsonHelperService) => {
    expect(service).toBeTruthy();
  }));
});
