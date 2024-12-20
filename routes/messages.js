var express = require("express");
var router = express.Router();
var messagesModel = require("../models/messagesModel");

router.get("/getAllMessages", async function (req, res, next) {
  const messages = await messagesModel.listMessages().then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Success",
      data: result,
    });
  });
});

router.post("/createMessage", function (req, res, next) {
  messagesModel
    .create(req.body)
    .then((result) => {
      res.status(200).json({
        message: "Success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Error",
        data: error,
      });
    });
});
module.exports = router;
