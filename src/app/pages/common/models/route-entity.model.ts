import { HttpClientResponse } from "@core/models";

export interface RouteEntity {
    companyId: number;
    routeCode: string;
    routeName: string;
}
export interface HttpRouteResponse extends HttpClientResponse {
    data: RouteEntity[];
}
