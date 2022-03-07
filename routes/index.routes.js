const router = require("express").Router();
const authRoutes = require("./auth.routes");
const queriesRoutes = require("./queries.routes");
const trainersRoutes = require("./trainers.routes");
const conversationsRoutes = require("./conversations.routes");
const { isAuthenticated } = require("../middleware/jwt.middleware");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.use("/queries", isAuthenticated, queriesRoutes);

router.use("/conversations", isAuthenticated, conversationsRoutes);

router.use("/trainers", isAuthenticated, trainersRoutes);

module.exports = router;
