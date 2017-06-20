import { TestBed, inject } from '@angular/core/testing';

import { JsonProviderService } from './json-provider.service';

describe('JsonProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonProviderService]
    });
  });

  it('should be created', inject([JsonProviderService], (service: JsonProviderService) => {
    expect(service).toBeTruthy();
  }));
});
