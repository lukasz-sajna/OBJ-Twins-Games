/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { MaterialModule } from '../shared/material.module';

describe('Service: Toast', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
      imports: [MaterialModule]
    });
  });

  it('should ...', inject([ToastService], (service: ToastService) => {
    expect(service).toBeTruthy();
  }));
});
