export class ApiResponse {
  status: number;
  message?: string;
  responseData: unknown;

  constructor(status: number, responseData: unknown, message?: string) {
    this.status = status;
    this.responseData = responseData;
    this.message = message;
  }
}
