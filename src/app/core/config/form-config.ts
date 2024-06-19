import { FormControl } from '@angular/forms';
import { Utils } from '@common/utils/utils';

export const formOutputList = {
  page: new FormControl(null),
  size: new FormControl(null),
  repositoryIdFrom: new FormControl(null,[Utils.checkFromValueNumber('repositoryIdTo')]),
  repositoryIdTo: new FormControl(null,[Utils.checkToValueNumber('repositoryIdFrom')]),
  orderDateFrom: new FormControl(null, [Utils.checkFromDate('orderDateTo')]),
  orderDateTo: new FormControl(null, [Utils.checkToDate('orderDateFrom')]),
  planOutputDateFrom: new FormControl(null, [Utils.checkFromDate("planOutputDateTo")]),
  planOutputDateTo: new FormControl(null, [Utils.checkToDate("planOutputDateFrom")]),
  planWorkingDateFrom: new FormControl(null,[Utils.checkFromDate("planWorkingDateTo")]),
  planWorkingDateTo: new FormControl(null, [Utils.checkToDate("planWorkingDateFrom")]),
  // planDeliverDateFrom: new FormControl(null, [this.dateValidator("planDeliverDateFrom")]),
  // planDeliverDateTo: new FormControl(null, [this.dateValidator("planDeliverDateTo")]),
  slipNoFrom: new FormControl(null, [Utils.checkFromValueNumber('slipNoTo')]),
  slipNoTo: new FormControl(null, [Utils.checkToValueNumber('slipNoFrom')]),
  productCodeFrom: new FormControl(null, [Utils.checkFromValue('supplierCodeTo')]),
  productCodeTo: new FormControl(null, [Utils.checkToValue('productCodeFrom')]),
  batchNo: new FormControl(null),
  productName: new FormControl(null),
  destinationCodeFrom: new FormControl(null,[Utils.checkFromValue('destinationCodeTo')]),
  destinationCodeTo: new FormControl(null,[Utils.checkToValue('destinationCodeFrom')]),
  departmentName: new FormControl(null),
  supplierCodeFrom: new FormControl(null,[Utils.checkFromValue('supplierCodeTo')]),
  supplierCodeTo: new FormControl(null,[Utils.checkToValue('supplierCodeFrom')]),
  supplierName: new FormControl(null),
  customerCodeFrom: new FormControl(null,[Utils.checkFromValue('customerCodeTo')]),
  customerCodeTo: new FormControl(null,[Utils.checkToValue('customerCodeFrom')]),
  customerName: new FormControl(null),
  // ownerCodeForm: new FormControl(null,[this.codeValidator("ownerCodeForm")]),
  // ownerCodeTo: new FormControl(null,[this.codeValidator("ownerCodeTo")]),
  DeliveryType: new FormControl("0"),
  DeliveryStatus: new FormControl("0"),
  isClosed: new FormControl("2")
};

export const formPlanOutput = {
  inventoryOutputId: new FormControl(null),
  orderDate:new FormControl(null),
  planWorkingDate:new FormControl(null),
  planOutputDate:new FormControl(null),
  planDeliverDate:new FormControl(null),
  createSlipType: new FormControl(null),
  slipNo: new FormControl(null),
  planSupplierSlipNo: new FormControl(null),
  planCustomerDeliveryDestinationId: new FormControl(null),
  outputStatus: new FormControl(null),
  isClosed: new FormControl(null),
  departmentName: new FormControl(null),
  planCustomerId: new FormControl(null),
  customerName: new FormControl(null),
  slipNote: new FormControl(null),
  planRepositoryId: new FormControl(null),
  saleCategory: new FormControl(null),
  routeCode: new FormControl(null),
  courseCode: new FormControl(null),
  faxNumber: new FormControl(null),
  postCode: new FormControl(null),
  address1: new FormControl(null),
  address2: new FormControl(null),
  address3: new FormControl(null),
  address4: new FormControl(null)
};




