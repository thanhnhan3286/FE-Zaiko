import { HttpClientResponse, HttpClienRequest } from "@core/models";

export class InputListModel {
  inventoryInputId!: number;
  isClosed!: string;
  inputStatus!: string;
  slipNo!: string;
  inputPlanDate!: string;
  inputActualDate!: string;
  planDestinationCode!: string;
  actualDestinationCode!: string;
  planDepartmentName!: string;
  actualDepartmentName!: string;
  planSlipNote!: string;
  supplierCode!: string;
  supplierName!: string;
  customerCode!: string;
  customerName!: string;
  planRepositoryCode!: string;
  planRepositoryName!: string;
  actualRepositoryCode!: string;
  actualRepositoryName!: string;
  planSupplierSlipNo!: string;
  actualSupplierSlipNo!: string;
  sumPlanQuantity!: number;
  sumActualQuantity!: number;
}

export interface InputListResponse extends HttpClientResponse {
  data: InputListModel;
}

export interface SearchCriteriaModel {
  page: number;
  inputPlanDateFrom: string;
  inputPlanDateTo: string;
  inputActualDateFrom: string;
  inputActualDateTo: string;
  slipNoFrom: number;
  slipNoTo: number;
  productOwnerIdFrom: number;
  productOwnerIdTo: number;
  destinationIdFrom: number;
  destinationIdTo: number;
  departmentName: string;
  supplierIdFrom: number;
  supplierIdTo: number;
  supplierName: string;
  customerIdFrom: number;
  customerIdTo: number;
  customerName: string;
  productIdFrom: number;
  productIdTo: number;
  productName: string;
  repositoryIdFrom: number;
  repositoryIdTo: number;
  receiptType: string;
  receiptStatus: string;
  isClosed: string;
}

export interface SearchCriteriaRequest extends HttpClienRequest {
  [key: string]: any;
  data: SearchCriteriaModel;
}
