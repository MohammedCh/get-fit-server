const router = require("express").Router();
const authRoutes = require("./auth.routes");
const queryRoutes = require("./query.routes");
const trainerAuthRoutes = require("./trainerAuth.routes");
const trainerRoutes = require("./trainer.routes");


/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.use("/query", queryRoutes);

router.use("/trainer/auth", trainerAuthRoutes);

router.use("/trainer", trainerRoutes);

module.exports = router;
