import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RepositoryService } from '../../../service/repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  OutputListModel,
  SearchCriteriaModel,
  SearchCriteriaRequest,
} from '../../../model/output-list';
import { RepositoryResponse } from '../../../model/repositoryDto';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeachApiComponent } from '@common/components/dialog-seach-api/dialog-search-api.component';
import { DialogOptionApi } from '@common/models/dialog-seach-api/dialog-search-api.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  repositoryList!: RepositoryResponse;
  @Output() public search: EventEmitter<SearchCriteriaRequest> =
    new EventEmitter<SearchCriteriaRequest>();

  onSubmit() {
    const searchCriteria = this.searchOutputForm.value;
    this.search.emit(searchCriteria as SearchCriteriaRequest);
  }

  searchOutputForm = new FormGroup({
    orderDateFrom: new FormControl(''),
    orderDateTo: new FormControl(''),
    planOutputDateFrom: new FormControl(''),
    planOutputDateTo: new FormControl(''),
    planWorkingDayFrom: new FormControl(''),
    planWorkingDayTo: new FormControl(''),
    planDeliverDateFrom: new FormControl(''),
    planDeliverDateTo: new FormControl(''),
    slipNoFrom: new FormControl(''),
    slipNoTo: new FormControl(''),
    customerIdFrom: new FormControl(''),
    customerIdTo: new FormControl(''),
    customerName: new FormControl(''),
    destinationIdFrom: new FormControl(''),
    destinationIdTo: new FormControl(''),
    departmentName: new FormControl(''),
    supplierIdFrom: new FormControl(''),
    supplierIdTo: new FormControl(''),
    supplierName: new FormControl(''),
    ownerIdFrom: new FormControl(''),
    ownerIdTo: new FormControl(''),
    ownerName: new FormControl(''),
    productIdFrom: new FormControl(''),
    productIdTo: new FormControl(''),
    productName: new FormControl(''),
    repositoryIdFrom: new FormControl(''),
    repositoryIdTo: new FormControl(''),
    batchNo: new FormControl(''),
    deliveryType: new FormControl('0'),
    deliveryStatus: new FormControl('0'),
    isClosed: new FormControl('9'),
  });

  constructor(
    private repositoryService: RepositoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
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

  openCustomerIdFromPopup() {
    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: {
        title: 'Search Customer Dialog',
        url: 'http://localhost:8081/api/customer/get-all',
        columReturn: 'customerId, customerName',
        width: 300,
        height: 550,
        listHeader: [
          {
            titleHeader: 'CustomerID',
            nameColum: 'customerId',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
          {
            titleHeader: 'CustomerName',
            nameColum: 'customerName',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
        ],
        listParam: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Lấy giá trị từ dialog và gán cho ô input
      if (result) {
        this.searchOutputForm
          .get('customerIdFrom')
          ?.patchValue(result.customerId);
      }
    });
  }

  openCustomerIdToPopup() {
    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: {
        title: 'Search Customer Dialog',
        url: 'http://localhost:8081/api/customer/get-all',
        columReturn: 'customerId, customerName',
        width: 300,
        height: 550,
        listHeader: [
          {
            titleHeader: 'CustomerID',
            nameColum: 'customerId',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
          {
            titleHeader: 'CustomerName',
            nameColum: 'customerName',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
        ],
        listParam: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Lấy giá trị từ dialog và gán cho ô input
      if (result) {
        this.searchOutputForm
          .get('customerIdTo')
          ?.patchValue(result.customerId);
      }
    });
  }

  opendestinationIdFromPopup() {
    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: {
        title: 'Search Destination Dialog',
        url: 'http://localhost:8081/api/customer-delivery-dest/get-all',
        columReturn: 'deliveryDestinationId, departmentName',
        width: 300,
        height: 550,
        listHeader: [
          {
            titleHeader: 'DestinationID',
            nameColum: 'deliveryDestinationId',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
          {
            titleHeader: 'DestinationName',
            nameColum: 'departmentName',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
        ],
        listParam: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Lấy giá trị từ dialog và gán cho ô input
      if (result) {
        this.searchOutputForm
          .get('destinationIdFrom')
          ?.patchValue(result.deliveryDestinationId);
      }
    });
  }

  opendestinationIdToPopup() {
    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: {
        title: 'Search Destination Dialog',
        url: 'http://localhost:8081/api/customer-delivery-dest/get-all',
        columReturn: 'deliveryDestinationId, departmentName',
        width: 300,
        height: 550,
        listHeader: [
          {
            titleHeader: 'DestinationID',
            nameColum: 'deliveryDestinationId',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
          {
            titleHeader: 'DestinationName',
            nameColum: 'departmentName',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
        ],
        listParam: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Lấy giá trị từ dialog và gán cho ô input
      if (result) {
        this.searchOutputForm
          .get('destinationIdTo')
          ?.patchValue(result.deliveryDestinationId);
      }
    });
  }

  openSupplierIdFromPopup() {
    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: {
        title: 'Search Supplier Dialog',
        url: 'http://localhost:8081/api/supplier/get-all',
        columReturn: 'supplierId, supplierName',
        width: 300,
        height: 550,
        listHeader: [
          {
            titleHeader: 'SupplierID',
            nameColum: 'supplierId',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
          {
            titleHeader: 'SupplierName',
            nameColum: 'supplierName',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
        ],
        listParam: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Lấy giá trị từ dialog và gán cho ô input
      if (result) {
        this.searchOutputForm
          .get('supplierIdFrom')
          ?.patchValue(result.supplierId);
      }
    });
  }

  openSupplierIdToPopup() {
    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: {
        title: 'Search Supplier Dialog',
        url: 'http://localhost:8081/api/supplier/get-all',
        columReturn: 'supplierId, supplierName',
        width: 300,
        height: 550,
        listHeader: [
          {
            titleHeader: 'SupplierID',
            nameColum: 'supplierId',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
          {
            titleHeader: 'SupplierName',
            nameColum: 'supplierName',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
        ],
        listParam: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Lấy giá trị từ dialog và gán cho ô input
      if (result) {
        this.searchOutputForm
          .get('supplierIdTo')
          ?.patchValue(result.supplierId);
      }
    });
  }

  openProductIdFromPopup() {
    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: {
        title: 'Search Product Dialog',
        url: 'http://localhost:8081/api/product/get-all',
        columReturn: 'productId, productName',
        width: 300,
        height: 550,
        listHeader: [
          {
            titleHeader: 'ProductID',
            nameColum: 'productId',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
          {
            titleHeader: 'ProductName',
            nameColum: 'productName',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
        ],
        listParam: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Lấy giá trị từ dialog và gán cho ô input
      if (result) {
        this.searchOutputForm
          .get('productIdFrom')
          ?.patchValue(result.productId);
      }
    });
  }

  openProductIdToPopup() {
    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: {
        title: 'Search Product Dialog',
        url: 'http://localhost:8081/api/product/get-all',
        columReturn: 'productId, productName',
        width: 300,
        height: 550,
        listHeader: [
          {
            titleHeader: 'ProductID',
            nameColum: 'productId',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
          {
            titleHeader: 'ProductName',
            nameColum: 'productName',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
        ],
        listParam: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Lấy giá trị từ dialog và gán cho ô input
      if (result) {
        this.searchOutputForm.get('productIdTo')?.patchValue(result.productId);
      }
    });
  }

  openOwnerIdFromPopup() {
    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: {
        title: 'Search Owner Dialog',
        url: 'http://localhost:8081/api/customer/get-all',
        columReturn: 'customerId, customerName',
        width: 300,
        height: 550,
        listHeader: [
          {
            titleHeader: 'OwnerID',
            nameColum: 'customerId',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
          {
            titleHeader: 'OwnerName',
            nameColum: 'customerName',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
        ],
        listParam: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Lấy giá trị từ dialog và gán cho ô input
      if (result) {
        this.searchOutputForm
          .get('ownerIdFrom')
          ?.patchValue(result.customerId);
      }
    });
  }

  openOwnerIdToPopup() {
    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: {
        title: 'Search Owner Dialog',
        url: 'http://localhost:8081/api/customer/get-all',
        columReturn: 'customerId, customerName',
        width: 300,
        height: 550,
        listHeader: [
          {
            titleHeader: 'OwnerID',
            nameColum: 'customerId',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
          {
            titleHeader: 'OwnerName',
            nameColum: 'customerName',
            width: 100,
            align: 'left',
            sticky: false,
            isHidden: false,
          },
        ],
        listParam: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Lấy giá trị từ dialog và gán cho ô input
      if (result) {
        this.searchOutputForm
          .get('ownerIdTo')
          ?.patchValue(result.customerId);
      }
    });
  }
}
