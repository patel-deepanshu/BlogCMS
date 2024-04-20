import makeRequest from "@/hooks/usePrivateAxios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Blog {
  _id: string;
  blogName: string;
  blogImage: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Fetch blogs from the server
    const fetchBlogs = async () => {
      try {
        const { data } = await makeRequest.get("/user/blog/get");
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <Link to="/admin/dashboard" className="text-xl font-bold">
              Admin Dashboard
            </Link>
          </div>
          <div>
            <Link
              to="/admin/add-blog"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Blog
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogs.map((blog) => (
            <Link
              to={`/admin/blog/${blog._id}`}
              key={blog._id}
              className="bg-white shadow-md rounded-md overflow-hidden"
            >
              <img
                src={blog.blogImage}
                alt={blog.blogName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{blog.blogName}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Created at: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
