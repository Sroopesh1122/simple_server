const errorHandler = async (err, req, res, next) => {
  res.json({
    message: err?.message,
  });
};
module.exports = { errorHandler };
