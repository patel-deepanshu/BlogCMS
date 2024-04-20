import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, default: process.env.MY_USERNAME },
  password: { type: String, default: process.env.MY_PASSWORD },
  myBlogs: [
    {
      blogName: { type: String, required: true },
      blogImage: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      content: [
        {
          title: { type: String, required: true },
          body: { type: String, required: true },
        },
      ],
    },
  ],
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
