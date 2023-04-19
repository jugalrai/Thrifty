import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import HomeSlider from "../Home/components/HomeSlider";

const IndexPage = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("/product").then((response) => {
      setProduct(response.data);
    });
  }, []);

  return (
    <>
      <div style={{ backgroundColor: '#FFFFFF' }}>
        
        <HomeSlider />
        <h1 className="text-3xl font-medium text-center font-serif  underline mt-10">Just For You</h1>
        <div className="mt-10 mb-10 ml-18 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 overflow-hidden">
          {product.length > 0 &&
            product.map((product, pro) => (
              <Link to={"/product/" + product._id} key={pro}>
                <div className="p-4 w-80  bg-[#F5F5F5] transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl hover:rounded-3xl ">
                  <div className="flex mb-4">
                    {product.photos?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square "
                        src={"http://localhost:5001/uploads/" + product.photos?.[0]}
                        alt="photo"
                      />
                    )}
                  </div>
                  <div className="ml-20 ">
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
      </div>
    </>
  );
};

export default IndexPage;
