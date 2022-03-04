const router = require("express").Router();
const authRoutes = require("./auth.routes");
const queriesRoutes = require("./queries.routes");
const trainersRoutes = require("./trainers.routes");


/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.use("/queries", queriesRoutes);

router.use("/trainers", trainersRoutes);

module.exports = router;
