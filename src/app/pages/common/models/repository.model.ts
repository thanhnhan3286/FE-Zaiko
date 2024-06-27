import { HttpClientResponse } from "@core/models";

export class Repository {
    repositoryId !: number;
    repositoryCode !: string;
    repositoryName !: string;
}
export interface HttpRepositoryResponse extends HttpClientResponse {
    data: Repository[];
}
export interface HttpRepositoryResponseOne extends HttpClientResponse {
    data: Repository;
}
