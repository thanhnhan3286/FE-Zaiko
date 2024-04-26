/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OutputListService } from './output-list.service';

describe('Service: OutputList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutputListService]
    });
  });

  it('should ...', inject([OutputListService], (service: OutputListService) => {
    expect(service).toBeTruthy();
  }));
});
