import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OutputListService } from '../../service/output-list.service';
import { OutputModel, OutputResponse } from '../../model/output-list';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  outputId!: number;
  dataResult: OutputModel = new OutputModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private outputListService: OutputListService,
    protected Http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      let id = paramMap.get('id');
      if (id) {
        this.outputId = +id;
      }
    });
    this.getOutputById(this.outputId);
    console.log(this.outputId);
    
    
  }

  getOutputById(id: number) {
    this.outputListService.getOutputById(id).subscribe((res: any) => {
      console.log(res);
      if (res !== undefined && res !== null) {
        res.orderDate = res.orderDate.replace(/\//g, "-");
        res.planOutputDate = res.planOutputDate.replace(/\//g, "-");
        res.planWorkingDate = res.planWorkingDate.replace(/\//g, "-");
        res.planDeliverDate = res.planDeliverDate.replace(/\//g, "-");
        
        this.dataResult = res;
        console.log(this.dataResult);
        
      }
    });
  }
}
