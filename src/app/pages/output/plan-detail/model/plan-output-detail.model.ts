import { HttpClientResponse, HttpClientResponseList } from "@core/models";
import { OutputDetail } from "src/app/pages/common/models/output-detail.model";

export interface PlanOutputDetail {
    companyId: number;
    planDetailId: number;
    inventoryOutputId: number;
    batchStatus: string;
    batchNo: string;
    productId: number;
    datetimeMngType: string;
    datetimeMngFrom: string;
    datetimeMngTo: string;
    isNumberMng: string;
    numberMngFrom: string;
    numberMngTo: string;
    productOwnerId: number;
    repositoryId: string;
    locationId: number;
    inventoryProductType: string;
    billingPackType: string;
    csPlanQuantity: number,
    blPlanQuantity: number,
    psPlanQuantity: number,
    packCsAmount: number,
    packBlAmount: number,
    totalPlanQuantity: number,
    totalActualQuantity: number,
    planCsPrice: number,
    planBlPrice: number,
    planPiecePrice: number,
    amountTotal: number,
    productCode: string;
    productName: string;
    standardInfo: string;
    customerCode: string;
    customerName: string;
    departmentName: string;
    saleCategory: string;
    delFlg: string;
}
export interface HttpPlanOutputDetailResponse extends HttpClientResponseList {
    content: PlanOutputDetail[];
}
export interface PlanOutputForm {
    infoForm: OutputDetail;
    detailForm: PlanOutputDetail[];
}