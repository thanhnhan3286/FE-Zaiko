import {
  HttpClienRequest,
  HttpClientResponse,
} from '../../../core/models/http-response.model';

export class OutputModel {
  inventoryOutputId!: number;
  isClosed!: string;
  outputStatus!: string;
  slipNo!: string;
  planOutputDate!: string;
  orderDate!: string;
  // batchStatus!: string;
  planWorkingDate!: string;
  planDeliverDate!: string;
  destinationCode!: string;
  departmentName!: string;
  customerCode!: string;
  customerName!: string;
  repositoryId!: number;
  repositoryCode!: string;
  repositoryName!: string;
  slipNote!: string;
  planSupplierSlipNo!: string;
  sumPlanQuantity!: number;
  sumActualQuantity!: number;
  leadTime!: string;
  createSlipType!: string;
  routeCode!: string;
  routeName!: string;
  courseCode!: string;
  phoneNumber!: string;
  faxNumber!: string;
  postCode!: string;
  address1!: string;
  address2!: string;
  address3!: string;
  address4!: string;
}
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

export interface OutputResponse extends HttpClientResponse {
  data: OutputModel;
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
  destinationCodeFrom: number;
  destinationCodeTo: number;
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

export interface RouteModel {
  routeCode: string;
  routeName: string;
}

export interface RouteResponse extends HttpClientResponse {
  data: RouteModel[];
}

export interface CourseModel {
  courseCode: string;
  courseName: string;
}

export interface CourseResponse extends HttpClientResponse {
  data: CourseModel[];
}

export class PlanOutputDetailListModel {
  inventoryOutputId!: number;
  planDetailId!: number;
  batchStatus!: string;
  batchNo!: string;
  productId!: number;
  productCode!: string;
  standardInfo!: string;
  datetimeMngFrom!: string;
  datetimeMngTo!: string;
  numberMngFrom!: string;
  numberMngTo!: string;
  customerCode!: string;
  customerName!: string;
  departmentName!: string;
  repositoryId!: number;
  repositoryCode!: string;
  repositoryName!: string;
  locationId!: number;
  locationCode!: string;
  locationName!: string;
  inventoryProductType!: string;
  billingPackType!: string;
  totalPlanQuantity!: number;
  planAmountTotal!: number;
}

export interface PlanOutputDetailListResponse extends HttpClientResponse {
  data: PlanOutputDetailListModel[];
}
