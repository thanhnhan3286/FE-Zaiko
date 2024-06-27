import { HttpClientResponse, HttpClientResponseList } from "@core/models";

export interface Location {
    locationId: number;
    locationCode: string;
    locationName: string;
    repositoryId: number;
    repositoryCode: string;
    notes: string;
}
export interface HttpLocationResponse extends HttpClientResponse {
    data: Location[];
}