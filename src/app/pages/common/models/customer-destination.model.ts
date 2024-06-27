import { HttpClientResponse } from "@core/models";

export interface CustomerDestination {
    deliveryDestinationId: number;
    destinationCode: string;
    departmentName: string;
    phoneNumber: string;
    faxNumber: string;
    postCode: string;
    routeCode: string;
    courseCode: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    companyId: number;
    customerId: number;
    isCustomer: string;
}
export interface HttpCustomerDestinationResponse extends HttpClientResponse {
    data: CustomerDestination
}
