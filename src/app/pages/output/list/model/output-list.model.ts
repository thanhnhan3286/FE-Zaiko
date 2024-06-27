import { HttpClientResponse, HttpClientResponseList } from "@core/models";

export class OutputList {
    inventoryOutputId !: number;
    isClosed!: string;
    outputStatus!: string;
    slipNo!: string;
    planOutputDate!: string;
    batchStatus!: string;
    orderDate!: string;
    actualOutputDate!: string;
    planWorkingDate!: string;
    planDeliveryDate!: string;
    actualDeliveryDate!: string;
    destinationCodePlan!: string;
    departmentNamePlan!: string;
    destinationCodeActual!: string;
    departmentNameActual!: string;
    customerCodePlan!: string;
    customerNamePlan!: string;
    customerCodeActual!: string;
    customerNameActual!: string;
    repositoryCodePlan!: string;
    repositoryNamePlan!: string;
    repositoryCodeActual!: string;
    repositoryNameActual!: string;
    planSupplierSlipNo!: string;
    actualSupplierSlipNo!: string;
    sumPlanQuantity!: number;
    sumActualQuantity!: number;
}

export interface HttpOutputListResponse extends HttpClientResponse {
    // totalPages: number,
    // totalElements: number,
    // pageSize: number,
    // pageNumber: number,
    data: OutputList[]

}

export interface OuputModelRequest {
    orderDateFrom: string;
    orderDateTo: string;
    planOutputDateFrom: string;
    planOutputDateTo: string;
    planWorkingDateFrom: string;
    planWorkingDateTo: string;
    planDeliveryDateFrom: string;
    planDeliveryDateTo: string;
    slipNoFrom: string;
    slipNoTo: string;
    customerCodeFrom: string;
    customerCodeTo: string;
    customerName: string;
    deliveryCodeFrom: string;
    deliveryCodeTo: string;
    deliveryName: string;
    supplierCodeFrom: string;
    supplierCodeTo: string;
    supplierName: string;
    ownerCodeFrom: string;
    ownerCodeTo: string;
    ownerName: string;
    productIdFrom: string;
    productIdTo: string;
    productName: string;
    repoFrom: string;
    repoTo: string;
    batchNo: string;
    deliveryType: string;
    deliveryStatus: string;
    isClose: string;
}
// export interface HttpOutputListResponse extends HttpClientResponse {
//     data: OutputList;
// }
export class OuputSearch {
    orderDateFrom?: string;
    orderDateTo?: string;
    planOutputDateFrom?: string;
    planOutputDateTo?: string;
    planWorkingDateFrom?: string;
    planWorkingDateTo?: string;
    planDeliveryDateFrom?: string;
    planDeliveryDateTo?: string;
    slipNoFrom?: string;
    slipNoTo?: string;
    customerCodeFrom?: string;
    customerCodeTo?: string;
    customerName?: string;
    deliveryCodeFrom?: string;
    deliveryCodeTo?: string;
    deliveryName?: string;
    supplierCodeFrom?: string;
    supplierCodeTo?: string;
    supplierName?: string;
    ownerCodeFrom?: string;
    ownerCodeTo?: string;
    ownerName?: string;
    productCodeFrom?: string;
    productCodeTo?: string;
    productName?: string;
    repoFrom?: string;
    repoTo?: string;
    batchNo?: string;
    deliveryType?: string;
    deliveryStatus?: string;
    isClose?: string;
    page?: number;
}