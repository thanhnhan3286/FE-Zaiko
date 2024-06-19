import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeachApiComponent } from '@common/components/dialog-seach-api/dialog-search-api.component';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { DialogConfig } from '@core/config/dialog.config';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {
  CommonSettingResponse,
  CourseResponse,
  LocationResponse,
  OutputModel,
  PlanOutputDetailListModel,
  ProductInfoModel,
  RouteResponse,
} from 'src/app/pages/output/model/output-list';
import { RepositoryResponse } from 'src/app/pages/output/model/repositoryDto';
import { OutputListService } from 'src/app/pages/output/service/output-list.service';
import { RepositoryService } from 'src/app/pages/output/service/repository.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnChanges {
  @Input()
  planOutputDetailList: PlanOutputDetailListModel[] = [];
  detailForm: FormGroup = new FormGroup({});

  @Input()
  dataResult!: OutputModel;
  repositoryList!: RepositoryResponse;
  routeList!: RouteResponse;
  courseList!: CourseResponse;
  commonSettingList!: CommonSettingResponse;
  buttonState = this.dataResult ? this.dataResult.isClosed : false;
  leadTime: number = 0;
  productInfo!: ProductInfoModel;

  public util = Utils;
  currentDate: string = '';

  constructor(
    private fb: FormBuilder,
    private repositoryService: RepositoryService,
    private outputService: OutputListService,
    private dialogConfirmService: DialogConfirmService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataResult) {
      this.getValueForOutput();
    }
    if (this.planOutputDetailList) {
      this.getValueForDetail();
    }
  }

  ngOnInit(): void {
    this.getCurrentDate();
    this.detailForm = this.initialForm();
    this.detailForm
      .get('outputPlan.planOutputDate')
      ?.valueChanges.subscribe((value) => {
        this.updateWorkingAndDeliverDate(value);
      });

    this.detailForm
      .get('outputPlan.createSlipType')
      ?.valueChanges.subscribe((value) => {
        if (value === '0') {
          this.detailForm.get('outputPlan.slipNo')?.disable();
        } else {
          this.detailForm.get('outputPlan.slipNo')?.enable();
        }
      });

    this.detailForm
      .get('outputPlan.destinationOption')
      ?.valueChanges.subscribe((value) => {
        if (!value) {
          this.detailForm.get('outputPlan.departmentName')?.disable();
          this.detailForm.get('outputPlan.customerName')?.disable();
          this.detailForm.get('outputPlan.phoneNumber')?.disable();
          this.detailForm.get('outputPlan.faxNumber')?.disable();
          this.detailForm.get('outputPlan.postCode')?.disable();
          this.detailForm.get('outputPlan.address1')?.disable();
          this.detailForm.get('outputPlan.address2')?.disable();
          this.detailForm.get('outputPlan.address3')?.disable();
          this.detailForm.get('outputPlan.address4')?.disable();
        } else {
          this.detailForm.get('outputPlan.departmentName')?.enable();
          this.detailForm.get('outputPlan.customerName')?.enable();
          this.detailForm.get('outputPlan.phoneNumber')?.enable();
          this.detailForm.get('outputPlan.faxNumber')?.enable();
          this.detailForm.get('outputPlan.postCode')?.enable();
          this.detailForm.get('outputPlan.address1')?.enable();
          this.detailForm.get('outputPlan.address2')?.enable();
          this.detailForm.get('outputPlan.address3')?.enable();
          this.detailForm.get('outputPlan.address4')?.enable();
        }
      });
    this.detailForm
      .get('outputPlan.destinationCode')
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.checkDestinationCode();
      });

    this.getAllRepository();
    this.getAllRoute();
    this.getAllCourse();

    this.getAllCommonSetting();
    this.detailForm
      .get('outputPlan.repositoryId')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.detailList.controls.forEach((control, index) => {
            control.patchValue({ repositoryId: value });
            this.getLocationByRepo(value, index);
          });
        }
      });
  }

  updateWorkingAndDeliverDate(value: any) {
    const planOutputDateObj = new Date(value);
    const planWorkingDateObj = value;
    if (value !== null) {
      const planDeliverDateObj = new Date(
        planOutputDateObj.getTime() + this.leadTime * 24 * 60 * 60 * 1000
      );

      this.detailForm
        .get('outputPlan.planDeliverDate')
        ?.setValue(planDeliverDateObj.toISOString().slice(0, 10));
    }

    this.detailForm
      .get('outputPlan.planWorkingDate')
      ?.setValue(planWorkingDateObj);
  }

  onSubmit() {
    const formValue = this.detailForm.getRawValue();
    if (formValue.outputPlan.orderDate) {
      formValue.outputPlan.orderDate = formValue.outputPlan.orderDate.replace(
        /-/g,
        '/'
      );
    }
    if (formValue.outputPlan.planOutputDate) {
      formValue.outputPlan.planOutputDate =
        formValue.outputPlan.planOutputDate.replace(/-/g, '/');
    }
    if (formValue.outputPlan.planWorkingDate) {
      formValue.outputPlan.planWorkingDate =
        formValue.outputPlan.planWorkingDate.replace(/-/g, '/');
    }
    if (formValue.outputPlan.planDeliverDate) {
      formValue.outputPlan.planDeliverDate =
        formValue.outputPlan.planDeliverDate.replace(/-/g, '/');
    }

    for (let index = 0; index < formValue.detailList.length; index++) {
      if (formValue.detailList[index].datetimeMngFrom) {
        formValue.detailList[index].datetimeMngFrom = formValue.detailList[
          index
        ].datetimeMngFrom.replace(/-/g, '/');
      }
      if (formValue.detailList[index].datetimeMngTo) {
        formValue.detailList[index].datetimeMngTo = formValue.detailList[
          index
        ].datetimeMngTo.replace(/-/g, '/');
      }
    }

    this.outputService.saveOutputPlan(formValue).subscribe((res: any) => {
      console.log(res);
    });
    console.log(formValue);
  }

  initialForm(): FormGroup {
    return this.fb.group({
      outputPlan: this.createOutputForm(),
      detailList: this.createDetailForm(),
    });
  }

  createOutputForm(): FormGroup {
    const output = this.fb.group({
      orderDate: new FormControl(
        this.dataResult ? this.dataResult.orderDate : this.currentDate,
        [Validators.required]
      ),
      planOutputDate: new FormControl(
        this.dataResult ? this.dataResult.planOutputDate : null,
        [Validators.required]
      ),
      planWorkingDate: new FormControl(
        this.dataResult ? this.dataResult.planWorkingDate : null,
        [Validators.required]
      ),
      planDeliverDate: new FormControl(
        this.dataResult ? this.dataResult.planDeliverDate : null,
        [Validators.required]
      ),
      createSlipType: new FormControl(
        this.dataResult ? this.dataResult.createSlipType : '0'
      ),
      slipNo: new FormControl(this.dataResult ? this.dataResult.slipNo : null, [
        Validators.required,
        Validators.maxLength(20),
        this.util.checkNumberic,
      ]),
      planSupplierSlipNo: new FormControl(
        this.dataResult ? this.dataResult.planSupplierSlipNo : null,
        [Validators.maxLength(20)]
      ),
      destinationOption: new FormControl(false),
      destinationCode: new FormControl(
        this.dataResult ? this.dataResult.destinationCode : null,
        [Validators.required, Validators.maxLength(6), this.util.checkNumberic]
      ),
      departmentName: new FormControl(
        this.dataResult ? this.dataResult.departmentName : null,
        [Validators.required]
      ),
      customerCode: new FormControl(
        this.dataResult ? this.dataResult.customerCode : null
      ),
      customerName: new FormControl(
        this.dataResult ? this.dataResult.customerName : null,
        [Validators.required]
      ),
      slipNote: new FormControl(
        this.dataResult ? this.dataResult.slipNote : null,
        [Validators.maxLength(50)]
      ),
      repositoryId: new FormControl(
        this.dataResult ? this.dataResult.repositoryId : null,
        [Validators.required]
      ),
      routeCode: new FormControl(
        this.dataResult ? this.dataResult.routeCode : null
      ),
      courseCode: new FormControl(
        this.dataResult ? this.dataResult.courseCode : null
      ),
      phoneNumber: new FormControl(
        this.dataResult ? this.dataResult.phoneNumber : null,
        [
          Validators.required,
          Validators.maxLength(15),
          this.util.validateFaxPhonePostCode,
        ]
      ),
      faxNumber: new FormControl(
        this.dataResult ? this.dataResult.faxNumber : null,
        [Validators.maxLength(15), this.util.validateFaxPhonePostCode]
      ),
      postCode: new FormControl(
        this.dataResult ? this.dataResult.postCode : null,
        [
          Validators.required,
          Validators.maxLength(8),
          this.util.validateFaxPhonePostCode,
        ]
      ),
      address1: new FormControl(
        this.dataResult ? this.dataResult.address1 : null,
        [Validators.required]
      ),
      address2: new FormControl(
        this.dataResult ? this.dataResult.address2 : null
      ),
      address3: new FormControl(
        this.dataResult ? this.dataResult.address3 : null
      ),
      address4: new FormControl(
        this.dataResult ? this.dataResult.address4 : null
      ),
    });
    output.get('departmentName')?.disable();
    output.get('slipNo')?.disable();
    output.get('customerCode')?.disable();
    output.get('customerName')?.disable();
    output.get('postCode')?.disable();
    output.get('phoneNumber')?.disable();
    output.get('faxNumber')?.disable();
    output.get('address1')?.disable();
    output.get('address2')?.disable();
    output.get('address3')?.disable();
    output.get('address4')?.disable();
    return output;
  }

  createDetailForm(): FormArray {
    const detail = this.fb.array([this.createDetailList()]);
    return detail;
  }

  createDetailList(): FormGroup {
    const detail = this.fb.group({
      batchNo: new FormControl(null),
      productCode: new FormControl(null, [Validators.required]),
      productName: new FormControl(null),
      standardInfo: '',
      datetimeMngType: '',
      datetimeMngFrom: new FormControl(null, [
        this.util.checkFromDate('datetimeMngTo'),
      ]),
      datetimeMngTo: new FormControl(null, [
        this.util.checkToDate('datetimeMngFrom'),
      ]),
      numberMngFrom: new FormControl(null),
      numberMngTo: new FormControl(null),
      customerCode: new FormControl(null),
      customerName: new FormControl(null),
      departmentName: new FormControl(null),
      repositoryId: new FormControl(null, [Validators.required]),

      locationId: new FormControl(null),
      locations: ([] = []),

      inventoryProductType: new FormControl(0, [Validators.required]),
      billingPackType: new FormControl(null, [Validators.required]),
      packCsAmount: 0,
      packBlAmount: 0,
      csPlanQuantity: new FormControl(null, this.util.checkNumberic),
      blPlanQuantity: new FormControl(null, this.util.checkNumberic),
      psPlanQuantity: new FormControl(null, this.util.checkNumberic),
      totalPlanQuantity: new FormControl(0),
      totalActualQuantity: new FormControl(0),
    });

    detail.get('totalPlanQuantity')?.disable();
    detail.get('totalActualQuantity')?.disable();
    detail.get('productName')?.disable();
    detail.get('customerName')?.disable();
    detail.get('departmentName')?.disable();
    detail.get('datetimeMngFrom')?.disable();
    detail.get('datetimeMngTo')?.disable();
    detail.get('numberMngFrom')?.disable();
    detail.get('numberMngTo')?.disable();

    return detail;
  }

  addDetail(): void {
    this.detailList.push(this.createDetailList());
  }

  deleteDetail(index: number) {
    const mess: string = 'Would you like to delete this plan output detail ?';
    const type: 'delete' = 'delete';
    const dialogRef = this.dialogConfirmService.confirmDialog(mess, type);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeDetail(index);
      }
    });
  }

  removeDetail(index: number): void {
    this.detailList.removeAt(index);
    if (this.detailList.length === 0) {
      this.addDetail();
    }
    if (this.planOutputDetailList) {
    }
  }

  openSearchDialog(fieldName: string = '', index: number) {
    let resultField: string = '';
    let dataModel = DialogConfig.destination;
    switch (fieldName) {
      case 'customerCode':
        dataModel = DialogConfig.customer;
        break;
      case 'destinationCode':
        dataModel = DialogConfig.destination;
        break;
      case 'productCode':
        dataModel = DialogConfig.product;
        break;
      case 'inventoryProduct':
        dataModel = DialogConfig.inventoryProduct;
        dataModel.listParam[0] = {
          key: 'repositoryId',
          value: this.detailList.at(index).get('repositoryId')?.value,
        };
        dataModel.listParam[1] = {
          key: 'productCode',
          value: this.detailList.at(index).get('productCode')?.value,
        };
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
        if (index === -1) {
          this.detailForm
            .get('outputPlan')
            ?.get(fieldName)
            ?.patchValue(result[resultField]);
        } else {
          this.detailList
            .at(index)
            .get(fieldName)
            ?.patchValue(result[resultField]);
          if (fieldName === 'customerCode') {
            this.detailList
              .at(index)
              .get('customerName')
              ?.setValue(result['customerName']);
          }
          if (fieldName === 'productCode') {
            this.updateProductInfo(index);
          }

          if (fieldName === 'inventoryProduct') {
            this.autoFillPlanDetail(result, index);
          }
        }
      }
    });
  }
  autoFillPlanDetail(result: any, index: number) {
    this.detailList
      .at(index)
      .get('customerCode')
      ?.setValue(result.customerCode);
    this.detailList
      .at(index)
      .get('customerName')
      ?.setValue(result.customerName);
    this.detailList.at(index).get('locationId')?.setValue(result.locationId);
    if (result.datetimeMngTo) {
      const datetimeMngTo = result.datetimeMngTo.replace(/\//g, '-');

      this.detailList.at(index).get('datetimeMngTo')?.setValue(datetimeMngTo);
    }

    this.detailList.at(index).get('numberMngTo')?.setValue(result.numberMngTo);
    this.detailList
      .at(index)
      .get('inventoryProductType')
      ?.setValue(result.inventoryProductType);
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

  get listCommonSetting(): any {
    if (this.commonSettingList) {
      return this.commonSettingList;
    }
    return [];
  }

  public getAllCommonSetting(): void {
    this.outputService
      .getAllCommonSetting()
      .subscribe((res: CommonSettingResponse | HttpErrorResponse) => {
        if (
          (res as HttpErrorResponse).status &&
          (res as HttpErrorResponse).status !== 200
        ) {
          return;
        } else {
          this.commonSettingList = res as CommonSettingResponse;
        }
      });
  }

  get detailList(): FormArray {
    return this.detailForm.get('detailList') as FormArray;
  }

  getDetailList(): FormArray {
    return this.detailForm.get('detailList') as FormArray;
  }
  getFormGroup(index: number) {
    return this.detailList.at(index) as FormGroup;
  }

  getFormControl(index: number, controlName: string) {
    return this.getFormGroup(index).get(controlName) as FormControl;
  }

  doubleDetailAtIndex(i: number) {
    const formGroupToCopy = this.detailList.at(i) as FormGroup;

    const newFormGroup = this.fb.group({});
    for (const [key, control] of Object.entries(formGroupToCopy.controls)) {
      newFormGroup.addControl(key, this.fb.control(control.value));
    }

    this.detailList.insert(i + 1, newFormGroup);

    newFormGroup.markAsDirty();
    newFormGroup.updateValueAndValidity();

    this.cdr.detectChanges();
  }

  toggleState() {
    this.buttonState = !this.buttonState;
    this.updateFormState();
  }

  updateFormState() {
    if (this.buttonState) {
      this.detailForm.disable();
      this.detailForm.reset();
    } else {
      this.detailForm.enable();
    }
  }

  getCurrentDate() {
    const presentDate = new Date().toISOString();
    const dateString = presentDate.split('T')[0];
    this.currentDate = dateString;
  }

  checkSlipNoExist() {
    let slipNo = this.detailForm.get('outputPlan.slipNo')?.value;
    if (slipNo) {
      let result = this.outputService
        .checkSlipNoExist(slipNo)
        .subscribe((res) => {
          if (res) {
            this.detailForm
              .get('outputPlan.slipNo')
              ?.setErrors({ duplicateSlipNo: true });
          }
        });
    }
  }

  checkDestinationCode() {
    let destinationCode = this.detailForm.get(
      'outputPlan.destinationCode'
    )?.value;

    if (destinationCode === null || destinationCode.toString().trim() === '') {
      this.detailForm
        .get('outputPlan.destinationCode')
        ?.setErrors({ required: true });
    } else {
      this.outputService
        .getCustomerInfo(destinationCode)
        .subscribe((res: any) => {
          if (res) {
            console.log(res);

            this.leadTime = res.leadTime;

            this.detailForm
              .get('outputPlan.departmentName')
              ?.setValue(res.departmentName);
            this.detailForm
              .get('outputPlan.customerCode')
              ?.setValue(res.customerCode);
            this.detailForm
              .get('outputPlan.customerName')
              ?.setValue(res.customerName);
            this.updateWorkingAndDeliverDate(
              this.detailForm.get('outputPlan.planOutputDate')?.value
            );
            this.detailList.controls.forEach((control) =>
              control.patchValue({
                customerCode: res.customerCode,
                customerName: res.customerName,
              })
            );

            this.detailForm
              .get('outputPlan.routeCode')
              ?.setValue(res.routeCode);
            this.detailForm
              .get('outputPlan.courseCode')
              ?.setValue(res.courseCode);
            this.detailForm
              .get('outputPlan.phoneNumber')
              ?.setValue(res.phoneNumber);
            this.detailForm
              .get('outputPlan.faxNumber')
              ?.setValue(res.faxNumber);
            this.detailForm.get('outputPlan.postCode')?.setValue(res.postCode);
            this.detailForm.get('outputPlan.address1')?.setValue(res.address1);
            this.detailForm.get('outputPlan.address2')?.setValue(res.address2);
            this.detailForm.get('outputPlan.address3')?.setValue(res.address3);
            this.detailForm.get('outputPlan.address4')?.setValue(res.address4);
            this.detailForm.get('outputPlan.departmentName')?.disable();
            this.detailForm.get('outputPlan.postCode')?.disable();
            this.detailForm.get('outputPlan.phoneNumber')?.disable();
            this.detailForm.get('outputPlan.address1')?.disable();
            this.detailForm.get('outputPlan.address2')?.disable();
            this.detailForm.get('outputPlan.address3')?.disable();
            this.detailForm.get('outputPlan.address4')?.disable();
          } else {
            
            this.detailForm.get('outputPlan.departmentName')?.reset();
            this.detailForm.get('outputPlan.customerCode')?.reset();
            this.detailForm.get('outputPlan.customerName')?.reset();
            this.detailForm.get('outputPlan.routeCode')?.reset();
            this.detailForm.get('outputPlan.courseCode')?.reset();
            this.detailForm.get('outputPlan.phoneNumber')?.reset();
            this.detailForm.get('outputPlan.faxNumber')?.reset();
            this.detailForm.get('outputPlan.postCode')?.reset();
            this.detailForm.get('outputPlan.address1')?.reset();
            this.detailForm.get('outputPlan.address2')?.reset();
            this.detailForm.get('outputPlan.address3')?.reset();
            this.detailForm.get('outputPlan.address4')?.reset();
            if (this.detailForm.get('outputPlan.destinationOption')?.value) {
              this.detailForm.get('outputPlan.departmentName')?.enable();
              this.detailForm.get('outputPlan.customerName')?.enable();
              this.detailForm.get('outputPlan.phoneNumber')?.enable();
              this.detailForm.get('outputPlan.faxNumber')?.enable();
              this.detailForm.get('outputPlan.postCode')?.enable();
              this.detailForm.get('outputPlan.address1')?.enable();
              this.detailForm.get('outputPlan.address2')?.enable();
              this.detailForm.get('outputPlan.address3')?.enable();
              this.detailForm.get('outputPlan.address4')?.enable();
            }

            this.detailForm
              .get('outputPlan.customerCode')
              ?.setValue(destinationCode);
            this.detailList.controls.forEach((control) =>
              control.patchValue({
                customerCode: destinationCode,
                customerName: this.detailForm.get('outputPlan.customerName')
                  ?.value,
              })
            );
          }
        });
    }
  }

  updateProductInfo(index: number) {
    const detail: FormGroup = (
      this.detailForm.get('detailList') as FormArray
    ).at(index) as FormGroup;
    const code = detail.get('productCode')?.value;
    detail.get('billingPackType')?.reset();
    if (code === null || code.toString().trim() === '') {
      detail.get('productCode')?.setErrors({ required: true });
    } else {
      let result = this.outputService
        .getProductInfo(code)
        .subscribe((res: any) => {
          if (res) {
            if (res.isDatetimeMng === '1') {
              detail.get('datetimeMngFrom')?.enable();
              detail.get('datetimeMngTo')?.enable();
            } else {
              detail.get('datetimeMngFrom')?.disable();
              detail.get('datetimeMngTo')?.disable();
            }

            if (res.isNumberMng === '1') {
              detail.get('numberMngFrom')?.enable();
              detail.get('numberMngTo')?.enable();
            } else {
              detail.get('numberMngFrom')?.disable();
              detail.get('numberMngTo')?.disable();
            }

            detail.get('productName')?.setValue(res.productName);
            detail.get('standardInfo')?.setValue(res.standardInfo);
            detail.get('datetimeMngType')?.setValue(res.datetimeMngType);
            detail.get('packCsAmount')?.setValue(res.packCsAmount);
            detail.get('packBlAmount')?.setValue(res.packBlAmount);
            this.getBillingPackType(
              res.isPackCsOutput,
              res.isPackBlOutput,
              res.isPieceOutput,
              index
            );
          } else {
            detail.get('productName')?.reset();
            detail.get('standardInfo')?.reset();
            detail.get('datetimeMngType')?.reset();

            detail.get('productCode')?.setErrors({ notFound: true });
          }
        });
    }
  }

  public getProductMngType(datetimeMngType: string): string {
    let value = '';

    switch (datetimeMngType) {
      case '0':
        value = '入';
        break;
      case '2':
        value = '製';
        break;

      case '4':
        value = '賞';
        break;
      default:
        break;
    }

    return value;
  }
  public getBillingPackType(
    isPackCsOutput: string,
    isPackBlOutput: string,
    isPieceOutput: string,
    index: number
  ) {
    const detail = this.detailList.at(index) as FormGroup;
    if (this.dataResult === null || this.dataResult === undefined) {
      detail.get('blPlanQuantity')?.reset();
      detail.get('csPlanQuantity')?.reset();
      detail.get('psPlanQuantity')?.reset();
      detail.get('totalPlanQuantity')?.reset();
    }

    const cs = document.getElementById(`cs_${index}`) as HTMLInputElement;
    const bl = document.getElementById(`bl_${index}`) as HTMLInputElement;
    const ps = document.getElementById(`ps_${index}`) as HTMLInputElement;
    if (isPackCsOutput === '0') {
      cs.disabled = true;
      detail.get('csPlanQuantity')?.disable();
    } else {
      cs.disabled = false;
      detail.get('csPlanQuantity')?.enable();
    }

    if (isPackBlOutput === '0') {
      bl.disabled = true;

      detail.get('blPlanQuantity')?.disable();
    } else {
      bl.disabled = false;

      detail.get('blPlanQuantity')?.enable();
    }

    if (isPieceOutput === '0') {
      ps.disabled = true;
      detail.get('psPlanQuantity')?.disable();
    } else {
      ps.disabled = false;
      detail.get('psPlanQuantity')?.enable();
    }
  }

  updatePackType(billingPackType: string, index: number) {
    switch (billingPackType) {
      case '1':
        this.detailList.at(index).get('csPlanQuantity')?.enable();
        break;
      case '2':
        this.detailList.at(index).get('blPlanQuantity')?.enable();
        if (this.detailList.at(index).get('csPlanQuantity')?.enabled) {
          this.detailList.at(index).get('csPlanQuantity')?.reset();
          this.detailList.at(index).get('csPlanQuantity')?.disable();
          this.detailList.at(index).get('totalPlanQuantity')?.reset();
        }

        break;
      case '3':
        this.detailList.at(index).get('psPlanQuantity')?.enable();
        if (this.detailList.at(index).get('csPlanQuantity')?.enabled) {
          this.detailList.at(index).get('csPlanQuantity')?.reset();
          this.detailList.at(index).get('csPlanQuantity')?.disable();
          this.detailList.at(index).get('totalPlanQuantity')?.reset();
        }
        if (this.detailList.at(index).get('blPlanQuantity')?.enabled) {
          this.detailList.at(index).get('blPlanQuantity')?.reset();
          this.detailList.at(index).get('blPlanQuantity')?.disable();
          this.detailList.at(index).get('totalPlanQuantity')?.reset();
        }
        break;
      default:
        break;
    }
  }

  calculateTotalPlanQuantity(index: number) {
    let detail = this.detailList.at(index) as FormGroup;
    let cs = detail.get('csPlanQuantity')?.value;
    let bl = detail.get('blPlanQuantity')?.value;
    let ps = detail.get('psPlanQuantity')?.value;
    if (!detail.get('csPlanQuantity')?.enabled) {
      cs = 0;
    }

    if (!detail.get('blPlanQuantity')?.enabled) {
      bl = 0;
    }

    if (!detail.get('psPlanQuantity')?.enabled) {
      ps = 0;
    }

    let totalQuantity =
      detail.get('packCsAmount')?.value *
        cs *
        detail.get('packBlAmount')?.value +
      detail.get('packBlAmount')?.value * bl +
      ps;
    detail.get('totalPlanQuantity')?.setValue(totalQuantity);
  }

  getLocationByRepo($event: any, index: number) {
    let repositoryId;

    if (!isNaN($event)) {
      repositoryId = $event;
    } else {
      repositoryId = $event.target.value;
    }

    this.outputService
      .getLocationByRepo(repositoryId)
      .subscribe((res: LocationResponse | HttpErrorResponse) => {
        if (
          (res as HttpErrorResponse).status &&
          (res as HttpErrorResponse).status !== 200
        ) {
          return;
        } else {
          this.detailList.at(index).get('locations')?.setValue(res);
        }
      });
  }

  getCustomerDestAddress($event: any) {
    const postCode = $event.target.value;

    this.outputService
      .getCustomerDestAddress(postCode)
      .subscribe((res: any) => {
        if (res) {
          this.detailForm.get('outputPlan.address1')?.setValue(res.address1);
          this.detailForm.get('outputPlan.address2')?.setValue(res.address2);
          this.detailForm.get('outputPlan.address3')?.setValue(res.address3);
          this.detailForm.get('outputPlan.address4')?.setValue(res.address4);
        } else {
          this.detailForm.get('outputPlan.address1')?.reset();
          this.detailForm.get('outputPlan.address2')?.reset();
          this.detailForm.get('outputPlan.address3')?.reset();
          this.detailForm.get('outputPlan.address4')?.reset();
        }
      });
  }

  deleteOutputAndDetail() {
    console.log('Zolo');

    const mess: string =
      'Would you like to delete this plan output and all its details ?';
    const type: 'delete' = 'delete';
    const dialogRef = this.dialogConfirmService.confirmDialog(mess, type);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.dataResult) {
        let inventoryOutputId = this.dataResult.inventoryOutputId;
        this.outputService
          .deleteOutputAndDetail(inventoryOutputId)
          .subscribe((res) => {
            console.log(res);
          });
      }
    });
  }

  getValueForOutput() {
    this.detailForm
      .get('outputPlan.orderDate')
      ?.setValue(this.dataResult.orderDate);
    this.detailForm
      .get('outputPlan.planOutputDate')
      ?.setValue(this.dataResult.planOutputDate);
    this.detailForm
      .get('outputPlan.planDeliverDate')
      ?.setValue(this.dataResult.planDeliverDate);
    this.detailForm
      .get('outputPlan.customerName')
      ?.setValue(this.dataResult.planWorkingDate);

    this.detailForm
      .get('outputPlan.createSlipType')
      ?.setValue(this.dataResult.createSlipType);
    this.detailForm
      .get('outputPlan.customerCode')
      ?.setValue(this.dataResult.customerCode);
    this.detailForm
      .get('outputPlan.customerName')
      ?.setValue(this.dataResult.customerName);
    this.detailForm
      .get('outputPlan.departmentName')
      ?.setValue(this.dataResult.departmentName);
    this.detailForm
      .get('outputPlan.destinationCode')
      ?.setValue(this.dataResult.destinationCode);

    this.detailForm
      .get('outputPlan.planSupplierSlipNo')
      ?.setValue(this.dataResult.planSupplierSlipNo);
    this.detailForm
      .get('outputPlan.repositoryId')
      ?.setValue(this.dataResult.repositoryId);
    this.detailForm
      .get('outputPlan.routeCode')
      ?.setValue(this.dataResult.routeCode);
    this.detailForm
      .get('outputPlan.courseCode')
      ?.setValue(this.dataResult.courseCode);
    this.detailForm.get('outputPlan.slipNo')?.setValue(this.dataResult.slipNo);
    this.detailForm
      .get('outputPlan.slipNote')
      ?.setValue(this.dataResult.slipNote);
    this.detailForm
      .get('outputPlan.faxNumber')
      ?.setValue(this.dataResult.faxNumber);
    this.detailForm
      .get('outputPlan.postCode')
      ?.setValue(this.dataResult.postCode);
    this.detailForm
      .get('outputPlan.phoneNumber')
      ?.setValue(this.dataResult.phoneNumber);
    this.detailForm
      .get('outputPlan.address1')
      ?.setValue(this.dataResult.address1);
    this.detailForm
      .get('outputPlan.address2')
      ?.setValue(this.dataResult.address2);
    this.detailForm
      .get('outputPlan.address3')
      ?.setValue(this.dataResult.address3);
    this.detailForm
      .get('outputPlan.address4')
      ?.setValue(this.dataResult.address4);

    this.detailForm
      .get('outputPlan.sumActualQuantity')
      ?.setValue(this.dataResult.sumActualQuantity);
    this.detailForm
      .get('outputPlan.sumPlanQuantity')
      ?.setValue(this.dataResult.sumPlanQuantity);
  }

  getValueForDetail() {
    this.planOutputDetailList.forEach(
      (item: PlanOutputDetailListModel, index: number) => {
        this.detailList.at(index).get('batchNo')?.setValue(item.batchNo);
        this.detailList
          .at(index)
          .get('productCode')
          ?.setValue(item.productCode);
        this.updateProductInfo(index);
        this.detailList
          .at(index)
          .get('productName')
          ?.setValue(item.productName);
        this.detailList
          .at(index)
          .get('standardInfo')
          ?.setValue(item.standardInfo);
        this.detailList
          .at(index)
          .get('datetimeMngFrom')
          ?.setValue(item.datetimeMngFrom);
        this.detailList
          .at(index)
          .get('datetimeMngTo')
          ?.setValue(item.datetimeMngTo);
        this.detailList
          .at(index)
          .get('numberMngFrom')
          ?.setValue(item.numberMngFrom);
        this.detailList
          .at(index)
          .get('numberMngTo')
          ?.setValue(item.numberMngTo);
        this.detailList
          .at(index)
          .get('customerCode')
          ?.setValue(item.customerCode);
        this.detailList
          .at(index)
          .get('customerName')
          ?.setValue(item.customerName);
        this.detailList
          .at(index)
          .get('departmentName')
          ?.setValue(item.departmentName);
        this.detailList
          .at(index)
          .get('repositoryId')
          ?.setValue(item.repositoryId);

        this.detailForm
          .get('outputPlan.repositoryId')
          ?.valueChanges.subscribe((value) => {
            if (value) {
              this.detailList.controls.forEach((control, index) => {
                control.patchValue({ repositoryId: value });
              });
            }
          });
        this.getLocationByRepo(item.repositoryId, index);
        this.detailList.at(index).get('locationId')?.setValue(item.locationId);

        this.detailList
          .at(index)
          .get('inventoryProductType')
          ?.setValue(item.inventoryProductType);
        this.detailList
          .at(index)
          .get('billingPackType')
          ?.setValue(item.billingPackType);
        this.detailList
          .at(index)
          .get('csPlanQuantity')
          ?.setValue(item.csPlanQuantity);
        this.detailList
          .at(index)
          .get('blPlanQuantity')
          ?.setValue(item.blPlanQuantity);
        this.detailList
          .at(index)
          .get('psPlanQuantity')
          ?.setValue(item.psPlanQuantity);
        this.detailList
          .at(index)
          .get('totalPlanQuantity')
          ?.setValue(item.totalPlanQuantity);
        this.detailList
          .at(index)
          .get('planAmountTotal')
          ?.setValue(item.planAmountTotal);

        if (index < this.planOutputDetailList.length - 1) {
          this.addDetail();
        }
      }
    );
  }
}
