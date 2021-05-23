export interface ResGateway<T> {
  code: number;
  content: T;
  message?: string;
  success: boolean;
}
