/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component } from '@angular/core';
import { OutputListSearchModel } from '../../models/output-list.model';

@Component({
    selector: 'app-output-list',
    templateUrl: './output-list.component.html',
    styleUrls: ['./output-list.component.scss']
})

export class OutputListComponent  {
    public searchParam!: OutputListSearchModel;
    public isHeaderUp!: boolean;
    
    public onSearch(param: OutputListSearchModel){
        this.searchParam = param;
    }

    public headerUp(key: boolean){
        this.isHeaderUp = key;
    }
}