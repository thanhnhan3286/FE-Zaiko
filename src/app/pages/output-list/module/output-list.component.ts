import { Component, OnInit } from '@angular/core';
import { IconService } from '@core/services/icon/icon.service';

@Component({
  selector: 'app-output-list',
  templateUrl: './output-list.component.html',
  styleUrls: ['./output-list.component.scss']
})
export class OutputListComponent implements OnInit {

  constructor(
    private icon: IconService,
  ) { }

  ngOnInit(): void {
    this.icon.init();
  }

}
