import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutputPlanService {

constructor() { }

  private planId: number | null = null;
  setPlanId(id: number) {
    this.planId = id;
  }
  getPlanId(): number | null {
    return this.planId;
  }


}
