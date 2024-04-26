import { HttpClienRequest, HttpClientResponse } from "@core/models";


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
  repositoryId: number;
  companyId: number; 
  repositoryCode?: string; 
  repositoryName?: string; 
  phoneNumber1?: string; 
  faxNumber1?: string; 
  postCode1?: string; 
  address1_1?: string; 
  address1_2?: string;
  address1_3?: string; 
  address1_4?: string; 
  phoneNumber2?: string;
  faxNumber2?: string; 
  postCode2?: string; 
  address2_1?: string; 
  address2_2?: string; 
  address2_3?: string; 
  address2_4?: string; 
  notes?: string; 
  freeItem1?: string; 
  freeItem2?: string;
  freeItem3?: string; 
}



 

export interface SearchParams {
  [key: string]: any;  // Chữ ký chỉ mục cho phép truy cập bằng chuỗi
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
  productIdFrom?: string;//
  productIdTo?: string;
  batchNo?: string;//
  productName?: string;
  deliveryDestinationIdForm?: number;//
  deliveryDestinationIdTo?: number;
  departmentName?: string;//
  supplierIdFrom?: number;//
  supplierIdTo?: number;
  supplierName?: string;
  customerIdFrom?: number;///
  customerIdTo?: number;
  customerName?: string;///
  DeliveryType?: string;
  DeliveryStatus?: string;
  isClosed?: string;
}


export interface SearchParamRequest extends HttpClienRequest {
  data: SearchParams;
}


 export interface  HttpClienOutputListputResponse extends HttpClientResponse {
   data: DataOutputListputModel;
 }
 export interface HttpClienRepositorytResponse extends HttpClientResponse {
  data: RepositoryModel;
}