/*
 * Todo {
 *    title: "string"
      description: "string"
      completed: boolean
 * }
 */

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://VJ:Wrc9vupTYHoqhPis@cluster0.74fkbrg.mongodb.net/todos",
);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
