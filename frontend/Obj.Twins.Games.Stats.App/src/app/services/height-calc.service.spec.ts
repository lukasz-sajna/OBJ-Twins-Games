/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeightCalcService } from './height-calc.service';

describe('Service: HeightCalc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeightCalcService]
    });
  });

  it('should ...', inject([HeightCalcService], (service: HeightCalcService) => {
    expect(service).toBeTruthy();
  }));
});
