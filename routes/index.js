const router = require("express").Router();

router.use("/todo", require("./todo"));
router.use("/user", require("./user"));

module.exports = router;
