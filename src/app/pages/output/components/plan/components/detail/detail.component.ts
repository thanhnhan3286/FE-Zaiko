import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forIn } from 'lodash';
import { PlanOutputDetailListModel } from 'src/app/pages/output/model/output-list';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnChanges {
  @Input()
  planOutputDetailList: PlanOutputDetailListModel[] = [];
  detailForm!: FormArray<any>;

  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes['planOutputDetailList'] &&
      this.planOutputDetailList
    ) {
      this.detailForm = this.initialForm();
      console.log(this.detailForm);
    }
  }

  ngOnInit(): void {
    this.detailForm = this.initialForm();
  }

  initialForm(): FormArray {
    const formArray = new FormArray<any>([]);

    if (this.planOutputDetailList) {
      this.planOutputDetailList.forEach((detail) => {
        const group = this.fb.group({
          inventoryOutputId: new FormControl(detail.inventoryOutputId),
          planDetailId: new FormControl(detail.planDetailId),
          batchStatus: new FormControl(detail.batchStatus),
          batchNo: new FormControl(detail.batchNo),
          productId: new FormControl(detail.productId),
          productCode: new FormControl(detail.productCode),
          standardInfo: new FormControl(detail.standardInfo),
          datetimeMngFrom: new FormControl(detail.datetimeMngFrom),
          datetimeMngTo: new FormControl(detail.datetimeMngTo),
          numberMngFrom: new FormControl(detail.numberMngFrom),
          numberMngTo: new FormControl(detail.numberMngTo),
          customerCode: new FormControl(detail.customerCode),
          customerName: new FormControl(detail.customerName),
          departmentName: new FormControl(detail.departmentName),
          repositoryId: new FormControl(detail.repositoryId),
          repositoryCode: new FormControl(detail.repositoryCode),
          repositoryName: new FormControl(detail.repositoryName),
          locationId: new FormControl(detail.locationId),
          locationCode: new FormControl(detail.locationCode),
          locationName: new FormControl(detail.locationName),
          inventoryProductType: new FormControl(detail.inventoryProductType),
          billingPackType: new FormControl(detail.billingPackType),
          totalPlanQuantity: new FormControl(detail.totalPlanQuantity),
          planAmountTotal: new FormControl(detail.planAmountTotal),
        });

        // Set initial values for each control in the FormGroup
        group.patchValue(detail);

        formArray.push(group);
      });
    }

    return formArray;
  }
  // return new FormArray([
  //   new FormGroup({
  //     inventoryOutputId: new FormControl(null),
  //     planDetailId: new FormControl(null),
  //     batchStatus: new FormControl(null),
  //     productId: new FormControl(null),
  //     productCode: new FormControl(null),
  //     standardInfo: new FormControl(null),
  //     datetimeMngFrom: new FormControl(null),
  //     datetimeMngTo: new FormControl(null),
  //     numberMngFrom: new FormControl(null),
  //     numberMngTo: new FormControl(null),
  //     customerCode: new FormControl(null),
  //     customerName: new FormControl(null),
  //     departmentName: new FormControl(null),
  //     repositoryId: new FormControl(null),
  //     repositoryCode: new FormControl(null),
  //     repositoryName: new FormControl(null),
  //     locationId: new FormControl(null),
  //     locationCode: new FormControl(null),
  //     locationName: new FormControl(null),
  //     inventoryProductType: new FormControl(null),
  //     billingPackType: new FormControl(null),
  //     totalPlanQuantity: new FormControl(null),
  //     planAmountTotal: new FormControl(null),
  //   })
  // ]);
}
