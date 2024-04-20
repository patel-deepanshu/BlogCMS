import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/404NotFoundPage";
import UserAuthPage from "./pages/UserAuthPage";
import HomePage from "./pages/HomePage";
import BlogForm from "./pages/BlogForm";
import AuthLayout, { UnAuthLayout } from "./Layout";
import AdminDashboard from "./pages/AdminDashboard";
import SingleBlog from "./pages/SingleBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UnAuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "/admin/auth",
        element: <UserAuthPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AuthLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/add-blog",
        element: <BlogForm />,
      },
      {
        path: "/admin/blog/:id",
        element: <SingleBlog />,
      },
    ],
  },
]);

export default router;
