import makeRequest from "@/hooks/usePrivateAxios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
interface BlogContent {
  title: string;
  body: string;
}

interface Blog {
  blogName: string;
  blogImage: string;
  content: BlogContent[];
}

const BlogForm: React.FC = () => {
  const [blog, setBlog] = useState<Blog>({
    blogName: "",
    blogImage: "",
    content: [{ title: "", body: "" }],
  });
  const navigate = useNavigate();
  const handleBlogNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlog((prevBlog) => ({ ...prevBlog, blogName: e.target.value }));
  };

  const handleBlogImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlog((prevBlog) => ({ ...prevBlog, blogImage: e.target.value }));
  };

  const handleContentTitleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedContent = [...blog.content];
    updatedContent[index].title = e.target.value;
    setBlog((prevBlog) => ({ ...prevBlog, content: updatedContent }));
  };

  const handleContentBodyChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedContent = [...blog.content];
    updatedContent[index].body = e.target.value;
    setBlog((prevBlog) => ({ ...prevBlog, content: updatedContent }));
  };

  const addContent = () => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: [...prevBlog.content, { title: "", body: "" }],
    }));
  };

  const removeContent = (index: number) => {
    const updatedContent = [...blog.content];
    updatedContent.splice(index, 1);
    setBlog((prevBlog) => ({ ...prevBlog, content: updatedContent }));
  };

  const onSubmitBlog = async (e: any) => {
    e.preventDefault();
    console.log(blog);
    try {
      const { data } = await makeRequest.post("/user/blog/create", {
        myBlog: blog,
      });
      toast.success(data.msg);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="bg-green-300 py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form className="space-y-4" onSubmit={onSubmitBlog}>
        <div>
          <label htmlFor="blogName" className="block font-medium text-gray-700">
            Blog Name
          </label>
          <input
            type="text"
            id="blogName"
            value={blog.blogName}
            onChange={handleBlogNameChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="blogImage"
            className="block font-medium text-gray-700"
          >
            Blog Image
          </label>
          <input
            type="text"
            id="blogImage"
            value={blog.blogImage}
            onChange={handleBlogImageChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Content</h3>
          {blog.content.map((content, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-sm mt-4">
              <div className="mb-4">
                <label
                  htmlFor={`content-title-${index}`}
                  className="block font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id={`content-title-${index}`}
                  value={content.title}
                  onChange={(e) => handleContentTitleChange(index, e)}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor={`content-body-${index}`}
                  className="block font-medium text-gray-700"
                >
                  Body
                </label>
                {/* <ReactQuill
                  id={`content-body-${index}`}
                  value={content.body}
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  onChange={(e: any) => handleContentBodyChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                /> */}
                <textarea
                  id={`content-body-${index}`}
                  value={content.body}
                  onChange={(e) => handleContentBodyChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeContent(index)}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addContent}
            className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Add Content
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

// var formats = [
//   "header",
//   "height",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "color",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "align",
//   "size",
// ];
// var modules = {
//   toolbar: [
//     [{ size: ["small", false, "large", "huge"] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//       { align: [] },
//     ],
//     [
//       {
//         color: [
//           "#000000",
//           "#e60000",
//           "#ff9900",
//           "#ffff00",
//           "#008a00",
//           "#0066cc",
//           "#9933ff",
//           "#ffffff",
//           "#facccc",
//           "#ffebcc",
//           "#ffffcc",
//           "#cce8cc",
//           "#cce0f5",
//           "#ebd6ff",
//           "#bbbbbb",
//           "#f06666",
//           "#ffc266",
//           "#ffff66",
//           "#66b966",
//           "#66a3e0",
//           "#c285ff",
//           "#888888",
//           "#a10000",
//           "#b26b00",
//           "#b2b200",
//           "#006100",
//           "#0047b2",
//           "#6b24b2",
//           "#444444",
//           "#5c0000",
//           "#663d00",
//           "#666600",
//           "#003700",
//           "#002966",
//           "#3d1466",
//           "custom-color",
//         ],
//       },
//     ],
//   ],
// };
