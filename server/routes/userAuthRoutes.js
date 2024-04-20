import {
  GetUser,
  Login,
  Logout,
  Register,
} from "../controllers/userAuthController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { validateLoginInput } from "../validations/userInputValidation.js";

import express from "express";

const userAuthRouter = express.Router();

userAuthRouter.post("/login", validateLoginInput, Login);
userAuthRouter.post("/register", Register);
userAuthRouter.get("/", authenticateUser, GetUser);
userAuthRouter.get("/logout", Logout);

export default userAuthRouter;
