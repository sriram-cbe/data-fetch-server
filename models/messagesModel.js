const mongoose = require("mongoose");
const { response } = require("../app");
const Schema = mongoose.Schema;

const messagingSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

const messagingModel = mongoose.model("messages", messagingSchema);

function model() {
  return messagingModel;
}

function create(params) {
  return model().create(params);
}

function listMessages(fromId, text) {
  return new Promise((resolve, reject) => {
    model()
      .find({})
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  model,
  create,
  listMessages,
};
