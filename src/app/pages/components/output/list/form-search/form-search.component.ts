import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SearchParams, RepositoryModel, DataOutputListputModel } from 'src/app/pages/models/output/list.model';
import { OutputListService } from 'src/app/pages/services/output-list.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogOptionApi } from '@common/models/dialog-seach-api/dialog-search-api.model';
import { DialogSeachApiComponent } from '@common/components/dialog-seach-api/dialog-search-api.component';
import { formOutputList } from '@core/config/form-config';
import { dialogOptions, fieldMappings } from '@core/config/dialog-config';
import { IDialogInformation } from '@common/models';
import { DialogInformationComponent } from '@common/components/dialog-information/dialog-information.component';
// sửa lại call API 
@Component({
  selector: 'form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {

  @Output() formSubmitEvent = new EventEmitter<SearchParams>();
  public searchForm: FormGroup = new FormGroup({});
  public repositories: RepositoryModel[] = [];

  constructor(private fb: FormBuilder, private outputListService: OutputListService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllRepositories()
    this.initialForm()
  }

  filterValidCriteria(criteria: SearchParams): SearchParams {
    const validCriteria: Partial<SearchParams> = {};

    // Chỉ giữ lại các giá trị hợp lệ
    for (const key in criteria) {
      if (criteria[key] !== null && criteria[key] !== undefined) {
        validCriteria[key] = criteria[key];
      }
    }

    return validCriteria as SearchParams;
  }
  private dialogMapping = {
    [fieldMappings.supplierCodeFrom]: dialogOptions.supplierDialog,
    [fieldMappings.supplierCodeTo]: dialogOptions.supplierDialog,
    [fieldMappings.customerCodeFrom]: dialogOptions.customerDialog,
    [fieldMappings.customerCodeTo]: dialogOptions.customerDialog,
    [fieldMappings.destinationCodeFrom]: dialogOptions.customerDeliveryDest,
    [fieldMappings.destinationCodeTo]: dialogOptions.customerDeliveryDest,
    [fieldMappings.productCodeFrom]: dialogOptions.product,
    [fieldMappings.productCodeTo]: dialogOptions.product,
    [fieldMappings.ownerCodeForm]: dialogOptions.ownerDialog,
    [fieldMappings.ownerCodeTo]: dialogOptions.ownerDialog,
  };
  openDialog(fieldName: string): void {
    const dialogConfig = this.dialogMapping[fieldName];
    if (dialogConfig) {
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
          this.searchForm.get(fieldName)?.setValue(result[dialogConfig.columReturn])
        }
      });

    }
  }

  onFormSubmit() {
    const criteria = this.searchForm.value;
    console.log("searchForm.value ", criteria)
    const keysToFormat = [
      'orderDateFrom', 'orderDateTo', 'planOutputDateFrom', 'planOutputDateTo',
      'planWorkingDateFrom', 'planWorkingDateTo', 'planDeliverDateFrom',
      'planDeliverDateTo'
    ];

    keysToFormat.forEach((key) => {
      if (criteria[key]) {
        criteria[key] = criteria[key].replace(/-/g, '/');
      }
    });
    const params = this.filterValidCriteria(criteria);
    console.log("validCriteria ", params)
    this.formSubmitEvent.emit(params);

  }
  reset() {
    this.searchForm.reset();
    this.searchForm = this.fb.group(formOutputList);
    const criteria = this.searchForm.value;
    const params = this.filterValidCriteria(criteria);
    this.formSubmitEvent.emit(params);
  }
  getAllRepositories() {
    this.outputListService.getAllRepository().subscribe((res) => {
      if (res) {
        this.repositories = res.data;
      } else {
        console.warn('Response does not contain valid data');
        this.repositories = [];
      }
    });
  }


  private initialForm(): void {
    this.searchForm = this.fb.group({
      page: new FormControl(null),
      size: new FormControl(null),
      repositoryIdFrom: new FormControl(null),
      repositoryIdTo: new FormControl(null),
      orderDateFrom: new FormControl(null, [this.dateValidator("orderDateFrom")]),
      orderDateTo: new FormControl(null, [this.dateValidator("orderDateTo")]),
      planOutputDateFrom: new FormControl(null, [this.dateValidator("planOutputDateFrom")]),
      planOutputDateTo: new FormControl(null, [this.dateValidator("planOutputDateTo")]),
      planWorkingDateFrom: new FormControl(null, [this.dateValidator("planWorkingDateFrom")]),
      planWorkingDateTo: new FormControl(null, [this.dateValidator("planWorkingDateTo")]),
      planDeliverDateFrom: new FormControl(null, [this.dateValidator("planDeliverDateFrom")]),
      planDeliverDateTo: new FormControl(null, [this.dateValidator("planDeliverDateTo")]),
      slipNoFrom: new FormControl(null, [this.codeValidator("slipNoFrom")]),
      slipNoTo: new FormControl(null, this.codeValidator("slipNoTo")),
      productCodeFrom: new FormControl(null, [this.codeValidator("productCodeFrom")]),
      productCodeTo: new FormControl(null, [this.codeValidator("productCodeTo")]),
      batchNo: new FormControl(null),
      productName: new FormControl(null),
      destinationCodeFrom: new FormControl(null),
      destinationCodeTo: new FormControl(null),
      departmentName: new FormControl(null),
      supplierCodeFrom: new FormControl(null),
      supplierCodeTo: new FormControl(null),
      supplierName: new FormControl(null),
      customerCodeFrom: new FormControl(null),
      customerCodeTo: new FormControl(null),
      customerName: new FormControl(null),
      ownerCodeForm: new FormControl(null),
      ownerCodeTo: new FormControl(null),
      DeliveryType: new FormControl("0"),
      DeliveryStatus: new FormControl("0"),
      isClosed: new FormControl("2")
    });


  }

  codeValidator(fieldName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromField = fieldName.includes('From') ? fieldName : fieldName.replace('To', 'From');
      const toField = fieldName.includes('To') ? fieldName : fieldName.replace('From', 'To');

      const fromCode = parseInt(this.searchForm.get(fromField)?.value, 10);
      const toCode = parseInt(this.searchForm.get(toField)?.value, 10);
      if (!isNaN(fromCode) && !isNaN(toCode) && fromCode > toCode) {
        const errorMessage = `${fromCode} は ${toCode} 以上の値を指定してください。`;
        const dialogData: IDialogInformation = {
          type: 'error',
          content: errorMessage,
          negative: {
            title: 'Close',
            click: () => {
              this.dismiss();
            }
          }
        };
        this.openDialogInformation(dialogData);
        this.searchForm.get(fieldName)?.reset();
        return { 'codeRange': errorMessage };
      }

      return null;
    };
  }


  dateValidator(fieldName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isFromDate = fieldName.includes('From');
      const compareTo = isFromDate ? fieldName.replace('From', 'To') : fieldName.replace('To', 'From');
      const fromDate = isFromDate ? control.value as Date : this.searchForm.get(compareTo)?.value as Date;
      const toDate = isFromDate ? this.searchForm.get(compareTo)?.value as Date : control.value as Date;

      if (fromDate && toDate && fromDate >= toDate) {
        console.log(`From date: ${fromDate}, To date: ${toDate}`);
        const errorMessage = `${fromDate} は ${toDate} 以下の値を指定してください`;
        const dialogData: IDialogInformation = {
          type: 'error',
          content: errorMessage,
          negative: {
            title: 'Close',
            click: () => {
              this.dismiss();
            }
          }
        };
        this.openDialogInformation(dialogData);
        this.searchForm.get(fieldName)?.reset();
        return { 'dateRange': errorMessage };
      }

      return null;
    };
  }



  openDialogInformation(dialogData: IDialogInformation): void {
    const dialogRef = this.dialog.open(DialogInformationComponent, {
      data: dialogData
    });
  }

  dismiss(): void {
    this.dialog.closeAll();
  }









}

