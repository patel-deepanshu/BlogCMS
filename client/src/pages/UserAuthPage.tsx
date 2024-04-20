import makeRequest from "@/hooks/usePrivateAxios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserAuthPage: FC = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e);
    try {
      const { data } = await makeRequest.post("/auth/user/login", inputs);
      console.log(data);
      toast.success("login successful");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Login error");
    }
  };

  return (
    <div className="flex min-h-screen bg-yellow-100">
      <div className="flex-[5] flex justify-center items-center px-6 py-8 bg-white rounded-lg shadow-md overflow-scroll relative">
        <div className="max-w-lg  ">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Login Into Your Account
            </h2>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="username"
                value={inputs.username}
                placeholder="johndoe"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={inputs.password}
                placeholder="6+ characters strong password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-pink-600 text-white font-bold rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;
