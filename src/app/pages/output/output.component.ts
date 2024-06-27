import { Component, OnInit } from '@angular/core';
import { IconService } from '@core/services/icon/icon.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  constructor(
    private icon: IconService,
  ) { }

  ngOnInit(): void {
    this.icon.init();
  }

}
