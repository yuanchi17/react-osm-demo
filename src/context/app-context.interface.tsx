import { ApiResponse } from '@/ts-common/interface/api-response'

export interface AppState {
  auth: {
    account: string | null
    token: string
  }
}

export type AppActions =
  | { type: 'resetAuth' }
  | { type: 'updateAuth'; payload: { account: string } }
  | { type: 'setAuth'; payload: { account: string; token: string } }

export interface RunApiType {
  <T, K = undefined>({
    method,
    url,
    data,
    params,
    headers,
  }: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    url: string
    data?: K | FormData
    params?: K
    headers?: {
      'Content-Type': 'application/json' | 'multipart/form-data'
    }
  }): Promise<ApiResponse<T>>
}

export interface GetJsonApiType {
  <T>({ url }: { url: string }): Promise<T>
}

export interface GetBlobApiType {
  <T>({ url, params }: { url: string; params?: T }): Promise<Blob>
}

export interface AppContextState extends AppState {
  dispatch: React.Dispatch<AppActions>
  getBlobApi: GetBlobApiType
  getJsonApi: GetJsonApiType
  runApi: RunApiType
}
