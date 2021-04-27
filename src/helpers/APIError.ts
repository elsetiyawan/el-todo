interface ErrProp {
  message: string;
  status?: number;
  errors?: any;
}

class APIError extends Error {
  message: string;
  status: number;
  errors: any;
  constructor({ message, status = 500, errors = [] }: ErrProp) {
    super(message);
    this.message = message;
    this.status = status;
    this.errors = errors;
  }
}

export default APIError;
