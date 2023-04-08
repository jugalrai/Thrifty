import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import AccountNav from "./AccountNav";
import ProductPages from "./ProductPages";

const Account = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "product" && <ProductPages />}
    </div>
  );
};

export default Account;
