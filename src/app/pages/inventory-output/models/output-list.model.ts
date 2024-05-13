/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/naming-convention */

import { HttpClientResponse } from '@core/models';


export interface OutputListModel{
    [key: string] : any;
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

export interface HttpClientOutputListResponse extends HttpClientResponse {
    data: OutputListModel[];
}

export interface OutputListSearchModel{
        fromOrderDate: string;
        toOrderDate: string;
        fromPlanOutputDate: string;
        toPlanOutputDate: string;
        fromPlanWokingDate: string;
        toPlanWokingDate: string;
        fromPlanDeliveDate: string;
        toPlanDeliveDate: string;
        fromSlipNo: string;
        toSlipNo: string;
        fromCustomerCode: string;
        toCustomerCode: string;
        customerName: string;
        fromDeliverDestCode: string;
        toDeliverDestCode: string;
        dileveDestName: string;
        fromSupplierCode: string;
        toSupplierCode: string;
        supplierName: string;
        fromOwnerCode: string;
        toOwnerCode: string;
        ownerName: string;
        fromProductCode: string;
        toProductCode: string;
        productName: string;
        fromRepositoryId: string;
        toRepositoryId: string;
        batchNumber: string;
        deliveType: string;
        deliveStatus: string;
        isClosed: string;
        page:number
}

// export class DisplayFormInputModel{
//     fromCustomerCode: string = '';
//     toCustomerCode: string = '';

//     fromDestinationCode: string = '';
//     toDestinationCode: string = '';

//     fromSupplierCode: string = '';
//     toSupplierCode: string = '';

//     fromOwnerCode: string = '';
//     toOwnerCode: string = '';

//     fromProductCode: string = '';
//     toProductCode: string = '';
// }