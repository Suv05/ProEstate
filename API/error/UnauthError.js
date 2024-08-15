import AppError from "./AppError.js";

class UnauthError extends AppError{
  constructor(message = "Invalid Candidentals", statusCode = 401) {
    super(message, statusCode);
  }
}

export default UnauthError;
