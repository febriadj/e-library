module.exports = ({
  success = true,
  res,
  message = null,
  data = null,
  statusCode = 200,
}) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
}
