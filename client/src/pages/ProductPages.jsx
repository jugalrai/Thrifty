import { Link, } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductImg from "../ProductImg";

const ProductPages = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/user-product").then(({ data }) => {
      setProduct(data);
    });
  }, []);

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      const confirmed = window.confirm("Are you sure you want to delete this product?");
      if (confirmed) {
        await axios.delete(`/product/${productId}`);
        setProduct(product.filter((p) => p._id !== productId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <h1 className="font-bold">List of all your added products</h1>
        <br />
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/product/new"}>
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
        <div className="mt-2">
          {product.length > 0 &&
            product.map((product, index) => (
              <div
                className="mt-10 flex cursor-pointer gap-24  bg-yellow-100 p-4 rounded-2xl mb-4 items-center"
                key={index}>
                <div className="max-w-xs overflow-hidden rounded-lg shadow-lg">
                  <ProductImg product={product} />
                </div>
                <div className="grow-0 shrink">
                  <h1 className="text-5xl mb-10 font-medium">{product.title}</h1>
                  <p className="text-lg mb-40 mt-2">{product.description}</p>
                </div>
                <button
                  className="mb-20 mr-10 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => deleteProduct(product._id)}
                  disabled={loading}>
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPages;
