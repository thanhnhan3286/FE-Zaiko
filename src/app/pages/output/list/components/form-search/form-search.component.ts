import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Repository } from 'src/app/pages/common/models/repository.model';
import { RepositoryService } from 'src/app/pages/common/services/repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeachApiComponent } from '@common/components/dialog-seach-api/dialog-search-api.component';
import { DialogOptionApiConfig } from 'src/app/pages/config/dialog-option-api.config';
import { createFormGroup } from 'src/app/pages/config/form-group.config';
import { OuputSearch } from '../../model/output-list.model';
import { Utils } from '@common/utils/utils';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss'],

})
export class FormSearchComponent implements OnInit {
  @Input() popupSearchForm!: string;
  @Output() dataSearch: EventEmitter<OuputSearch> = new EventEmitter<OuputSearch>();

  public formSearch: FormGroup = new FormGroup({})
  public listRepo: Repository[] = [];
  public utils = Utils;
  public showSearchForm: string = '0';

  constructor(
    private fb: FormBuilder,
    private repositoryService: RepositoryService,
    private dialog: MatDialog,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['popupSearchForm'] && changes['popupSearchForm'].currentValue) {
      // console.log("form", this.popupSearchForm);
      this.showSearchForm = this.popupSearchForm;
    }
  }


  ngOnInit(): void {
    this.getListRepository();
    this.initialForm();
    // console.log("invalidFrom: ", this.formSearch.invalid, !this.formSearch.touched);
  }


  // function xóa bỏ các thành phần có giá trị null và thay thế kí tự - thành / trong Date
  public removeNullValues(jsonData: OuputSearch): OuputSearch {
    // Parse JSON thành một đối tượng JavaScript
    const obj = JSON.parse(JSON.stringify(jsonData));
    // Duyệt qua các cặp key:value trong đối tượng
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        // Kiểm tra giá trị (value) của key
        if (value === null) {
          // Loại bỏ cặp key:value nếu value là null
          delete obj[key];
          continue;
        } else if (key.includes('Date')) {
          // Thay thế '-' -> '/'
          obj[key] = value.replace(/-/g, '/');
        }
      }
    }
    return obj as OuputSearch;
  }

  private initialForm(): void {
    this.formSearch = createFormGroup('formSearchOutput');
  }

  public submitFormSearch(): void {
    const data = this.removeNullValues(this.formSearch.value);
    this.dataSearch.emit(data);
  }

  public resetFormSearch(): void {
    this.initialForm();
    this.submitFormSearch();
  }
  public getListRepository() {
    this.repositoryService.getListRepo().subscribe(res => {
      if ((res as HttpErrorResponse).status === 204) {
        console.log("Error: List Repository is Empty!");
        return;
      } else {
        this.listRepo = JSON.parse(JSON.stringify(res)).data;
        return;
      }
    })
  }

  public openPopUp(option: string): void {
    let data: any;
    switch (true) {
      case option.includes('customerCode'):
        data = DialogOptionApiConfig.customerCode;
        break;
      case option.includes('deliveryCode'):
        data = DialogOptionApiConfig.destinationCode;
        break;
      case option.includes('supplierCode'):
        data = DialogOptionApiConfig.supplierCode;
        break;
      case option.includes('ownerCode'):
        data = DialogOptionApiConfig.customerCode;
        break;
      case option.includes('productCode'):
        data = DialogOptionApiConfig.productCode;
        break;
      default:
        console.log("Dialog fail");
        break;
    }
    if (option && data) {
      const popupPro = this.dialog.open(DialogSeachApiComponent, { data });
      popupPro.afterClosed().subscribe(item => {
        if (item) {
          if (this.formSearch) {
            this.formSearch.get(option)?.setValue(item[data.columReturn]);
          }
        }
      })
    }
  }
}