module.exports = async (req, res, next) => {
  // if the logged in user is a trainee then reject request
  if (req.payload.type === "trainee") {
    return res.status(401).json({
      errorMessage: "You should be logged in as a trainer to make this request",
    });
  }
  next();
};
