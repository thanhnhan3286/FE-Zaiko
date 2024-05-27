import { OutputListService } from './../../../../service/output-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  CourseResponse,
  OutputModel,
  RouteResponse,
} from './../../../../model/output-list';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeachApiComponent } from '@common/components/dialog-seach-api/dialog-search-api.component';
import { DialogConfig } from '@core/config/dialog.config';
import {
  RepositoryModel,
  RepositoryResponse,
} from 'src/app/pages/output/model/repositoryDto';
import { RepositoryService } from 'src/app/pages/output/service/repository.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit, OnChanges {
  generalForm = new FormGroup({});
  @Input()
  dataResult!: OutputModel;
  repositoryList!: RepositoryResponse;
  routeList!: RouteResponse;
  courseList!: CourseResponse;
  constructor(
    private repositoryService: RepositoryService,
    private outputService: OutputListService,
    private dialog: MatDialog
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['dataResult'] && this.dataResult) {
      this.generalForm = this.initialForm();
    }
  }

  ngOnInit(): void {
    this.generalForm = this.initialForm();
    this.getAllRepository();
    this.getAllRoute();
    this.getAllCourse();
  }

  onSubmit() {
    const formValue = this.generalForm.value;
  }

  initialForm(): FormGroup {
    const orderDate = this.dataResult?.orderDate;
    const planOutputDate = this.dataResult?.planOutputDate;
    const planWorkingDate = this.dataResult?.planWorkingDate;
    const planDeliverDate = this.dataResult?.planDeliverDate;
    const slipNo = this.dataResult?.slipNo;
    const planSupplierSlipNo = this.dataResult?.planSupplierSlipNo;
    const destinationCode = this.dataResult?.destinationCode;
    const departmentName = this.dataResult?.departmentName;
    const customerCode = this.dataResult?.customerCode;
    const customerName = this.dataResult?.customerName;
    const slipNote = this.dataResult?.slipNote;
    const routeCode = this.dataResult?.routeCode;
    const courseCode = this.dataResult?.courseCode;
    const phoneNumber = this.dataResult?.phoneNumber;
    const faxNumber = this.dataResult?.faxNumber;
    const postCode = this.dataResult?.postCode;
    const address1 = this.dataResult?.address1;
    const address2 = this.dataResult?.address2;
    const address3 = this.dataResult?.address3;
    const address4 = this.dataResult?.address4;
    const createSlipType = this.dataResult?.createSlipType;
    const repositoryId = this.dataResult?.repositoryId;
    return new FormGroup({
      orderDate: new FormControl(orderDate),
      planOutputDate: new FormControl(planOutputDate),
      planWorkingDate: new FormControl(planWorkingDate),
      planDeliverDate: new FormControl(planDeliverDate),
      createSlipType: new FormControl(createSlipType),
      slipNo: new FormControl(slipNo),
      planSupplierSlipNo: new FormControl(planSupplierSlipNo),
      destinationOption: new FormControl(''),
      destinationCode: new FormControl(destinationCode),
      departmentName: new FormControl(departmentName),
      customerCode: new FormControl(customerCode),
      customerName: new FormControl(customerName),
      slipNote: new FormControl(slipNote),
      repositoryId: new FormControl(repositoryId),
      routeCode: new FormControl(routeCode),
      courseCode: new FormControl(courseCode),
      phoneNumber: new FormControl(phoneNumber),
      faxNumber: new FormControl(faxNumber),
      postCode: new FormControl(postCode),
      address1: new FormControl(address1),
      address2: new FormControl(address2),
      address3: new FormControl(address3),
      address4: new FormControl(address4),
    });
  }

  openSearchDialog(fieldName: string = '') {
    let resultField: string = '';
    let dataModel = DialogConfig.destination;
    switch (fieldName) {
      case 'customerCode':
        dataModel = DialogConfig.customer;

        break;
      case 'destinationCode':
        dataModel = DialogConfig.destination;

        break;
      default:
        break;
    }
    resultField = dataModel!.listHeader[0].nameColum;

    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: dataModel,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.generalForm.get(fieldName)?.patchValue(result[resultField]);
      }
    });
  }

  get listRepository(): any {
    if (this.repositoryList) {
      return this.repositoryList;
    }
    return [];
  }
  public getAllRepository(): void {
    this.repositoryService
      .getAllRepository()
      .subscribe((res: RepositoryResponse | HttpErrorResponse) => {
        if (
          (res as HttpErrorResponse).status &&
          (res as HttpErrorResponse).status !== 200
        ) {
          return;
        } else {
          this.repositoryList = res as RepositoryResponse;
        }
      });
  }

  get listRoute(): any {
    if (this.routeList) {
      return this.routeList;
    }
    return [];
  }
  public getAllRoute(): void {
    this.outputService
      .getAllRoute()
      .subscribe((res: RouteResponse | HttpErrorResponse) => {
        if (
          (res as HttpErrorResponse).status &&
          (res as HttpErrorResponse).status !== 200
        ) {
          return;
        } else {
          this.routeList = res as RouteResponse;
        }
      });
  }

  get listCourse(): any {
    if (this.courseList) {
      return this.courseList;
    }
    return [];
  }
  public getAllCourse(): void {
    this.outputService
      .getAllCourse()
      .subscribe((res: CourseResponse | HttpErrorResponse) => {
        if (
          (res as HttpErrorResponse).status &&
          (res as HttpErrorResponse).status !== 200
        ) {
          return;
        } else {
          this.courseList = res as CourseResponse;
        }
      });
  }
}
