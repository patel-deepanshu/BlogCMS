import Spinner from "@/components/Spinner";
import makeRequest from "@/hooks/usePrivateAxios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Blog {
  _id: string;
  blogName: string;
  blogImage: string;
  createdAt: string;
}

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch blogs from the server
    const fetchBlogs = async () => {
      try {
        const { data } = await makeRequest.get("/user/blog/get");
        setBlogs(data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <Spinner />
          ) : (
            blogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="bg-white shadow-md rounded-md overflow-hidden"
              >
                <img
                  src={blog.blogImage}
                  alt={blog.blogName}
                  className="w-full h-40 object-contain"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{blog.blogName}</h2>
                  <p className="text-gray-500 text-sm mb-4">
                    Created at: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
