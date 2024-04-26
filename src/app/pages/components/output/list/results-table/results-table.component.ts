import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DataOutputListputModel } from 'src/app/pages/models/output/list.model';

@Component({
  selector: 'results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnChanges {
  @Input() data: DataOutputListputModel[] = []; // dữ liệu lấy từ cha
  @Input() currentPage: number = 0; 
  @Input() totalPage: number = 0; 
  isHeightLimited = true; // Thuộc tính kiểm soát giới hạn chiều cao
  @Output() loadMoreEvent = new EventEmitter<void>(); // Sự kiện để phát tín hiệu tải thêm


  content: DataOutputListputModel[] = []; // dữ liệu hiện thì

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.content = [...this.data]; // Đảm bảo `content` chứa dữ liệu mới nhất
    }
  }

  triggerLoadMore() {
    this.isHeightLimited = false; 
    this.loadMoreEvent.emit(); // Gọi sự kiện để báo cha tải thêm
  }
}
