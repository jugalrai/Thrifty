import { Link,} from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductImg from "../ProductImg";

const ProductPages = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("/user-product").then(({ data }) => {
      setProduct(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <h1 className="font-bold">List of all your added products</h1>
        <br />
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/product/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new product
        </Link>
        <div className="mt-4">
          {product.length > 0 &&
            product.map((product, index) => (
              <Link
                to={"/account/product/" + product._id}
                className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-4 items-center"
                key={index}
              >
                <div className="flex w-32 h-32 bg-gray-300 ">
                  <ProductImg product={product} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{product.title}</h2>
                  <p className="text-sm mt-2">{product.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPages;
