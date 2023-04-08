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
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {product.length > 0 &&
        product.map((product, index) => (
          <Link to={"/product/" + product._id} key={index}>
            <div className="bg-gray-500 rounded-2xl flex mb-2">
              {product.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square "
                  src={"http://localhost:5001/uploads/" + product.photos?.[0]}
                  alt="photo"
                />
              )}
            </div>
            <h2 className="text-sm truncate text-gray-500">{product.title}</h2>
            <h2 className="text-sm truncate text-gray-500">{product.category}</h2>
            <h3 className="">{product.address}</h3>
            <div className="mt-1">
              <span className="">Rs {product.price}</span>/day
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
