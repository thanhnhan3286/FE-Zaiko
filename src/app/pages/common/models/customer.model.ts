import { HttpClientResponse } from "@core/models";

export interface Customer {
    customerId: number;
    customerCode: string;
    customerName: string;
    departmentName: string;
    picName: string;
    leadTime: number;
    companyId: number;
    phoneNumber: string;
    faxNumber: string;
    postCode: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    routeCode: string;
    courseCode: string;
}
export interface HttpCustomerResponse extends HttpClientResponse {
    data: Customer;
}
