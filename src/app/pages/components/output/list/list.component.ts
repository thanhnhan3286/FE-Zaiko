
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingSpinnerDialogService } from '@layout/services';
import { DataSearchModel, SearchParams, TableEvent } from 'src/app/pages/models/output/list.model';
import { OutputListService } from 'src/app/pages/services/output-list.service';
import { OutputPlanService } from 'src/app/pages/services/output-plan.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSearchModel: DataSearchModel = new DataSearchModel;
  search!: SearchParams;
  public isSearchFormVisible: boolean = true;

  constructor(private router: Router, private outputListService: OutputListService, private outputPlanService: OutputPlanService, private loadingDialog: LoadingSpinnerDialogService) { }
  ngOnInit() {

  }

  eventEmitForm(request: SearchParams) {
    this.search = request;
    this.loadingDialog.showSpinner(true);
    this.outputListService.getOuputListWithFilters(request).subscribe(
      (res) => {
        if (res instanceof HttpErrorResponse) {
          console.error('Error:', res);
          this.handleFetchError(res);
        } else {
          console.log('Data:', res.content);
          this.dataSearchModel.results = res.content;
          this.dataSearchModel.totalPage = res.totalPages;
          this.dataSearchModel.totalRecords = res.totalElements;
        }
        console.log('dataSearchModel:', this.dataSearchModel);

        this.loadingDialog.showSpinner(false);
      },
    );
  }

  handleTableEvent(event: TableEvent) {
    console.log("Event received:", event); // Kiểm tra sự kiện nhận được
    switch (event.action) {
      case 'loadMore':
        this.handleLoadNextPage();
        break;

      case 'plan':
        this.handlePlanButton(event.payload!);
        break;

      case 'actual':
        break;

      case 'correction':
        break;

      default:
        console.warn("Unknown action:", event.action);
    }
  }

  handleLoadNextPage() {
    console.log("search", this.search)
    this.search.page = 0;
    this.dataSearchModel.currentPage += 1;
    this.search.page = this.dataSearchModel.currentPage; // Cập nhật trang trong request
    this.loadingDialog.showSpinner(true);
    this.outputListService.getOuputListWithFilters(this.search)
      .subscribe(
        (res) => {
          if (res instanceof HttpErrorResponse) {
            this.handleFetchError(res);
          }
          else {
            this.dataSearchModel.results = [...this.dataSearchModel.results, ...res.content];
          }
        }
      );
    this.loadingDialog.showSpinner(false);
  }
  handlePlanButton(id: number) {
    sessionStorage.setItem('inventoryOutputId', id.toString());
    this.router.navigate(['/delivery/inventory-output-plan']);
  }


  private handleFetchError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.warn('Data not found');
    } else if (error.status === 500) {
      console.error('Server error occurred');
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
  }
  onToggleSearchForm(isFormVisible: boolean) {
    this.isSearchFormVisible = isFormVisible;
  }
  screenTitles: string[] = ['出庫', '出庫一覧'];

}



