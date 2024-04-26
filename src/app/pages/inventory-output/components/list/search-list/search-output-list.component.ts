/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-output-list',
  templateUrl: './search-output-list.component.html',
  styleUrls: ['./search-output-list.component.scss']
})
export class SearchOutputListComponent implements OnInit{

  searchForm!: FormGroup;

  @Output() conditionsSearch = new EventEmitter<any>();

  public constructor(private fb: FormBuilder) {

    }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      f_orderDate: '',
      t_orderDate: '',
      f_planOutputDate: '',
      t_planOutputDate: '',
      f_planWokingDate: '',
      t_planWokingDate: '',
      f_planDeliveDate: '',
      t_planDeliveDate: '',
      f_slipNo: '',
      t_slipNo: '',
      f_cusomerCode: '',
      t_customerCode: '',
      customerName: '',
      f_deliveDestCode: '',
      t_deliveDestCode: '',
      dileveDestName: '',
      f_supplierCode: '',
      t_supplierCode: '',
      supplierName: '',
      f_ownerCode: '',
      t_ownerCode: '',
      ownerName: '',
      f_productCode: '',
      t_productCode: '',
      productName: '',
      f_repository: '',
      t_repository: '',
      batchNumber: '',
      delive_type: '1',
      delive_status: '1',
      is_closed: ''
    });
  }

  getConditionsSearch(){
    const conditions = this.searchForm.value;
    
    Object.keys(conditions).forEach(key => {
      if(key.toLowerCase().includes('Date'.toLowerCase())){
        conditions[key] = this.formatDate(conditions[key]);
      }
    });

    this.conditionsSearch.emit(conditions);
  }

  formatDate(date: string): string{
    if(!date){
      return '';
    }

    return date.replace(/-/g, '/');
  }

}
