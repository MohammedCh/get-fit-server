module.exports = async (req, res, next) => {
  // if the logged in user is a trainer then reject request
  if (req.payload.type === "trainer") {
    return res.status(401).json({
      errorMessage: "You should be logged in as a trainee to make this request",
    });
  }
  next();
};
