const express = require("express");
const jwt = require("jsonwebtoken");
import { createTodo } from "./types.js";
import { updateTodo } from "./types.js";

const app = express();
app.use(express.json());

app.post("/todo", (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      message: "You send the wrong inputs!!!",
    });
  }
});

app.get("/todos", (req, res) => {});

app.put("/completed", (req, res) => {
  const createPayload = req.body;
  const parsedPayload = updateTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      message: "You send the wrong id!!!",
    });
  }
});
