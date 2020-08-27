/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MapBackgroundService } from './map-background.service';

describe('Service: MapBackground', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapBackgroundService]
    });
  });

  it('should ...', inject([MapBackgroundService], (service: MapBackgroundService) => {
    expect(service).toBeTruthy();
  }));
});
