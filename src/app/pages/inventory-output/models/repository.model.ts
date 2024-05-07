import { HttpClientResponse } from '@core/models';

export interface HttpClientRepositoryResponse extends HttpClientResponse {
    data: RepositoryModel;
}

export interface RepositoryModel{
    repositoryId: number;
    repositoryCode: string;
    repositoryName: string;
}