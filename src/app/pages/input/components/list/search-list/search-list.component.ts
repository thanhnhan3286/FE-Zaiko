import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeachApiComponent } from '@common/components/dialog-seach-api/dialog-search-api.component';
import { DialogOptionApi } from '@common/models/dialog-seach-api/dialog-search-api.model';
import { RepositoryResponse } from 'src/app/pages/output/model/repositoryDto';
import { RepositoryService } from 'src/app/pages/output/service/repository.service';
import { SearchCriteriaRequest } from '../../../model/input-list';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  repositoryList!: RepositoryResponse;
  @Output() public search: EventEmitter<SearchCriteriaRequest> =
    new EventEmitter<SearchCriteriaRequest>();
  data: DialogOptionApi = new DialogOptionApi();

  onSubmit() {
    const searchCriteria = this.searchInputForm.value;
    this.search.emit(searchCriteria as SearchCriteriaRequest);
  }

  searchInputForm = new FormGroup({
    inputPlanDateFrom: new FormControl(''),
    inputPlanDateTo: new FormControl(''),
    inputActualDateFrom: new FormControl(''),
    inputActualDateTo: new FormControl(''),
    slipNoFrom: new FormControl(''),
    slipNoTo: new FormControl(''),
    productOwnerIdFrom: new FormControl(''),
    productOwnerIdTo: new FormControl(''),
    
    destinationIdFrom: new FormControl(''),
    destinationIdTo: new FormControl(''),
    departmentName: new FormControl(''),
    supplierIdFrom: new FormControl(''),
    supplierIdTo: new FormControl(''),
    supplierName: new FormControl(''),
    customerIdFrom: new FormControl(''),
    customerIdTo: new FormControl(''),
    customerName: new FormControl(''),
    productIdFrom: new FormControl(''),
    productIdTo: new FormControl(''),
    productName: new FormControl(''),
    repositoryIdFrom: new FormControl(''),
    repositoryIdTo: new FormControl(''),
    receiptType: new FormControl('0'),
    receiptStatus: new FormControl('0'),
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

  openSearchDialog(fieldName: string) {
    let resultField = '';
    let dataModel = {
      title: '',
      url: '',
      columReturn: '',
      width: 300,
      height: 550,
      listHeader: [
        {
          titleHeader: '',
          nameColum: '',
          width: 100,
          align: 'left',
          sticky: false,
          isHidden: false,
        },
        {
          titleHeader: '',
          nameColum: '',
          width: 100,
          align: 'left',
          sticky: false,
          isHidden: false,
        },
      ],
      listParam: [],
    };

    switch (fieldName) {
      case 'customerIdFrom':
      case 'customerIdTo':
        dataModel.title = 'Search Customer Dialog';
        dataModel.url = 'http://localhost:8081/api/customer/get-all';
        dataModel.columReturn = 'customerId, customerName';
        dataModel.listHeader[0].titleHeader = 'CustomerID';
        dataModel.listHeader[0].nameColum = 'customerId';
        dataModel.listHeader[1].titleHeader = 'CustomerName';
        dataModel.listHeader[1].nameColum = 'customerName';
        break;
      case 'destinationIdFrom':
      case 'destinationIdTo':
        dataModel.title = 'Search Destination Dialog';
        dataModel.url =
          'http://localhost:8081/api/customer-delivery-dest/get-all';
        dataModel.columReturn = 'deliveryDestinationId, departmentName';
        dataModel.listHeader[0].titleHeader = 'DestinationID';
        dataModel.listHeader[0].nameColum = 'deliveryDestinationId';
        dataModel.listHeader[1].titleHeader = 'DestinationName';
        dataModel.listHeader[1].nameColum = 'departmentName';
        break;
      case 'supplierIdFrom':
      case 'supplierIdTo':
        dataModel.title = 'Search Supplier Dialog';
        dataModel.url = 'http://localhost:8081/api/supplier/get-all';
        dataModel.columReturn = 'supplierId, supplierName';
        dataModel.listHeader[0].titleHeader = 'SupplierID';
        dataModel.listHeader[0].nameColum = 'supplierId';
        dataModel.listHeader[1].titleHeader = 'SupplierName';
        dataModel.listHeader[1].nameColum = 'supplierName';
        break;
      case 'productIdFrom':
      case 'productIdTo':
        dataModel.title = 'Search Product Dialog';
        dataModel.url = 'http://localhost:8081/api/product/get-all';
        dataModel.columReturn = 'productId, productName';
        dataModel.listHeader[0].titleHeader = 'ProductID';
        dataModel.listHeader[0].nameColum = 'productId';
        dataModel.listHeader[1].titleHeader = 'ProductName';
        dataModel.listHeader[1].nameColum = 'productName';
        break;
      default:
        break;
    }
    resultField = dataModel.listHeader[0].nameColum;

    const dialogRef = this.dialog.open(DialogSeachApiComponent, {
      data: { ...dataModel },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.searchInputForm.get(fieldName)?.patchValue(result[resultField]);
      }
    });
  }

}
