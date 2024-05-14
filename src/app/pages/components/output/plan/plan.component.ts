import { Component, OnInit } from '@angular/core';
import { OutputPlanService } from 'src/app/pages/services/output-plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  constructor(private outputPlanService :OutputPlanService) { }

  ngOnInit() {
    const id = this.outputPlanService.getPlanId();
    if (id !== null) {
      console.log(`Plan ID: ${id}`);
    } else {
      console.log("No Plan ID found");
    }
  }

}
