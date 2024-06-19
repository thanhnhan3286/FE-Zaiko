import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router ,NavigationEnd } from '@angular/router';
import { format } from 'date-fns';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {
  public currentDate: string; // Ngày hiện tại
  public isFormVisible: boolean = true;
  public isDropdown: boolean = true;
  @Output() toggleSearchForm = new EventEmitter<boolean>(); 

  constructor(private router: Router) {  const today = new Date();
    this.currentDate = format(today, 'yyyy/MM/dd');
  }
  @Input() pageTitles: string[]=[];
  public userName: string = 'VanHai';


  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if(event.url === '.../output/plan'){
        this.isDropdown=false;
      }
    });
  }

onToggleForm() {
    this.isFormVisible = !this.isFormVisible; 
    this.toggleSearchForm.emit(this.isFormVisible); 
  }

}
