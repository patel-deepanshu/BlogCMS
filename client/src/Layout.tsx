import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom, { isAdmin } from "./store/userAtom";
import makeRequest from "./hooks/usePrivateAxios";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const ProtectedRoute = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userState, setUser] = useRecoilState(userAtom);
  const getUser = async () => {
    try {
      const { data } = await makeRequest.get("/auth/user");
      console.log(data);
      setUser({ user: data.user, isUser: true });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUser({ user: null, isUser: false });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userState.isUser) {
      getUser();
    }

    return () => {
      if (userState.isUser) {
        setIsLoading(false);
      }
    };
  }, [userState.isUser]);

  return isLoading ? (
    <Spinner />
  ) : userState?.isUser ? (
    children
  ) : (
    <Navigate to={"/admin/auth"} />
  );
};

const AuthLayout = () => {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
};

export default AuthLayout;

export const UnAuthLayout = () => {
  const isAdminPresent = useRecoilValue(isAdmin);
  return (
    <>
      <header>
        <Header isAdmin={isAdminPresent} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </>
  );
};
