import {
  HttpClienRequest,
  HttpClientResponse,
} from '../../../core/models/http-response.model';
export class OutputListModel {
  inventoryOutputId!: number;
  isClosed!: string;
  outputStatus!: string;
  slipNo!: string;
  planOutputDate!: string;
  orderDate!: string;
  batchStatus!: string;
  actualOutputDate!: string;
  planWorkingDate!: string;
  planDeliverDate!: string;
  actualDeliverDate!: string;
  destinationCode!: string;
  departmentName!: string;
  customerCode!: string;
  customerName!: string;
  repositoryCode!: string;
  repositoryName!: string;
  planSupplierSlipNo!: string;
  actualSupplierSlipNo!: string;
  sumPlanQuantity!: number;
  sumActualQuantity!: number;
}

export interface OutputListResponse extends HttpClientResponse {
  data: OutputListModel;
}

export interface SearchCriteriaModel {
  
  page: number;
  orderDateFrom: string;
  orderDateTo: string;
  planOutputDateFrom: string;
  planOutputDateTo: string;
  planWorkingDayFrom: string;
  planWorkingDayTo: string;
  planDeliverDateFrom: string;
  planDeliverDateTo: string;
  slipNoFrom: number;
  slipNoTo: number;
  customerIdFrom: number;
  customerIdTo: number;
  customerName: string;
  destinationIdFrom: number;
  destinationIdTo: number;
  departmentName: string;
  supplierIdFrom: number;
  supplierIdTo: number;
  supplierName: string;
  ownerIdFrom: number;
  ownerIdTo: number;
  ownerName: string;
  productIdFrom: number;
  productIdTo: number;
  productName: string;
  repositoryIdFrom: number;
  repositoryIdTo: number;
  batchNo: string;
  deliveryType: string;
  deliveryStatus: string;
  isClosed: string;
}

export interface SearchCriteriaRequest extends HttpClienRequest {
  [key: string]: any;
  data: SearchCriteriaModel;
}
