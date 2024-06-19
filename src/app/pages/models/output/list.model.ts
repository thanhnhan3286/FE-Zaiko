import { HttpClienRequest, HttpClientResponse, HttpClientResponseList } from "@core/models";


export interface DataOutputListputModel {
    inventoryOutputId?: number;
    closed?: string;
    outputStatus?: string;
    slipNo?: string;
    supplierCode?: string;
    planOutputDate?: string;
    batchStatus?: string;
    orderDate?: string;
    actualOutputDate?: string;
    planWorkingDate?: string;
    planDeliverDate?: string;
    actualDeliverDate?: string;
    deliveryDestinationCode?: string;
    deliveryDestinationId?: number;
    departmentName?: string;
    customerCode?: string;
    customerName?: string;
    repositoryCode?: string;
    repositoryName?: string;
    planSupplierSlipNo?: string;
    actualSupplierSlipNo?: string;
    sumPlanQuantity?: number;
    sumActualQuantity?: number;
    delFlg: string;
    createBy: string;
}  
export interface RepositoryModel {
  repository_id: number;
  company_id: number; 
  repositoryCode?: string; 
  repositoryName?: string; 
  phone_number1?: string; 
  fax_number1?: string; 
  post_code1?: string; 
  address1_1?: string; 
  address1_2?: string;
  address1_3?: string; 
  address1_4?: string; 
  phone_number2?: string;
}
export interface DataModel {
  length: number,
  currentPage: number,
  noRecordInPage: number,
  results: DataOutputListputModel[],
  totalPage: number,
  totalRecords: number,
  countRecords: number,
}
export class DataSearchModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: DataOutputListputModel[] = [],
    public totalPage: number = 0,
    public totalRecords: number = 0,
    public countRecords: number = 0
  ) { }
}

export interface SearchParams {
  [key: string]: any;  
  // keyWord: string;
  page: number ;
  size: number;
  repositoryIdFrom?: number; //
  repositoryIdTo?: number;
  orderDateFrom?: string;//
  orderDateTo?: string;
  planOutputDateFrom?: string;//
  planOutputDateTo?: string;
  planWorkingDateTo?: string;
  planWorkingDateFrom?: string;//
  planDeliverDateFrom?: string;//
  planDeliverDateTo?: string;
  slipNoFrom?: string;//
  slipNoTo?: string;
  productCodeFrom?: string;//
  productCodeTo?: string;
  batchNo?: string;//
  productName?: string;
  destinationCodeFrom?: number;//
  destinationCodeTo?: number;
  departmentName?: string;//
  supplierCodeFrom?: number;//
  supplierCodeTo?: number;
  supplierName?: string;
  customerCodeFrom?: number;///
  customerCodeTo?: number;
  customerName?: string;///
  DeliveryType?: string;
  DeliveryStatus?: string;
  isClosed?: string;
}


export interface SearchParamRequest extends HttpClienRequest {
  data: SearchParams;
}


 export interface  HttpClienOutputListputResponse extends HttpClientResponseList {
  content: DataOutputListputModel[];
  pageNumber:number;
  pageSize:number;
  totalElements:number;
  totalPages:number;
 }
 
 export interface HttpClienRepositorytResponse extends HttpClientResponse {
  data: RepositoryModel[];
}

export interface TableEvent {
  action: 'loadMore' | 'plan' | 'actual' | 'correction'; 
  payload?: number; 
}