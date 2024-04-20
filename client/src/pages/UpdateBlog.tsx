import React, { useState, useEffect } from "react";

interface BlogContent {
  title: string;
  body: string;
}

interface Blog {
  _id: string;
  blogName: string;
  blogImage: string;
  createdAt: string;
  content: BlogContent[];
}

interface UpdateBlogProps {
  blog: Blog;
  onUpdate: (blog: Blog) => void;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateBlog: React.FC<UpdateBlogProps> = ({
  blog,
  onUpdate,
  setIsEdit,
}) => {
  const [updatedBlog, setUpdatedBlog] = useState<Blog>(blog);

  useEffect(() => {
    setUpdatedBlog(blog);
  }, [blog]);

  const handleBlogImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedBlog((prevBlog) => ({ ...prevBlog, blogImage: e.target.value }));
  };

  const handleContentTitleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedContent = [...updatedBlog.content];
    updatedContent[index].title = e.target.value;
    setUpdatedBlog((prevBlog) => ({ ...prevBlog, content: updatedContent }));
  };

  const handleContentBodyChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedContent = [...updatedBlog.content];
    updatedContent[index].body = e.target.value;
    setUpdatedBlog((prevBlog) => ({ ...prevBlog, content: updatedContent }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedBlog);
  };

  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Update Blog</h2>
      <button
        className="absolute top-5 right-5 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setIsEdit(false)}
      >
        Go Back
      </button>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="blogName" className="block font-medium text-gray-700">
            Blog Name
          </label>
          <input
            type="text"
            id="blogName"
            value={updatedBlog.blogName}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            value={updatedBlog.blogImage}
            onChange={handleBlogImageChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Content</h3>
          {updatedBlog.content.map((content, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-sm">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor={`content-body-${index}`}
                  className="block font-medium text-gray-700"
                >
                  Body
                </label>
                <textarea
                  id={`content-body-${index}`}
                  value={content.body}
                  onChange={(e) => handleContentBodyChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
