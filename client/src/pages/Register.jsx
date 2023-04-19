import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);


  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      setRedirect(true);
      toast.success("Registration completed. Now you can log in.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
    catch (error) {
      toast.error("Registration failed. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
    if (redirect) {
      return <Navigate to={"/login"} />;
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around min-h-screen ">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 font-mono">Register</h1>
        <form className="space-y-6 w-56" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="ml-16 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black font-sans" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
