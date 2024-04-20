import {
  CreateBlog,
  DeleteBlog,
  GetBlog,
  GetBlogs,
  UpdateBlog,
} from "../controllers/blogController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

import express from "express";
import { validateBlogInput } from "../validations/userInputValidation.js";
const userBlogRoutes = express.Router();

userBlogRoutes.post("/create", validateBlogInput, authenticateUser, CreateBlog);
userBlogRoutes.put("/update", validateBlogInput, authenticateUser, UpdateBlog);
userBlogRoutes.delete("/delete", authenticateUser, DeleteBlog);
userBlogRoutes.get("/get", GetBlogs);
userBlogRoutes.get("/get/:id", GetBlog);

export default userBlogRoutes;
