import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {  SearchParams, SearchParamRequest, RepositoryModel } from 'src/app/pages/models/output/list.model';
import { format } from 'date-fns';
import { OutputListService } from 'src/app/pages/services/output-list.service';

@Component({
  selector: 'form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {
  
  @Output() formSubmitEvent = new EventEmitter<SearchParamRequest>(); 
  public searchForm: FormGroup = new FormGroup({});
  public repositories: RepositoryModel[]=[];

  constructor(private fb: FormBuilder,private outputListService: OutputListService) {}

  ngOnInit() {
    this.getAllRepositories()
    this.initialForm()
  }

  /**
   * Lọc các tiêu chí hợp lệ, đảm bảo giá trị không phải là nulll hoặc undefed,
   * 
   */
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

  /**
   * Xử lý sự kiện khi form được gửi, đảm bảo các tiêu chí hợp lệ trước khi phát sự kiện.
   */


  onFormSubmit() {
    
      const criteria = this.searchForm.value; // Lấy dữ liệu từ form
      console.log("searchForm.value ",criteria)

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
      console.log("validCriteria ",params)
      this.formSubmitEvent.emit(params as SearchParamRequest);
    
  }


  private initialForm(): void {
    this.searchForm = this.fb.group({
      page: new FormControl(null) ,
      size: new FormControl(null),
      repositoryIdFrom: new FormControl(null), 
      repositoryIdTo: new FormControl(null),
      orderDateFrom: new FormControl(null),
      orderDateTo: new FormControl(null),
      planOutputDateFrom: new FormControl(null),
      planOutputDateTo: new FormControl(null),
      planWorkingDateTo: new FormControl(null),
      planWorkingDateFrom: new FormControl(null),
      planDeliverDateFrom: new FormControl(null),
      planDeliverDateTo: new FormControl(null),
      slipNoFrom: new FormControl(null),
      slipNoTo: new FormControl(null),
      productIdFrom: new FormControl(null),
      productIdTo: new FormControl(null),
      batchNo: new FormControl(null),
      productName: new FormControl(null),
      deliveryDestinationIdForm: new FormControl(null),
      deliveryDestinationIdTo: new FormControl(null),
      departmentName: new FormControl(null),
      supplierIdFrom: new FormControl(null),
      supplierIdTo: new FormControl(null),
      supplierName: new FormControl(null),
      customerIdFrom: new FormControl(null),
      customerIdTo: new FormControl(null),
      customerName: new FormControl(null),
      DeliveryType: new FormControl("0"),
      DeliveryStatus: new FormControl("0"),
      isClosed: new FormControl("2")
    });

    
  }
  
  getAllRepositories() {
    this.outputListService.getAllRepository().subscribe(
      (res: any) => {
        console.log('Data received:', res);
        if (res) {
          this.repositories = res;
        } else {
          console.warn('Response does not contain valid data');
          this.repositories = []; 
        }
      },
      (error) => {
        console.error('Error fetching repositories:', error);
        this.repositories = []; 
      }
    );
  }
  
}
