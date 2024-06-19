import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogSeachApiComponent } from '@common/components/dialog-seach-api/dialog-search-api.component';
import { DialogOptionApi } from '@common/models/dialog-seach-api/dialog-search-api.model';
import { Utils } from '@common/utils/utils';
import { dialogOptions, fieldMappings } from '@core/config/dialog-config';
import { LoadingSpinnerDialogService } from '@layout/services';
import { forkJoin } from 'rxjs';
import { RepositoryModel } from 'src/app/pages/models/output/list.model';
import { CourseModel, CustomerDeliveryDestModel, CustomerModel, LocationModel, ProductModel, RouteModel, inventoryOutputPlanModel, inventoryPlanData, inventoryPlanOutputDetailModel } from 'src/app/pages/models/output/plan.model';
import { NotificationServiceService } from 'src/app/pages/services/notification-service.service';
import { OutputPlanService } from 'src/app/pages/services/output-plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  public initialPlanData!: inventoryOutputPlanModel;
  public initiaPlanDetailData: inventoryPlanOutputDetailModel[] = [];
  public course: CourseModel[] = [];
  public route: RouteModel[] = [];
  public repository: RepositoryModel[] = [];
  public location: LocationModel[] = [];
  public customer: CustomerModel | null = null;
  public customers: CustomerModel | null = null;
  public customerDest: CustomerDeliveryDestModel | null = null;
  public product: ProductModel | null = null;
  public isCheckBox: Boolean = true;
  public isInitData: Boolean = true;
  public mainForm: FormGroup = new FormGroup({});
  public utils = Utils;


  constructor(private router: Router, private fb: FormBuilder, private outputPlanService: OutputPlanService, private loadingDialog: LoadingSpinnerDialogService, private dialog: MatDialog, private notificationService: NotificationServiceService) { }

  ngOnInit() {
    this.initData();
    this.getCourse();
    this.getRoute();
    this.getRepository();
    this.getLocation();
    this.initialForm();

  }

  private initialForm(): void {
    const initData = this.initialPlanData ? this.initialPlanData : null;
    const initTableData = this.initiaPlanDetailData ? this.initiaPlanDetailData : null;
    console.log(this.initiaPlanDetailData);

    const currentDate = new Date();
    this.mainForm = this.fb.group({
      planForm: this.fb.group({
        inventoryOutputId: new FormControl(initData ? initData.inventoryOutputId : null),
        orderDate: new FormControl({
          value: initData && initData.orderDate ? this.utils.dateFormat(initData.orderDate) : this.utils.formatDate(currentDate.toISOString().split('T')[0]),
          disabled: !!initData
        }),
        planOutputDate: new FormControl(initData && initData.planOutputDate ? this.utils.dateFormat(initData.planOutputDate) : null, [Validators.required]),
        planWorkingDate: new FormControl({
          value: initData && initData.planWorkingDate ? this.utils.dateFormat(initData.planWorkingDate) : null,
          disabled: false
        }),
        planDeliverDate: new FormControl({
          value: initData && initData.planDeliverDate ? this.utils.dateFormat(initData.planDeliverDate) : null,
          disabled: false
        }, [Validators.required]),
        createSlipType: new FormControl(initData ? initData.createSlipType : '0'),
        slipNo: new FormControl(
          { value: initData ? initData.slipNo : null, disabled: true },
          [this.utils.maxLength('20'), Utils.checkNumber]
        ),
        planSupplierSlipNo: new FormControl(initData ? initData.planSupplierSlipNo : null, [this.utils.maxLength('20')]),
        planCustomerDeliveryDestinationId: new FormControl(initData ? initData.planCustomerDeliveryDestinationId : null, [Validators.required]),
        outputStatus: new FormControl(initData ? initData.outputStatus : null),
        isClosed: new FormControl(initData ? initData.isClosed : null),
        departmentName: new FormControl({ value: initData ? initData.departmentName : null, disabled: true }, [Validators.required]),
        planCustomerId: new FormControl(initData ? initData.planCustomerId : null, [Validators.required]),
        customerName: new FormControl(initData ? initData.customerName : null),
        planSlipNote: new FormControl(initData ? initData.planSlipNote : null),
        planRepositoryId: new FormControl(initData ? initData.planRepositoryId : null, [Validators.required]),
        saleCategory: new FormControl(initData ? initData.saleCategory : null),
        routeCode: new FormControl(initData ? initData.routeCode : null, [Validators.required]),
        courseCode: new FormControl(initData ? initData.courseCode : null, [Validators.required]),
        phoneNumber: new FormControl({ value: initData ? initData.phoneNumber : null, disabled: true }),
        faxNumber: new FormControl({ value: initData ? initData.faxNumber : null, disabled: true }),
        postCode: new FormControl({ value: initData ? initData.postCode : null, disabled: true }),
        address1: new FormControl({ value: initData ? initData.address1 : null, disabled: true }),
        address2: new FormControl({ value: initData ? initData.address2 : null, disabled: true }),
        address3: new FormControl({ value: initData ? initData.address3 : null, disabled: true }),
        address4: new FormControl({ value: initData ? initData.address4 : null, disabled: true }),
        checked: new FormControl(0)
      }),
      tableForm: this.fb.array([])
    });

    this.mainForm.get('planForm.planOutputDate')?.valueChanges.subscribe((value) => {
      this.mainForm.get('planForm.planWorkingDate')?.setValue(value);
    });
    this.mainForm.get('planForm.planRepositoryId')?.valueChanges.subscribe((value) => {
      this.syncRepositoryIdWithTableForm(value);
    });

    this.mainForm.get('planForm.checked')?.valueChanges.subscribe((isChecked) => {
      this.handleCheckedChange(isChecked);
    });

    this.handleCheckedChange(this.mainForm.get('planForm.checked')?.value);

    if (this.isCheckBox) {
      this.onPlanCustomerDeliveryDestinationIdChange();
    }

    if (this.initiaPlanDetailData && this.initiaPlanDetailData.length > 0) {
      this.initiaPlanDetailData.forEach(detail => {
        this.addFormArray(detail, true);
      });
    } else {
      this.addFormArray();
    }
  }

  private setFormData(formGroup?: FormGroup, enable?: Boolean): void {
    let planDeliverDateFormatted = '';
    const planWorkingDate = this.mainForm.get('planForm.planWorkingDate')?.value;

    if (planWorkingDate && this.customer) {
      const planDeliverDate = new Date(planWorkingDate);
      planDeliverDate.setDate(planDeliverDate.getDate() + this.customer.leadTime);
      planDeliverDateFormatted = this.utils.formatDate(planDeliverDate.toISOString().split('T')[0]);
    }

    this.mainForm.get('planForm')?.patchValue({
      departmentName: this.customerDest?.departmentName ?? null,
      phoneNumber: this.customerDest?.phoneNumber ?? null,
      faxNumber: this.customerDest?.faxNumber ?? null,
      postCode: this.customerDest?.postCode ?? null,
      address1: this.customerDest?.address1 ?? null,
      address2: this.customerDest?.address2 ?? null,
      address3: this.customerDest?.address3 ?? null,
      address4: this.customerDest?.address4 ?? null,
      customerName: this.customer?.customerName ?? null,
      planDeliverDate: planDeliverDateFormatted,
      routeCode: this.customer?.routeCode ?? null,
      courseCode: this.customer?.courseCode ?? null
    });

    const fieldsToDisable = ['customerName'];
    fieldsToDisable.forEach(field => {
      this.mainForm.get('planForm.' + field)?.disable();
    });

    if (formGroup) {
      formGroup.patchValue({
        productId: this.product?.productId ?? null,
        productName: this.product?.name1 ?? null,
        datetimeMngTypeText: this.getDatetimeMngTypeText() ?? null,
        standardInfo: this.product?.standardInfo ?? null,
        productOwnerId: this.customerDest?.customerId ?? null,
        totalActualQuantity: '0',
      })
      this.setControlDisabledState(formGroup, 'productName', true);
      this.setControlDisabledState(formGroup, 'amountTotal', true);
      this.setControlDisabledState(formGroup, 'tax', true);
      // this.setControlDisabledState(formGroup, 'locationId', true);
      this.setControlDisabledState(formGroup, 'totalActualQuantity', true);
      this.setControlDisabledState(formGroup, 'productOwnerName', true);
      this.setControlDisabledState(formGroup, 'datetimeMngTypeText', true);
      this.setControlDisabledState(formGroup, 'numberMngFrom', this.product?.isNumberMng === '0');
      this.setControlDisabledState(formGroup, 'numberMngTo', this.product?.isNumberMng === '0');
      this.setControlDisabledState(formGroup, 'datetimeMngFrom', this.product?.isDatetimeMng === '0');
      this.setControlDisabledState(formGroup, 'datetimeMngTo', this.product?.isDatetimeMng === '0');
      if (enable && enable !== undefined) {
        this.setControlDisabledState(formGroup, 'csPlanQuantity', true);
        this.setControlDisabledState(formGroup, 'blPlanQuantity', true);
        this.setControlDisabledState(formGroup, 'psPlanQuantity', true);
      
        formGroup.get('billingPackType')?.valueChanges.subscribe((value) => {
          this.handleInputChange(formGroup, value);
        });

        this.handleRadioChange(formGroup);
      }

    }

  }

  get tableForm(): FormArray {
    return this.mainForm.controls["tableForm"] as FormArray;
  }

  public addFormArray(detail?: inventoryPlanOutputDetailModel, status?: boolean): void {
    const formGroup = this.fb.group({
      planDetailId: detail ? detail.planDetailId : null,
      inventoryOutputId: detail ? detail.inventoryOutputId : null,
      productInventoryId: detail ? detail.productInventoryId : null,
      productId: [detail ? detail.productId : null, Validators.required],
      productCode: null,
      productName: null,
      standardInfo: null,
      datetimeMngTypeText: null,
      repositoryId: [detail ? detail.repositoryId : null, Validators.required],
      locationId: [{ value: detail ? detail.locationId : null, disabled: true }],
      locations: [[]],
      datetimeMngFrom: detail ? detail.datetimeMngFrom : null,
      datetimeMngTo: detail ? detail.datetimeMngTo : null,
      numberMngFrom: detail ? detail.numberMngFrom : null,
      numberMngTo: detail ? detail.numberMngTo : null,
      productOwnerId: [detail ? detail.productOwnerId : null, Validators.required],
      productOwnerName: null,
      customerCode: null,
      customerName: null,
      csPlanQuantity: [detail ? detail.csPlanQuantity : null, Utils.checkNumber],
      blPlanQuantity: [detail ? detail.blPlanQuantity : null, Utils.checkNumber],
      psPlanQuantity: [detail ? detail.psPlanQuantity : null, Utils.checkNumber],
      totalPlanQuantity: [detail ? detail.totalPlanQuantity : null, Validators.required],
      inventoryProductType: detail ? detail.inventoryProductType : null,
      planCsPrice: detail ? detail.planCsPrice : null,
      planBlPrice: detail ? detail.planBlPrice : null,
      planPiecePrice: detail ? detail.planPiecePrice : null,
      planAmountTotal: detail ? detail.planAmountTotal : null,
      tax: detail ? detail.tax : null,
      isBatchInprogress: detail ? detail.isBatchInprogress : null,
      billingPackType: [detail ? detail.billingPackType : null, Validators.required],
      amountTotal: detail ? detail.amountTotal : null,
      totalActualQuantity: null,
      packBlAmount: null,
      packCsAmount: null,
      isPieceOutput: null,
      isPackBlOutput: null,
      isPackCsOutput: null
    });
    if (status) {
      this.getProductById(formGroup);
        this.handleInputChange(formGroup, formGroup.get('billingPackType')?.value as string);
      
    }


    this.tableForm.push(formGroup);
  }


  public copyFormArrayIndex(index: number): void {
    const dataToCopy = this.tableForm.at(index) as FormGroup;
    if (dataToCopy && dataToCopy.valid) {
      const copiedItem = this.fb.group({});
      Object.keys(dataToCopy.controls).forEach(key => {
        const control = dataToCopy.get(key);
        if (control) {
          if (key === 'locations') {
            copiedItem.addControl(key, new FormControl(control.value));
          } else {
            copiedItem.addControl(key, new FormControl(
              { value: control.value, disabled: control.disabled },
              control.validator
            ));
          }
        }
      });

      this.tableForm.push(copiedItem);
      const newIndex = this.tableForm.length - 1;
      const newFormGroup = this.tableForm.at(newIndex) as FormGroup;
      newFormGroup.get('billingPackType')?.valueChanges.subscribe((value) => {
        this.handleInputChange(newFormGroup, value);
      });
      setTimeout(() => {
        this.handleRadioChange(newFormGroup);
      }, 1);

    } else {
      this.notificationService.showError("フォームが無効か見つかりません");

    }
  };

  public removeFormArrayIndex(index: number): void {
    this.notificationService.showDeleteConfirmation(() => {
      this.tableForm.removeAt(index);
    });

  };

  public onSubmit(): void {
    const createSlipType = this.mainForm.get('planForm.createSlipType')?.value;
    if (createSlipType === '0') {
      this.generateAutomaticCode();
    }
    if (this.mainForm.valid) {
      this.outputPlanService.saveOutputPlanData(this.mainForm.getRawValue()).subscribe((res => {
        if (res instanceof HttpErrorResponse) {
          this.notificationService.showError(res.message)
        } else {
          this.notificationService.showSuccess(res.meta.message)

        }
      }))

    } else {
      console.log('Form is not valid');
    }
  };

  private dialogMapping = {
    [fieldMappings.customerDeliveryDest]: dialogOptions.customerDeliveryDest,
    [fieldMappings.customer]: dialogOptions.customerDialog,
    [fieldMappings.product]: dialogOptions.product,
    [fieldMappings.customerCode]: dialogOptions.customerDialog,
    [fieldMappings.productInventory]: dialogOptions.productInventory
  };

  public openDialog(fieldName: string, arrayIndex?: number): void {

    const dialogConfig = this.dialogMapping[fieldName];
    if (dialogConfig && this.isCheckBox) {
      const dialogData: DialogOptionApi = {
        title: dialogConfig.title,
        url: dialogConfig.url,
        columReturn: dialogConfig.columReturn,
        listHeader: dialogConfig.listHeader,
        width: 300,
        height: 550,
        listParam: [],
      };

      const dialogRef = this.dialog.open(DialogSeachApiComponent, {
        data: dialogData,
        width: '300px',
        height: '550px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && dialogConfig) {
          if (arrayIndex !== undefined) {
            const formArray = this.mainForm.get('tableForm') as FormArray;
            const formGroup = formArray.at(arrayIndex) as FormGroup;
            formGroup.get(fieldName)?.setValue(result[dialogConfig.columReturn]);
          } else {
            this.mainForm.get(fieldName)?.setValue(result[dialogConfig.columReturn]);
          }
        }
        switch (fieldName) {
          case "planForm.planCustomerId":
            this.getCustomerByCode();
            break;
          case "planForm.planCustomerDeliveryDestinationId":
            this.getCustomerDestByCode();
            break;
          case "productCode":
            if (arrayIndex !== undefined)
              this.getProductByCode(arrayIndex);
            break;
          case "customerCode":
            if (arrayIndex !== undefined)
              this.getCustomerByCodeIndex(arrayIndex);
            break;
          case "productInventoryId":
            if (arrayIndex !== undefined)
              this.getProductInventoryIndex(arrayIndex);
            break;
        }
      });

    }

  }

  private initData(): void {
    const inventoryOutputId = sessionStorage.getItem('inventoryOutputId');
    if (inventoryOutputId) {

      forkJoin({
        planOutput: this.outputPlanService.findPlanOutputWithKey(Number(inventoryOutputId)),
        planDetail: this.outputPlanService.getPlanOutputDetail(Number(inventoryOutputId))
      }).subscribe(
        (res) => {
          if (res.planOutput instanceof HttpErrorResponse || res.planDetail instanceof HttpErrorResponse) {
            this.notificationService.showError('エラーが発生しました。');
          } else {
            this.initialPlanData = res.planOutput.data;
            this.initiaPlanDetailData = res.planDetail.data;
            this.isInitData = false;
            this.initialForm();
          }
        }
      );

    }
  }

  private getCourse() {
    this.outputPlanService.getAllCourse().subscribe((res) => {
      if (res) {
        this.course = res.data;
      }
    });

  }

  private getRoute() {
    this.outputPlanService.getAllRoute().subscribe((res) => {
      if (res) {
        this.route = res.data;
      }
    })
  }

  private getRepository() {
    this.outputPlanService.getAllRepository().subscribe((res) => {
      if (res) {
        this.repository = res.data;
      }
    })
  }

  private getLocation() {
    this.outputPlanService.getAllLocation().subscribe((res) => {
      if (res) {
        this.location = res.data;
      }
    })
  }

  public checkSlipNumber(): void {

    const slipNo = this.mainForm.get('planForm.slipNo')?.value;
    const isValidSlipNo = /^\d+$/.test(slipNo);

    if (!isValidSlipNo) {
      this.mainForm.get('planForm.slipNo')?.setErrors({ invalidNumber: true });
      return;
    }
    if (slipNo) {
      this.outputPlanService.checkSlipNo(slipNo).subscribe((res) => {
        if (res.data) {
          this.mainForm.get('planForm.slipNo')?.setErrors({ duplicateSlipNo: true });
        } else {
          this.mainForm.get('planForm.slipNo')?.setErrors(null);
        }
      });
    }
  }

  public getCustomerByCode(): void {
    const customerCode = this.mainForm.get('planForm.planCustomerId')?.value;
    if (customerCode && this.isCheckBox) {
      this.loadingDialog.showSpinner(true);
      this.outputPlanService.getCustomerByCode(customerCode).subscribe((res) => {
        if (res.data) {
          this.customer = res.data;
          console.log("customer", res.data);

          this.setFormData();
        } else {
          this.customer = null;
          this.setFormData();
          this.mainForm.get('planForm.planCustomerId')?.setErrors({ notFound: true })
        }
      })

      this.loadingDialog.showSpinner(false);
    }
  }

  public getCustomerByCodeIndex(arrayIndex: number): void {
    const formArray = this.mainForm.get('tableForm') as FormArray;
    const formGroup = formArray.at(arrayIndex) as FormGroup;
    const customerCode = formGroup.get('customerCode')?.value;
    if (customerCode) {
      this.outputPlanService.getCustomerByCode(customerCode).subscribe((res) => {
        if (res.data) {
          this.customers = res.data;
          formGroup.get('productOwnerName')?.setValue(this.customers?.customerName);
          this.setFormData(formGroup);
        } else {
          this.customers = null;
          formGroup.get('productOwnerName')?.setValue('');
          this.setFormData(formGroup);
          formGroup.get('customerCode')?.setErrors({ notFound: true })
        }
      })
      this.loadingDialog.showSpinner(false);
    }
  }
  public getProductInventoryIndex(arrayIndex: number): void {
    const formArray = this.mainForm.get('tableForm') as FormArray;
    const formGroup = formArray.at(arrayIndex) as FormGroup;
    const productInventoryId = formGroup.get('productInventoryId')?.value;
    if (productInventoryId) {
      this.outputPlanService.getProductInventoryById(productInventoryId).subscribe((res) => {
        if (res.data) {
          console.log(res.data);

        }
      })
      this.loadingDialog.showSpinner(false);
    }

  }

  public getCustomerDestByCode(): void {
    const destinationCode = this.mainForm.get('planForm.planCustomerDeliveryDestinationId')?.value;

    if (destinationCode && this.isCheckBox) {

      this.loadingDialog.showSpinner(true);
      this.outputPlanService.getCustomerDestByCode(destinationCode).subscribe((res) => {
        if (res.data) {
          this.customerDest = res.data;
          this.setFormData();
        } else {
          this.customerDest = null;
          this.setFormData();
          this.mainForm.get('planForm.planCustomerDeliveryDestinationId')?.setErrors({ notFound: true })
        }

      })
      this.loadingDialog.showSpinner(false);
    } else if (destinationCode) {
      this.loadingDialog.showSpinner(true);
      this.outputPlanService.getCustomerDestByCode(destinationCode).subscribe((res) => {
        if (res.data) {
          this.customerDest = null;
          this.mainForm.get('planForm.planCustomerDeliveryDestinationId')?.setErrors({ required: true })
        }
      })
      this.loadingDialog.showSpinner(false);
    } else {
      this.customerDest = null;
      this.setFormData();
      this.mainForm.get('planForm.planCustomerId')?.setValue(null);
      this.mainForm.get('planForm.customerName')?.setValue(null);


    }
  }

  public getProductByCode(arrayIndex: number): void {
    const formArray = this.mainForm.get('tableForm') as FormArray;
    const formGroup = formArray.at(arrayIndex) as FormGroup;
    const productCode = formGroup.get('productCode')?.value;


    this.loadingDialog.showSpinner(true);
    if (productCode)
      this.outputPlanService.getProductByCode(productCode).subscribe((res) => {
        this.loadingDialog.showSpinner(false);
        if (res.data) {
          this.product = res.data;
          formGroup.get('packCsAmount')?.setValue(this.product?.packCsAmount);
          formGroup.get('packBlAmount')?.setValue(this.product?.packBlAmount);
          formGroup.get('isPackCsOutput')?.setValue(this.product?.isPackCsOutput);
          formGroup.get('isPackBlOutput')?.setValue(this.product?.isPackBlOutput);
          formGroup.get('isPieceOutput')?.setValue(this.product?.isPieceOutput);
          this.setFormData(formGroup, true);
        } else {
          this.product = null;
          this.setFormData(formGroup, true);
          formGroup.get('productCode')?.setErrors({ notFound: true })
        }
      })
    this.loadingDialog.showSpinner(false);
  }

  public getProductById(formGroup: FormGroup): void {
    const productId = formGroup.get('productId')?.value;    
    this.loadingDialog.showSpinner(true);
    if (productId)
      this.outputPlanService.getProductById(productId).subscribe((res) => {
        this.loadingDialog.showSpinner(false);
        if (res.data) {
          this.product = res.data;
          formGroup.get('packCsAmount')?.setValue(this.product?.packCsAmount);
          formGroup.get('packBlAmount')?.setValue(this.product?.packBlAmount);
          formGroup.get('productCode')?.setValue(this.product?.productCode);
          formGroup.get('isPackCsOutput')?.setValue(this.product?.isPackCsOutput);
          formGroup.get('isPackBlOutput')?.setValue(this.product?.isPackBlOutput);
          formGroup.get('isPieceOutput')?.setValue(this.product?.isPieceOutput);
          this.setFormData(formGroup, true);
        }
      })
    this.loadingDialog.showSpinner(false);
  }

  public handleSelectLocationChange(event: Event, arrayIndex: number): void {
    const formArray = this.mainForm.get('tableForm') as FormArray;
    const formGroup = formArray.at(arrayIndex) as FormGroup;
    const selectElement = event.target as HTMLSelectElement;
    const repo_id = parseInt(selectElement.value, 10);

    this.outputPlanService.getLocationByRepo(repo_id).subscribe((res) => {
      if (res.data) {
        const locations = res.data;
        formGroup.get('locations')?.setValue(locations);
        if (locations.length > 0) {
          formGroup.get('locationId')?.enable();
        } else {
          formGroup.get('locationId')?.disable();
        }
      }
    });
  }

  private syncRepositoryIdWithTableForm(repositoryId: any): void {
    const tableFormArray = this.mainForm.get('tableForm') as FormArray;
    tableFormArray.controls.forEach((formGroup) => {
      formGroup.patchValue({ repositoryId: repositoryId });
      this.getLocationByRepo(formGroup as FormGroup, repositoryId);
    });
  }

  public getLocationByRepo(formGroup: FormGroup, repositoryId: number) {
    this.outputPlanService.getLocationByRepo(repositoryId).subscribe((res) => {
      if (res.data) {
        const locations = res.data;
        formGroup.get('locations')?.setValue(locations);
        if (locations.length > 0) {
          formGroup.get('locationId')?.enable();
        } else {
          formGroup.get('locationId')?.disable();
        }
      }
    });
  }


  public onDeliveryTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const slipType = selectElement.value;
    if (slipType === "0") {
      this.mainForm.get('planForm.slipNo')?.disable();
      this.mainForm.get('planForm.slipNo')?.setValue(null);
    } else {
      this.mainForm.get('planForm.slipNo')?.enable();

    }
  }

  private generateAutomaticCode() {
    this.outputPlanService.getNextAutomaticSlipNo().subscribe(
      (res: any) => {
        this.mainForm.get('planForm.slipNo')?.setValue(res);
      }
    );
  }

  public onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    const fields = [
      'departmentName',
      'faxNumber',
      'postCode',
      'address1',
      'address2',
      'address3',
      'address4',
      'phoneNumber'
    ];

    if (isChecked) {
      this.toggleFieldsState(true, fields);
      this.toggleFieldsState(true, ['planCustomerId', 'customerName']);
      this.mainForm.get('planForm.departmentName')?.setValue(null);
      this.mainForm.get('planForm.faxNumber')?.setValue(null);
      this.mainForm.get('planForm.postCode')?.setValue(null);
      this.mainForm.get('planForm.address1')?.setValue(null);
      this.mainForm.get('planForm.address2')?.setValue(null);
      this.mainForm.get('planForm.address3')?.setValue(null);
      this.mainForm.get('planForm.address4')?.setValue(null);
      this.mainForm.get('planForm.planCustomerId')?.setValue(null);
      this.mainForm.get('planForm.customerName')?.setValue(null);
      this.mainForm.get('planForm.phoneNumber')?.setValue(null);
      this.mainForm.get('planForm.planCustomerDeliveryDestinationId')?.setValue(null);
      this.isCheckBox = false;
    } else {
      this.isCheckBox = true;
      this.toggleFieldsState(false, fields);
    }
  }

  public tolTalQuantityChange(arrayIndex: number): void {
    const formArray = this.mainForm.get('tableForm') as FormArray;
    const formGroup = formArray.at(arrayIndex) as FormGroup;
    const totalActualQuantity = formGroup.get('totalActualQuantity')?.value || 0;
    const csPlanQuantity = parseFloat(formGroup.get('csPlanQuantity')?.value) || 0;
    const blPlanQuantity = parseFloat(formGroup.get('blPlanQuantity')?.value) || 0;
    const psPlanQuantity = parseFloat(formGroup.get('psPlanQuantity')?.value) || 0;


    const packCsAmount = formGroup.get('packCsAmount')?.value || 0;
    const packBlAmount = formGroup.get('packBlAmount')?.value || 0;

    const totalPlanQuantity = (packCsAmount * csPlanQuantity * packBlAmount) + (packBlAmount * blPlanQuantity) + psPlanQuantity;
    const formattedTotalPlanQuantity = totalPlanQuantity.toLocaleString('en-US');
    formGroup.get('totalPlanQuantity')?.setValue(formattedTotalPlanQuantity);
    const totalPlanQuantityControl = formGroup.get('totalPlanQuantity');
    totalPlanQuantityControl?.disable();

    const totalNotYet = totalPlanQuantity - Number(totalActualQuantity);
    formGroup.get('tax')?.setValue(totalNotYet);

  }

  public handleRadioChange(formGroup: FormGroup): void {
    if (this.product?.isPackCsOutput === '0' && this.product?.isPackBlOutput === '0' && this.product?.isPieceOutput === '0') {
      formGroup.get('productCode')?.setErrors({ notFoundInventoryProduct: true })
      this.notificationService.showError(" 商品の荷姿が設定されないため、登録できません。");
      return;
    }

    this.initializeRadioStatus(formGroup);

  }

  public handleInputChange(formGroup: FormGroup, key: string) {
    console.log(formGroup,key);
    
    if (!formGroup) return;
    const isPackCsOutput = formGroup.get('isPackCsOutput')?.value;
    const isPackBlOutput = formGroup.get('isPackBlOutput')?.value;
    const isPieceOutput = formGroup.get('isPieceOutput')?.value;
    const enableField = (fieldName: string, enabled: boolean, value?: any) => {
      const control = formGroup.get(fieldName);
      if (control) {
        if (enabled) {
          control.enable();
        } else {
          control.disable();
        }
        if (value !== undefined) {
          control.setValue(value);
        }
      }
    };

    switch (key) {
      case '1':
        enableField('csPlanQuantity', true);
        enableField('blPlanQuantity', isPackBlOutput === '1');
        if (isPackBlOutput === '0') {
          enableField('psPlanQuantity', isPackBlOutput === '1' && isPieceOutput === '1', '');
        }
        enableField('psPlanQuantity', isPackBlOutput === '1' && isPieceOutput === '1');
        break;
      case '2':
        enableField('csPlanQuantity', false, '');
        enableField('blPlanQuantity', isPackBlOutput === '1');
        enableField('psPlanQuantity', isPieceOutput === '1');
        break;
      case '3':
        enableField('csPlanQuantity', false, '');
        enableField('blPlanQuantity', false, '');
        enableField('psPlanQuantity', isPieceOutput === '1');
        break;
      default:
        break;
    }
  }

  public initializeRadioStatus(formGroup: FormGroup): void {
    const index = this.tableForm.controls.indexOf(formGroup);
    const radio1 = document.getElementById(`radio1${index}`) as HTMLInputElement;
    const radio2 = document.getElementById(`radio2${index}`) as HTMLInputElement;
    const radio3 = document.getElementById(`radio3${index}`) as HTMLInputElement;
 

    if (radio1) {
      radio1.disabled = !(formGroup.get('isPackCsOutput')?.value === '1');
    }

    if (radio2) {
      radio2.disabled = !(formGroup.get('isPackBlOutput')?.value === '1');
    }

    if (radio3) {
      radio3.disabled = !(formGroup.get('isPieceOutput')?.value === '1');
    }
  }

  private toggleFieldsState(enable: boolean, fields: string[]): void {
    fields.forEach(field => {
      if (enable) {
        this.mainForm.get('planForm.' + field)?.enable();
      } else {
        this.mainForm.get('planForm.' + field)?.disable();
      }
    });
  }

  private onPlanCustomerDeliveryDestinationIdChange() {
    this.mainForm.get('planForm.planCustomerDeliveryDestinationId')?.valueChanges.subscribe(planCustomerDeliveryDestinationId => {
      if (planCustomerDeliveryDestinationId) {
        this.mainForm.get('planForm.planCustomerId')?.setValue(planCustomerDeliveryDestinationId);
        this.getCustomerByCode();
        this.mainForm.get('planForm.planCustomerId')?.disable();
      } else {
        this.mainForm.get('planForm.planCustomerId')?.enable();
      }
    });
  }

  private setControlDisabledState(formGroup: FormGroup, controlName: string, isDisabled: boolean): void {
    const control = formGroup.get(controlName);
    if (control) {
      isDisabled ? control.disable() : control.enable();
    }
  }

  private getDatetimeMngTypeText(): string {
    switch (this.product?.datetimeMngType) {
      case '0':
        return '入';
      case '1':
        return '製';
      case '2':
        return '賞';
      default:
        return '';
    }
  }

  public isFormGroupValid(index: number): boolean {
    const formGroup = this.tableForm.at(index) as FormGroup;

    return formGroup.valid;
  }
  public handleBackNavigation(): void {
    this.router.navigate(['/delivery/inventory-output-list']);
  }

  private handleCheckedChange(isChecked: boolean): void {
    const planForm = this.mainForm.get('planForm') as FormGroup;
    const phoneNumberControl = planForm.get('phoneNumber');
    const address1Control = planForm.get('address1');

    if (isChecked) {
      phoneNumberControl?.enable();
      phoneNumberControl?.setValidators([Validators.required]);

      address1Control?.enable();
      address1Control?.setValidators([Validators.required]);
    } else {
      phoneNumberControl?.disable();
      phoneNumberControl?.clearValidators();

      address1Control?.disable();
      address1Control?.clearValidators();
    }

    phoneNumberControl?.updateValueAndValidity();
    address1Control?.updateValueAndValidity();

  }

  public onHelpIconClick(fieldName: string, arrayIndex?: number): void {
    this.openDialog(fieldName, arrayIndex);

  }
  isProductCodeAndRepo(index: number): boolean {
    const formGroup = this.tableForm.at(index) as FormGroup;
    return formGroup.get('productId')?.value && formGroup.get('repositoryId')?.value;

  }



}



