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
  productName!: string;
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
  csPlanQuantity!: number;
  blPlanQuantity!: number;
  psPlanQuantity!: number;
  totalPlanQuantity!: number;
  planAmountTotal!: number;
  planCsPrice!: number;
  planBlPrice!: number;
  planPiecePrice!: number;
}

export interface PlanOutputDetailListResponse extends HttpClientResponse {
  data: PlanOutputDetailListModel[];
}

export class CustomerInfoModel {
  destinationCode!: string;
  departmentName!: string;
  customerCode!: string;
  customerName!: string;
  leadTime!: string;
  routeCode!: string;
  courseCode!: string;
  phoneNumber!: string;
  faxNumber!: string;
  postCode!: string;
  address1!: string;
  address2!: string;
  address3!: string;
  address4!: string;
}

export interface CustomerInfoResponse extends HttpClientResponse {
  data: CustomerInfoModel;
}

export class CustomerDestModel {
  postCode!: string;
  address1!: string;
  address2!: string;
  address3!: string;
  address4!: string;
}

export interface CustomerDestResponse extends HttpClientResponse {
  data: CustomerDestModel;
}

export class ProductInfoModel {
  productCode!: string;
  productName!: string;
  standardInfo!: string;
  datetimeMngType!: string;
  isDatetimeMng!: string;
  isNumberMng!: string;
  isPackCsOutput!: string;
  isPackBlOutput!: string;
  isPieceOutput!: string;
  packCsAmount!: number;
  packBlAmount!: number;
  packCsPrice!: number;
  packBlPrice!: number;
  piecePrice!: number;
}

export interface ProductInfoResponse extends HttpClientResponse {
  data: ProductInfoModel;
}

export interface LocationModel {
  locationId: number;
  locationCode: string;
}

export interface LocationResponse extends HttpClientResponse {
  data: LocationModel[];
}

export interface CommonSettingModel {
  value1: string;
  value2: string;
}

export interface CommonSettingResponse extends HttpClientResponse {
  data: CommonSettingModel[];
}

export class OutputPlanModel {
  orderDate!: string;
  planOutputDate!: string;
  planWorkingDate!: string;
  planDeliverDate!: string;
  createSlipType!: string;
  slipNo!: string;
  planSupplierSlipNo!: string;
  slipNote!: string;
  destinationCode!: string;
  departmentName!: string;
  destinationOption!: boolean;
  customerCode!: string;
  customerName!: string;
  repositoryId!: number;
  routeCode!: string;
  courseCode!: string;
  postCode!: string;
  faxNumber!: string;
  phoneNumber!: string;
  address1!: string;
  address2!: string;
  address3!: string;
  address4!: string;
}

export interface OutputPlanResponse extends HttpClientResponse {
  data: OutputPlanModel;
}

export class OutputDetailModel {
  productCode!: string;
  productName!: string;
  datetimeMngType!: string;
  datetimeMngFrom!: string;
  datetimeMngTo!: string;
  repositoryId!: number;
  billingPackType!: string;
  standardInfo!: string;
  numberMngFrom!: string;
  numberMngTo!: string;
  locationId!: number;
  csPlanQuantity!: number;
  blPlanQuantity!: number;
  psPlanQuantity!: number;
  customerCode!: string;
  customerName!: string;
  inventoryProductType!: string;
  totalPlanQuantity!: number;
}

export interface OutputDetailResponse extends HttpClientResponse {
  data: OutputDetailModel[];
}

export class InventoryOutputData {
  outputPlan!: OutputPlanModel;
  detailList!: OutputDetailModel[];
}

export class InventoryOutput {
  inventoryOutputId!: number;
}
