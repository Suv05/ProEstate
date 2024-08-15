export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  // Handle Mongoose duplicate key error
  if (err.code && err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0]; // Get the field that caused the duplicate key error
    message = `The ${field} '${err.keyValue[field]}' is already in use. Please choose another one.`;
  }

  // Handle Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors).map((el) => el.message);
    message = `Validation Error: ${errors.join(", ")}`;
  }

  res.status(statusCode).json({
    status: "error",
    message: message,
  });
};
