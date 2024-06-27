import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlanOutputDetail } from '../../model/plan-output-detail.model';
import { Utils } from '@common/utils/utils';
import { OutputDetail } from 'src/app/pages/common/models/output-detail.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() planOutput!: OutputDetail;
  @Input() pagePlanOutputDetail: PlanOutputDetail[] = [];
  @Input() outputStatus!: string;
  @Input() isClose!: string;

  public utils = Utils;
  public listPlanOutputDetail: PlanOutputDetail[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planOutput'] && changes['planOutput'].currentValue) {
    }
    if (changes['pagePlanOutputDetail'] && changes['pagePlanOutputDetail'].currentValue) {
      console.log(this.pagePlanOutputDetail);
      this.listPlanOutputDetail = this.pagePlanOutputDetail;
    }
    if (changes['outputStatus'] && changes['outputStatus'].currentValue) {
      console.log(this.outputStatus);
    }
    if (changes['isClose'] && changes['isClose'].currentValue) {
    }
  }
}
