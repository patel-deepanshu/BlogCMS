import makeRequest from "@/hooks/usePrivateAxios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateBlog from "./UpdateBlog";
import { toastError, toastSuccess } from "@/utils/toast";
import { useRecoilValue } from "recoil";
import userAtom from "@/store/userAtom";

interface BlogContent {
  title: string;
  body: string;
  image?: string;
}

interface Blog {
  _id: string;
  blogName: string;
  blogImage: string;
  createdAt: string;
  content: BlogContent[];
}

const SingleBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const isAdmin = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await makeRequest.get(`/user/blog/get/${id}`);
        setBlog(data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const deleteBlog = async (blogId: string) => {
    try {
      const { data } = await makeRequest.delete(
        `/user/blog/delete?blogId=${blogId}`
      );
      toastSuccess(data.msg);
      navigate("/admin");
    } catch (error) {
      toastError(error);
    }
  };

  const handleUpdate = async (blog: Blog) => {
    console.log(blog);
    try {
      const { data } = await makeRequest.put(
        `/user/blog/update?blogId=${blog._id}`,
        { myBlog: blog }
      );
      toastSuccess("Blog Updated");
      setIsEdit(false);
      console.log(data);
    } catch (error) {
      toastError(error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return isEdit ? (
    <UpdateBlog blog={blog} onUpdate={handleUpdate} setIsEdit={setIsEdit} />
  ) : (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {isAdmin.isUser && (
          <div className=" absolute top-5 right-10 flex justify-end space-x-2">
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteBlog(blog._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        )}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={blog.blogImage}
            alt={blog.blogName}
            className="w-full h-64 object-contain"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{blog.blogName}</h1>
            <p className="text-gray-500 text-sm mb-4">
              Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            {blog.content.map((content, index) => (
              <div key={index} className="mb-8">
                {content.image && (
                  <img
                    src={content.image}
                    alt={content.title}
                    className="w-full h-64 object-contain mb-4"
                  />
                )}
                <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
                <div
                  className="prose prose-lg"
                  dangerouslySetInnerHTML={{ __html: content.body }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
