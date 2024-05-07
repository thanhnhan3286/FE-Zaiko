/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/naming-convention */

import { HttpClientResponse } from '@core/models';


export interface OutputSearchModelRequest{
    f_orderDate: string;
    t_orderDate: string;
    f_planOutputDate: string;
    t_planOutputDate: string;
    f_planWorkingDate: string;
    t_planWorkingDate: string;
    f_planDeliverDate: string;
    t_planDeliverDate: string;
    f_slipNo: string;
    t_slipNo: string;
    f_customerId: number;
    t_customerId: number;
    customerName: string;
    f_deliverDestId: number;
    t_deliverDestId: number;
    deliveryDestName: string;
    f_supplierId: number;
    t_supplierId: number;
    supplierName: string;
    f_productId: number;
    t_productId: number;
    productName: string;
    f_repositoryId: string;
    t_repositoryId: string;
    batchNo: string;
    deliveryType: number;
    deliveryStatus: string;
    is_closed: string;
}

export interface HttpClientOutputListResponse extends HttpClientResponse {
    data: OutputListModel;
}

export interface OutputListModel{
    inventoryOutputId: number;
    isClosed: string;
    outputStatus: string;
    slipNumber: string;
    deliveryType: string;
    batchStatus: string;
    orderDate: string;
    planOutputDate: string;
    actualOutputDate: string;
    planPackingDay: string;
    actualPackingDay: string;
    planDeliverDate: string;
    actualDeliverDate: string;
    planDeliveryDestCode: string;
    planDeliveryDestName: string;
    actualDeliveryDestCode: string;
    actualDeliveryDestName: string;
    planShippingDestCode: string;
    planShippingDestName: string;
    actualShippingDestCode: string;
    actualShippingDestName: string;
    planRepoCode: string;
    planRepoName: string;
    actualRepoCode: string;
    actualRepoName: string;
    planSupplierSlipNo: string;
    actualSupplierSlipNo: string;
    sumPlanQuantity: string;
    sumActualQuantity: string;
}

export class DisplayFormInputModel{
    fromCustomerCode: string = '';
    toCustomerCode: string = '';

    fromDestinationCode: string = '';
    toDestinationCode: string = '';

    fromSupplierCode: string = '';
    toSupplierCode: string = '';

    fromOwnerCode: string = '';
    toOwnerCode: string = '';

    fromProductCode: string = '';
    toProductCode: string = '';
}