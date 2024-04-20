import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import UserModel from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";

export const CreateBlog = async (req, res) => {
  const { myBlog } = req.body;

  const user = await UserModel.findById(req.user.userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  user.myBlogs.push(myBlog);
  await user.save();

  res.status(StatusCodes.CREATED).json({ msg: "Blog created successfully" });
};

export const UpdateBlog = async (req, res) => {
  const { myBlog } = req.body;

  if (!req.query.blogId || !myBlog) {
    throw new BadRequestError("Please provide all required fields");
  }

  const user = await UserModel.findById(req.user.userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const blogIndex = user.myBlogs.findIndex(
    (blog) => blog._id.toString() === req.query.blogId
  );

  if (blogIndex === -1) {
    throw new NotFoundError("Blog not found");
  }

  user.myBlogs[blogIndex] = { ...user.myBlogs[blogIndex], ...myBlog };
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Blog updated successfully" });
};
export const DeleteBlog = async (req, res) => {
  const { blogId } = req.query;

  if (!blogId) {
    throw new BadRequestError("Please provide the blog ID");
  }

  const user = await UserModel.findById(req.user.userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const blogIndex = user.myBlogs.findIndex(
    (blog) => blog._id.toString() === blogId
  );

  if (blogIndex === -1) {
    throw new NotFoundError("Blog not found");
  }

  user.myBlogs.splice(blogIndex, 1);

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Blog deleted successfully" });
};

export const GetBlog = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findOne();

  if (!user) {
    throw new NotFoundError("User not found");
  }
  const blogIndex = user.myBlogs.findIndex(
    (blog) => blog._id.toString() === id
  );
  if (blogIndex == -1) {
    throw new NotFoundError("Blog not found");
  }

  res.status(StatusCodes.OK).json({ blog: user.myBlogs[blogIndex] });
};
export const GetBlogs = async (req, res) => {
  const user = await UserModel.findOne();

  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({ blogs: user.myBlogs });
};
