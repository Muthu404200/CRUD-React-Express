import express from "express";
import { getTodo , getid , addTodo , updateTodo , delTodo } from "../controller/User.js";

const route = express.Router();

route.get("/",getTodo)
route.get("/:id",getid)
route.post("/",addTodo)
route.put("/:id",updateTodo)
route.delete("/:id",delTodo)

export default route;