import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RepositoryService } from '../../service/repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  OutputListModel,
  SearchCriteriaModel,
  SearchCriteriaRequest,
} from '../../model/output-list';
import { RepositoryResponse } from '../../model/repositoryDto';

@Component({
  selector: 'app-search-output-list',
  templateUrl: './search-output-list.component.html',
  styleUrls: ['./search-output-list.component.scss'],
})
export class SearchOutputListComponent implements OnInit {
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

  constructor(private repositoryService: RepositoryService) {}

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
}
