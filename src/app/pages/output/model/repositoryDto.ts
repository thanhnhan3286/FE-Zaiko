import { HttpClientResponse } from '@core/models';

export interface RepositoryModel {
  repositoryId: number;
  repositoryCode: string;
  repositoryName: string;
}

export interface RepositoryResponse extends HttpClientResponse {
  data: RepositoryModel[];
}
