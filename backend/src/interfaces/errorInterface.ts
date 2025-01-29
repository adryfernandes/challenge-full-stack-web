export interface Error {
  message: string;
  statusCode: number;
  trace?: string;
  stack?: string;
}
