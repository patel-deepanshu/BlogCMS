import { body } from "express-validator";
import { withValidationErrors } from "./allErrorMessages.js";

export const validateLoginInput = withValidationErrors([
  body("username").notEmpty().withMessage("Please enter your Username"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateBlogInput = withValidationErrors([
  body("myBlog.blogName")
    .notEmpty()
    .withMessage("Please enter the blog name")
    .isLength({ max: 100 })
    .withMessage("Blog name is too long"),
  body("myBlog.blogImage")
    .notEmpty()
    .withMessage("Please provide the blog image")
    .isLength({ max: 255 })
    .withMessage("Blog image URL is too long")
    .isURL()
    .withMessage("Invalid URL format for blog image"),
  body("myBlog.content")
    .isArray({ min: 1 })
    .withMessage("At least one content item is required")
    .custom((value, { req }) => {
      for (const content of value) {
        if (!content.title || !content.body) {
          throw new Error("Content item must have title and body");
        }
      }
      return true;
    })
    .withMessage("Content items must have title and body"),
  body("myBlog.content.*.title")
    .notEmpty()
    .withMessage("Content title is required")
    .isLength({ max: 100 })
    .withMessage("Content title is too long"),
  body("myBlog.content.*.body")
    .notEmpty()
    .withMessage("Content body is required"),
]);
