import { HttpClientResponse, MetaModel } from '@core/models';

export interface HttpClientRepositoryResponse extends HttpClientResponse {
    data: RepositoryModel;
    errors: object[];
    meta: MetaModel;
}

export interface RepositoryModel{
    repositoryId: number;
    repositoryCode: string;
    repositoryName: string;
}