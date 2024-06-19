import { HttpClientResponse } from "@core/models";

export interface inventoryOutputPlanModel {
  inventoryOutputId: number;
  companyId: number;
  planCustomerDeliveryDestinationId: number;
  actualCustomerDeliveryDestinationId: number;
  deliverDestinationName: string;
  postCode: string;
  phoneNumber: string;
  faxNumber: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  routeCode: string;
  courseCode: string;
  planCustomerId: number;
  actualCustomerId: number;
  orderDate: string;
  planOutputDate: string;
  planWorkingDate: string;
  planDeliverDate: string;
  actualOutputDate: string;
  actualDeliverDate: string;
  planSupplierSlipNo: string;
  actualSupplierSlipNo: string;
  createSlipType: string;
  slipNo: string;
  slipNote: string;
  planRepositoryId: number;
  actualRepositoryId: number;
  batchStatus: string;
  outputStatus: string;
  isClosed: string;
  sumPlanQuantity: number;
  sumActualQuantity: number;
  newDestinationName: string;
  checked: string;
  saleCategory: string;
  // 
  departmentName :String;
  customerName :String;
  planSlipNote :String;
  isCustomer :boolean;
}

export interface inventoryPlanOutputDetailModel {
    planDetailId: number;
    companyId: number;
    inventoryOutputId: number;
    productInventoryId: number;
    productId: number;
    repositoryId: number;
    locationId: number;
    datetimeMngFrom: string;
    datetimeMngTo: string;
    numberMngFrom: string;
    numberMngTo: string;
    productOwnerId: number;
    supplierId: number;
    csPlanQuantity: number;
    blPlanQuantity: number;
    psPlanQuantity: number;
    totalPlanQuantity: number;
    inventoryProductType: number;
    detailNote: string;
    planCsPrice: number;
    planBlPrice: number;
    planPiecePrice: number;
    planAmountTotal: number;
    tax: number;
    isBatchInprogress: number;
    batchStatus: string;
    batchNo: string;
    billingPackType: string;
    amountTotal: number;
}


export  interface inventoryPlanData {
  inventoryOutputPlan: inventoryOutputPlanModel
  inventoryPlanOutputDetail: inventoryPlanOutputDetailModel[]
}


export interface CourseModel {
  company_id: Number,
  route_code: String,
  course_code: String,
  course_name: String,
  notes: String
}

export interface RouteModel {

  company_id: Number,

  route_code: String,

  route_name: String,

  notes: String

}
export interface CustomerDeliveryDestModel {
  deliveryDestinationId: number;
  companyId: number;
  customerId: number;
  isCuomer: string;
  destinationCode: string;
  departmentName: string;
  picName: string;
  phoneNumber: string;
  faxNumber: string;
  postCode: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  leadTime: number;
  routeCode: string;
  courseCode: string;
  outputPriorityRank: number;
  freeItem1: string;
  freeItem2: string;
  freeItem3: string;
  notes: string;
}
export interface CustomerModel {
  customerId: number;
  companyId: number;
  customerCode: string;
  customerName: string;
  departmentName: string;
  picName: string;
  phoneNumber: string;
  faxNumber: string;
  postCode: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  bankName: string;
  bankBranchName: string;
  bankAccNumber: string;
  bankAccHolder: string;
  leadTime: number;
  routeCode: string;
  courseCode: string;
  outputPriorityRank: number;
  freeItem1: string;
  freeItem2: string;
  freeItem3: string;
  notes: string;
}
export interface LocationModel{
  locationId: number;
  companyId: number;
  repositoryId: number;
  repositoryCode: string;
  locationCode: string;
  locationName: string;
  isReserveMcarton: string;
  isReserveIcarton: string;
  isReservePiece: string;
  isInputBan: string;
  isOutputBan: string;
  isReserveBan: string;
  roadOrderInventory: string;
  roadOrderPick: string;
  notes: string;
  freeItem1: string;
  freeItem2: string;
  freeItem3: string;
}

export interface ProductModel {
  productId: number;
  companyId: number;
  productCode: string;
  upcCd1: string;
  upcCd2: string;
  name1: string;
  name2: string;
  name3: string;
  name4: string;
  name5: string;
  standardInfo: string;
  categoryCode1: string;
  categoryCode2: string;
  categoryCode3: string;
  categoryCode4: string;
  categoryCode5: string;
  notes: string;
  fifoType: string;
  isDatetimeMng: string;
  datetimeMngType: string;
  isNumberMng: string;
  cartonWeight: number;
  cartonWeightName: string;
  cartonVolume: number;
  cartonVolumeName: string;
  cartonVertical: number;
  cartonHorizontal: number;
  cartonHigh: number;
  pieceWeight: number;
  pieceWeightName: string;
  pieceVolume: number;
  pieceVolumeName: string;
  pieceVertical: number;
  pieceHorizontal: number;
  pieceHigh: number;
  isPackCsInput: string;
  isPackCsOutput: string;
  packCsUnitCode: string;
  packCsUnitName: string;
  packCsAmount: number;
  isPackBlInput: string;
  isPackBlOutput: string;
  packBlUnitCode: string;
  packBlUnitName: string;
  packBlAmount: number;
  isPieceInput: string;
  isPieceOutput: string;
  pieceUnitCode: string;
  pieceUnitName: string;
  repositoryId: number;
  repositoryCode: string;
  locationId: number;
  locationCode: string;
  isReplenishMng: string;
  minInventoryQuantity: number;
  minInputQuantity: number;
  supplierId: number;
  supplierCode: string;
  leadTime: number;
}





export interface HttpClientPlanOutputResponse extends HttpClientResponse {
  data: inventoryOutputPlanModel;
}
export interface HttpClientPlanOutputDetailResponse extends HttpClientResponse {
  data: inventoryPlanOutputDetailModel [];
}
export interface HttpClientCourseResponse extends HttpClientResponse {
  data: CourseModel[]
}
export interface HttpClientRouteResponse extends HttpClientResponse {
  data: RouteModel[]
}
export interface HttpClientLocationRespone extends HttpClientResponse {
  data: LocationModel[]
}
