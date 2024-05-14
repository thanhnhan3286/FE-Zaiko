/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OutputPlanService } from './output-plan.service';

describe('Service: OutputPlan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutputPlanService]
    });
  });

  it('should ...', inject([OutputPlanService], (service: OutputPlanService) => {
    expect(service).toBeTruthy();
  }));
});
