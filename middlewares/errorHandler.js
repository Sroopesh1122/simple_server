const errorHandler = async (err, req, res, next) => {
  res.statusCode= res.statusCode == 200 ? 500 :200;
  res.json({
    message: err?.message,
  });
};
module.exports = { errorHandler };
