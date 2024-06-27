import { HttpClientResponse } from "@core/models";

export interface ProductType {
    code: string;
    value1: string;
    value2: string;
}
export interface HttpProductTypeResponse extends HttpClientResponse {
    data: ProductType[];
}
