export interface ApiResponse<T> {
  code: 0 | 1
  message: Record<'success' | 'error' | string, string | string[]>
  data?: T
}
