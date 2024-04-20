import axios from "axios";

const usePrivateAxios = () => {
  const makeRequest = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return makeRequest;
};

const makeRequest = usePrivateAxios();
export default makeRequest;
