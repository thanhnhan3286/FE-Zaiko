/* eslint-disable no-debugger */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RepositoryModel } from '../../../models/repository.model';
import { OutputListService } from '../../../services/outputList.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeachApiComponent } from '@common/components/dialog-seach-api/dialog-search-api.component';
import { DialogOptionApi } from '@common/models/dialog-seach-api/dialog-search-api.model';
import { dialogConfig } from '@common/utils/dialog-config';
import { ValidatorService } from '../../../services/validator.service';
import { OutputListSearchModel } from '../../../models/output-list.model';

@Component({
  selector: 'app-search-output-list',
  templateUrl: './search-output-list.component.html',
  styleUrls: ['./search-output-list.component.scss']
})
export class SearchOutputListComponent implements OnInit{

  searchForm: FormGroup = new FormGroup({});
  repositories: RepositoryModel[] = [];
  @Output() conditionsSearch = new EventEmitter<any>();

  public constructor(private fb: FormBuilder, 
      private outPutListService: OutputListService, 
      private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getDropdownsRepository();
    this.initialForm();
  }

  initialForm(){
    this.searchForm = this.fb.group({
      fromOrderDate: new FormControl(null),
      toOrderDate: new FormControl(null),
      fromPlanOutputDate: new FormControl(null),
      toPlanOutputDate: new FormControl(null),
      fromPlanWokingDate: new FormControl(null),
      toPlanWokingDate: new FormControl(null),
      fromPlanDeliveDate: new FormControl(null),
      toPlanDeliveDate: new FormControl(null),
      fromSlipNo: new FormControl(null),
      toSlipNo: new FormControl(null),
      fromCustomerCode: new FormControl(null),
      toCustomerCode: new FormControl(null),
      customerName: new FormControl(null),
      fromDeliverDestCode: new FormControl(null),
      toDeliverDestCode: new FormControl(null),
      dileveDestName: new FormControl(null),
      fromSupplierCode: new FormControl(null),
      toSupplierCode: new FormControl(null),
      supplierName: new FormControl(null),
      fromOwnerCode: new FormControl(null),
      toOwnerCode: new FormControl(null),
      ownerName: new FormControl(null),
      fromProductCode: new FormControl(null),
      toProductCode: new FormControl(null),
      productName: new FormControl(null),
      fromRepositoryId: new FormControl(null),
      toRepositoryId: new FormControl(null),
      batchNumber: new FormControl(null),
      deliveType: new FormControl('1'),
      deliveStatus: new FormControl('1'),
      isClosed: new FormControl(''),
      page: new FormControl(0)
    });
  }

  getConditionsSearch(){
    const conditions = this.searchForm.value;
    
    Object.keys(conditions).forEach(key => {
      if(key.toLowerCase().includes('Date'.toLowerCase())){
        conditions[key] = this.formatDate(conditions[key]);
      }
    });

    this.conditionsSearch.emit(conditions as OutputListSearchModel);
  }

  getDropdownsRepository(){
    this.outPutListService.getAllRepository().subscribe((results: any) => {
      this.repositories = results.data;
    });
  }

  openDialog(key: string): void{
    let data: DialogOptionApi = new DialogOptionApi();

    switch (key) {
      case 'fromCustomerCode':

      case 'toCustomerCode':
        data = dialogConfig.customer;

      break;

      case 'fromDeliverDestCode' :

      case 'toDeliverDestCode' :
        data = dialogConfig.deliveryDestination;

        break;

      case 'fromSupplierCode' :

      case 'toSupplierCode' :
        data = dialogConfig.supplier;
        
        break;

      case 'fromOwnerCode' :

      case 'toOwnerCode' :
        data = dialogConfig.owner;

        break;

      case 'fromProductCode' :

      case 'toProductCode' :
        data = dialogConfig.product;
        
        break;

        default:
          console.error('Invalid data key');

          return;
    }

        const dialogRef = this.dialog.open(DialogSeachApiComponent, { data });

        dialogRef.afterClosed().subscribe(result => {
            if(result !== undefined){

              this.searchForm.get(key)?.setValue(result[data.columReturn]);
              console.log('FormControllNameL ',this.searchForm.get(key));
            }
          });
  }

  resetForm(){
    this.initialForm();
    this.getConditionsSearch();
  }

  formatDate(date: string): string{
    if(!date){
      return '';
    }

    return date.replace(/-/g, '/');
  }

  validationFromToInput(searchForm: AbstractControl) : ValidationErrors | null{
    const fromOrderDate = searchForm.get('fromOrderDate');
    const toOrderDate = searchForm.get('toOrderDate');
    const fromPlanOutputDate = searchForm.get('fromPlanOutputDate');
    const toPlanOutputDate = searchForm.get('toPlanOutputDate');
    const fromPlanWokingDate = searchForm.get('fromPlanWokingDate');
    const toPlanWokingDate = searchForm.get('toPlanWokingDate');
    const fromPlanDeliveDate = searchForm.get('fromPlanDeliveDate');
    const toPlanDeliveDate = searchForm.get('toPlanDeliveDate');

    if(ValidatorService.dateValidator(fromOrderDate?.value, toOrderDate?.value)){
      return {'invalidDateRange' : true};
    }

    if(ValidatorService.dateValidator(fromPlanOutputDate?.value, toPlanOutputDate?.value)){
      return {'invalidDateRange' : true};
    }

    if(ValidatorService.dateValidator(fromPlanWokingDate?.value, toPlanWokingDate?.value)){
      return {'invalidDateRange' : true};
    }

    if(ValidatorService.dateValidator(fromPlanDeliveDate?.value, toPlanDeliveDate?.value)){
      return {'invalidDateRange' : true};
    }
    
    return null;
  }

  // export const validationFromToInput: ValidatorFn = (
  //   control: AbstractControl,
  // ): ValidationErrors | null => {
  //   const fromOrderDate = control.get('fromOrderDate');
  //   const toOrderDate = control.get('toOrderDate');
  //   return (ValidatorService.dateValidator(fromOrderDate?.value, toOrderDate?.value))
  //     ? { invalidDateRange: true }
  //     : null;
  // };
  }
