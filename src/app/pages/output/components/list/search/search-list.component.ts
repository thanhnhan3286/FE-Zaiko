import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RepositoryService } from '../../../service/repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchCriteriaRequest } from '../../../model/output-list';
import { RepositoryResponse } from '../../../model/repositoryDto';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeachApiComponent } from '@common/components/dialog-seach-api/dialog-search-api.component';
import { DialogConfig } from '@core/config/dialog.config';
import { Utils } from '@common/utils/utils';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit, OnChanges {
  repositoryList!: RepositoryResponse;
  @Input() isHiddenSearch: boolean = false;
  @Output() public search: EventEmitter<SearchCriteriaRequest> =
    new EventEmitter<SearchCriteriaRequest>();
  // data: DialogOptionApi = new DialogOptionApi();

  searchOutputForm = new FormGroup({});
  public util = Utils;

  constructor(
    private repositoryService: RepositoryService,
    private dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.searchOutputForm = this.initForm();
    }
  }

  ngOnInit(): void {
    this.getAll();
    this.searchOutputForm = this.initForm();
  }

  initForm(): FormGroup {
    return new FormGroup({
      orderDateFrom: new FormControl('', [
        this.util.checkFromDate('orderDateTo'),
      ]),
      orderDateTo: new FormControl('', [
        this.util.checkToDate('orderDateFrom'),
      ]),
      planOutputDateFrom: new FormControl('', [
        this.util.checkFromDate('planOutputDateTo'),
      ]),
      planOutputDateTo: new FormControl('', [
        this.util.checkToDate('planOutputDateFrom'),
      ]),
      planWorkingDayFrom: new FormControl('', [
        this.util.checkFromDate('planWorkingDayTo'),
      ]),
      planWorkingDayTo: new FormControl('', [
        this.util.checkToDate('planWorkingDayFrom'),
      ]),
      planDeliverDateFrom: new FormControl('', [
        this.util.checkFromDate('planDeliverDateTo'),
      ]),
      planDeliverDateTo: new FormControl('', [
        this.util.checkToDate('planDeliverDateFrom'),
      ]),
      slipNoFrom: new FormControl('', [this.util.checkFromValue('slipNoTo')]),
      slipNoTo: new FormControl('', [this.util.checkToValue('slipNoFrom')]),
      customerCodeFrom: new FormControl('', [
        this.util.checkFromValue('customerCodeTo'),
      ]),
      customerCodeTo: new FormControl('', [
        this.util.checkToValue('customerCodeFrom'),
      ]),
      customerName: new FormControl(''),
      destinationCodeFrom: new FormControl('', [
        this.util.checkFromValue('destinationCodeTo'),
      ]),
      destinationCodeTo: new FormControl('', [
        this.util.checkToValue('destinationCodeFrom'),
      ]),
      departmentName: new FormControl(''),
      supplierCodeFrom: new FormControl('', [
        this.util.checkFromValue('supplierCodeTo'),
      ]),
      supplierCodeTo: new FormControl('', [
        this.util.checkToValue('supplierCodeFrom'),
      ]),
      supplierName: new FormControl(''),
      ownerIdFrom: new FormControl('', [this.util.checkFromValue('ownerIdTo')]),
      ownerIdTo: new FormControl('', [this.util.checkToValue('ownerIdFrom')]),
      ownerName: new FormControl(''),
      productCodeFrom: new FormControl('', [this.util.checkFromValue('productCodeTo')]),
      productCodeTo: new FormControl('', [this.util.checkToValue('productCodeFrom')]),
      productName: new FormControl(''),
      repositoryIdFrom: new FormControl('', [this.util.checkFromValue('repositoryIdTo')]),
      repositoryIdTo: new FormControl('', [this.util.checkToValue('repositoryIdFrom')]),
      batchNo: new FormControl(''),
      deliveryType: new FormControl('0'),
      deliveryStatus: new FormControl('0'),
      isClosed: new FormControl('9'),
    });
  }
  onSubmit() {
    const searchCriteria = this.searchOutputForm.value;
    this.search.emit(searchCriteria as SearchCriteriaRequest);
  }

  resetForm() {
    this.searchOutputForm = this.initForm();
    this.onSubmit();
  }

  get datable(): any {
    if (this.repositoryList) {
      return this.repositoryList;
    }
    return [];
  }

  public getAll(): void {
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

  openSearchDialog(fieldName: string = '') {
    let resultField: string = '';
    let dataModel = DialogConfig.customer;
    switch (fieldName) {
      case 'customerCodeFrom':
      case 'customerCodeTo':
        dataModel = DialogConfig.customer;
        break;
      case 'destinationCodeFrom':
      case 'destinationCodeTo':
        dataModel = DialogConfig.destination;
        break;
      case 'supplierCodeFrom':
      case 'supplierCodeTo':
        dataModel = DialogConfig.suppplier;
        break;
      case 'productCodeFrom':
      case 'productCodeTo':
        dataModel = DialogConfig.product;
        break;
      case 'ownerIdFrom':
      case 'ownerIdTo':
        dataModel = DialogConfig.owner;
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
        this.searchOutputForm.get(fieldName)?.patchValue(result[resultField]);
      }
    });
  }

  get orderDateFrom() {
    return this.searchOutputForm.get('orderDateFrom');
  }

  get orderDateTo() {
    return this.searchOutputForm.get('orderDateTo');
  }

  get planOutputDateFrom() {
    return this.searchOutputForm.get('planOutputDateFrom');
  }

  get planOutputDateTo() {
    return this.searchOutputForm.get('planOutputDateTo');
  }
  get planWorkingDayFrom() {
    return this.searchOutputForm.get('planWorkingDayFrom');
  }
  get planWorkingDayTo() {
    return this.searchOutputForm.get('planWorkingDayTo');
  }

  get planDeliverDateFrom() {
    return this.searchOutputForm.get('planDeliverDateFrom');
  }

  get planDeliverDateTo() {
    return this.searchOutputForm.get('planDeliverDateTo');
  }

  get slipNoFrom() {
    return this.searchOutputForm.get('slipNoFrom');
  }

  get slipNoTo() {
    return this.searchOutputForm.get('slipNoTo');
  }

  get destinationCodeFrom() {
    return this.searchOutputForm.get('destinationCodeFrom');
  }

  get destinationCodeTo() {
    return this.searchOutputForm.get('destinationCodeTo');
  }

  get customerCodeFrom() {
    return this.searchOutputForm.get('customerCodeFrom');
  }

  get customerCodeTo() {
    return this.searchOutputForm.get('customerCodeTo');
  }

  get supplierCodeFrom() {
    return this.searchOutputForm.get('supplierCodeFrom');
  }

  get supplierCodeTo() {
    return this.searchOutputForm.get('supplierCodeTo');
  }

  get ownerIdFrom() {
    return this.searchOutputForm.get('ownerIdFrom');
  }

  get ownerIdTo() {
    return this.searchOutputForm.get('ownerIdTo');
  }

  get productCodeFrom() {
    return this.searchOutputForm.get('productCodeFrom');
  }

  get productCodeTo() {
    return this.searchOutputForm.get('productCodeTo');
  }

  get repositoryIdFrom() {
    return this.searchOutputForm.get('repositoryIdFrom');
  }

  get repositoryIdTo() {
    return this.searchOutputForm.get('repositoryIdTo');
  }
  
}
