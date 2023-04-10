import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("/product").then((response) => {
      setProduct(response.data);
    });
  }, []);

  return (
    <div className="mt-10 mb-10 gap-x-1 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 overflow-hidden">
      {product.length > 0 &&
        product.map((product, index) => (
          <Link to={"/product/" + product._id} key={index}>
            <div className="p-8 w-96  bg-yellow-100 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl hover:rounded-3xl ">
              <div className="flex mb-4">
                {product.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square "
                    src={"http://localhost:5001/uploads/" + product.photos?.[0]}
                    alt="photo"
                  />
                )}
              </div>
              <div className="ml-20">
                <h2 className="font-medium">{product.title}</h2>
                <h2 className="text-sm truncate font-medium">{product.category}</h2>
                <h3 className="text-sm truncate font-normal">{product.address}</h3>
                <div className="mt-1 font-medium"
                >Rs {product.price} per day
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
