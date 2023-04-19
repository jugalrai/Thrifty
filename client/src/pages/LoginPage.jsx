import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/login", { email, password });
      setRedirect(true);
      setUser(data);
      toast.success("Login successful");      
    } catch (error) {
      toast.error("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around min-h-screen">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 font-mono">Login</h1>
        <form className="space-y-6 w-56" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark ml-16">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black font-sans" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginPage;
