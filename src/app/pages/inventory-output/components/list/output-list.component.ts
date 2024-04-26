/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component } from '@angular/core';

@Component({
    selector: 'app-output-list',
    templateUrl: './output-list.component.html',
    styleUrls: ['./output-list.component.scss']
})

export class OutputListComponent  {
    searchParam: any;
    
    onSearch(param: any){
        this.searchParam = param;
    }
}