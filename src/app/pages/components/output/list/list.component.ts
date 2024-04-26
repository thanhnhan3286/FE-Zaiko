
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchParamRequest, DataOutputListputModel } from 'src/app/pages/models/output/list.model';
import { OutputListService } from 'src/app/pages/services/output-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataOutputList: DataOutputListputModel[] = [];
  totalPages: number = 0;
  currentPages: number = 0;
  searchCriteria!: SearchParamRequest;
  size = 50;

  constructor(private outputListService: OutputListService) { }

  ngOnInit() {

  }

  eventEmitForm(request: SearchParamRequest) {
    this.currentPages = 0;
    this.outputListService.getOuputListWithFilters(request)
      .subscribe(
        (data: any) => {
          console.log('Data received:', data);
          // Đảm bảo 'content' không phải null hoặc undefined trước khi gán
          if (data && data.content) {
            this.totalPages = data.totalPages;
            this.dataOutputList = data.content;
          } else {
            console.warn('No content found in response');
            this.dataOutputList = [];
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching inventory output:', error);

          // xử lý lỗi theo yêu cầu
          this.handleFetchError(error);
        }
      );
    this.searchCriteria = request
  }

  loadMore() {
    this.currentPages += 1;
    this.searchCriteria.page = this.currentPages; // Cập nhật trang trong request

    this.outputListService.getOuputListWithFilters(this.searchCriteria)
      .subscribe(
        (data: any) => {
          console.log('Data received loadMore:', data);
          if (data && data.content) {
            // Nối dữ liệu mới với dữ liệu hiện tại
            this.dataOutputList = [...this.dataOutputList, ...data.content];
          }
        },
        (error: HttpErrorResponse) => {
          this.handleFetchError(error);
        }
      );
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
}



