import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '@common/utils/utils';
import { Title } from '@layout/models/title.model';
import { Observable, Subscription } from 'rxjs';
import { OutputDetailNumberService } from '../../common/services/output-detail-number.service';
import { Router } from '@angular/router';
import { OutputDetail } from '../../common/models/output-detail.model';
import { ActualService } from './services/actual.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingSpinnerDialogService } from '@layout/services';
import { RepositoryService } from '../../common/services/repository.service';
import { CourseService } from '../../common/services/course.service';
import { RouteService } from '../../common/services/route.service';
import { ProductTypeService } from '../../common/services/product-type.service';
import { CustomerService } from '../../common/services/customer.service';
import { CustomerDestinationService } from '../../common/services/customer-destination.service';
import { ProductService } from '../../common/services/product.service';
import { LocationService } from '../../common/services/location.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { LanguageService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { Repository } from '../../common/models/repository.model';
import { Course } from '../../common/models/course.model';
import { RouteEntity } from '../../common/models/route-entity.model';
import { ProductType } from '../../common/models/product-type.model';
import { createFormGroup } from '../../config/form-group.config';

@Component({
  selector: 'app-actual',
  templateUrl: './actual.component.html',
  styleUrls: ['./actual.component.scss']
})
export class ActualComponent implements OnInit {
  public titleActual!: Title;
  public actualOutput!: OutputDetail;
  // public pageActualOutputDetail: ActualOutputDetail[] = [];

  public utils = Utils;
  public actualOutputForm: FormGroup = new FormGroup({});
  private selectedRecordId!: Observable<number | null>;
  private subscription!: Subscription;
  public listRepo: Repository[] = [];
  public listCourse: Course[] = [];
  public listRoute: RouteEntity[] = [];
  public listProductType: ProductType[] = [];

  constructor(
    private router: Router,
    private ouputDetailNumberService: OutputDetailNumberService,
    private actualService: ActualService,
    private fb: FormBuilder,
    private loadingDialog: LoadingSpinnerDialogService,
    private repoService: RepositoryService,
    private courseService: CourseService,
    private routeService: RouteService,
    private productTypeService: ProductTypeService,
    private customerService: CustomerService,
    private customerDestinationService: CustomerDestinationService,
    private productService: ProductService,
    private locationService: LocationService,
    private dialog: MatDialog,
    private dialogConfirmService: DialogConfirmService,
    private toast: ToastrService,
    private languageService: LanguageService,
  ) { }

  ngOnInit(): void {
    this.initialTitle();
    this.initialForm();
    this.selectedRecordId = this.ouputDetailNumberService.getSelectedRecordId();
    this.subscription = this.selectedRecordId.subscribe((id) => {
      if (id !== null) {
        console.log(id);
        this.getActualOutput(id);
        this.patchValueToForm();
      }
    });
    this.getListProductType();
    this.getListRepository();
    this.getListRoute();
  }
  public initialTitle() {
    this.titleActual = {
      header: '出庫',
      parent: '出庫一覧',
      children: '出庫実績登録',
      service: '0',
    }
  }


  public navigateToOutput() {
    this.ouputDetailNumberService.removeSelectedRecordId();
    this.router.navigate(['/output']);
  }

  public initialForm(): void {
    this.actualOutputForm = this.fb.group({
      infoForm: createFormGroup("infoFormOutputDetail"),
      detailForm: this.fb.array([]),
    });
    this.addDetailGroup();

    const infoFormValue = this.infoForm;
    infoFormValue.get('routeCode')?.valueChanges.subscribe(value => {
      this.getListCourseByRoute(value);
    });
  }
  get detailForm() {
    return this.actualOutputForm.get('detailForm') as FormArray;
  }
  detailFormAtIndex(index: number) {
    return this.detailForm.at(index) as FormGroup;
  }
  get infoForm() {
    return this.actualOutputForm.get('infoForm') as FormGroup
  }
  public createDetailGroup() {
    return createFormGroup("detailFormActualDetail");
  }
  public addDetailGroup() {
    this.detailForm.push(this.createDetailGroup());
  }

  public patchValueToForm() {
    if (this.actualOutput) {
      this.infoForm.patchValue(this.actualOutput);
      console.log(this.actualOutput);

    }
    // if (this.pagePlanOutputDetail.length > 0) {
    //   for (let i = 0; i < this.pagePlanOutputDetail.length - 1; i++) {
    //     this.addDetailGroup();
    //   }
    //   this.detailForm.patchValue(this.pagePlanOutputDetail);
    // }
  }

  public getActualOutput(id: any) {
    this.actualService.getActualOutput(id).subscribe(res => {
      if (res instanceof HttpErrorResponse) {
        console.error('HTTP Error:', res.status, res.message);
        return;
      } else {
        console.log(res.data);
        this.actualOutput = this.formatDate(res.data);
      }
    })
  }
  // public getPagePlanOutputDetail(id: any) {
  //   // this.loadingDialog.showSpinner(true);
  //   this.planDetailService.getPlanOutputDetail(id).subscribe(res => {
  //     if (res instanceof HttpErrorResponse) {
  //       // (res as HttpErrorResponse).status === 400
  //       console.error('HTTP Error:', res.status, res.message);
  //       return;
  //     } else {
  //       // console.log(res.content);
  //       this.pagePlanOutputDetail = res.content;
  //       this.pagePlanOutputDetail.forEach((detail) => {
  //         if (detail.datetimeMngFrom !== null) {
  //           detail.datetimeMngFrom = detail.datetimeMngFrom.replace(/\//g, '-');
  //         }
  //         if (detail.datetimeMngTo !== null) {
  //           detail.datetimeMngTo = detail.datetimeMngTo.replace(/\//g, '-');
  //         }
  //       })
  //     }
  //   })
  // }

  // function thay thế kí tự / thành - trong Date
  public formatDate(jsonData: any): any {
    // Parse JSON thành một đối tượng JavaScript
    const obj = JSON.parse(JSON.stringify(jsonData));
    // Duyệt qua các cặp key:value trong đối tượng
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        // Kiểm tra giá trị (value) của key
        if (key.includes('Date') && value !== null) {
          // Thay thế '/' -> '-'
          obj[key] = value.replace(/\//g, '-');
        }
      }
    }
    return obj as any;
  }

  public getListRepository() {
    this.repoService.getListRepo().subscribe(res => {
      if ((res as HttpErrorResponse).status === 204) {
        console.log("Error: List Repository is Empty!");
        return;
      } else {
        this.listRepo = JSON.parse(JSON.stringify(res)).data;
        return;
      }
    })
  }
  public getListCourseByRoute(code: string) {
    this.courseService.getListCourseByRoute(code).subscribe(res => {
      if (res instanceof HttpErrorResponse) {
        console.log("Error: List Course is Empty!");
        return;
      }
      else {
        this.listCourse = res.data;
        return;
      }
    })
  }
  public getListRoute() {
    this.routeService.getListRoute().subscribe(res => {
      if (res instanceof HttpErrorResponse) {
        console.log("Error: List Route is Empty!");
        return;
      } else {
        this.listRoute = res.data;
        return;
      }
    })
  }
  public getListProductType() {
    this.productTypeService.getListProductType().subscribe(res => {
      if (res instanceof HttpErrorResponse) {
        console.log("Error: List Product Type is Empty!");
        return;
      } else {
        this.listProductType = res.data;
        return;
      }
    })
  }
}
