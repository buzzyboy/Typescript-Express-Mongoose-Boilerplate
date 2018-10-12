export class ServiceResponse<T> {
    data: T;
    statusCode: number;
    error: any;

    constructor(data: T, statusCode: number = 200, error: any = null) {
        this.data = data;
        this.statusCode = statusCode;
        this.error = error;
    }

    static createErrorResponse(statusCode: number = 400, error: any) {
        const serviceResponse = new ServiceResponse(null, statusCode, error);
        return serviceResponse;
    }

    isSuccess() {
        return this.statusCode >= 200 && this.statusCode < 300;
    }
}
