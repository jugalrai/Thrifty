import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/Product')
      .then((response) => response.json())
      .then((data) => setProducts(data?.data))
      .catch((e) => console.log(e));
  }, []);

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto mt-8 px-4 py-8 bg-black h-full w-full">
      <div className='font-bold text-3xl text-white flex justify-center mb-8'>Menu</div>
      <div className="w-full mb-4 flex justify-center">
        <div className="w-full max-w-2xl mb-10">
          <input
            type="text"
            className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-white font-bold text-xl text-center">
          No items available
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Link to={`/productDetails/${product._id}`} key={product._id}>
            <div className="bg-white rounded-lg shadow-md p-4 transform hover:scale-105 transition duration-300 w-full" style={{ margin: "0.5rem" }}>
              <div className="w-full h-64 mb-4">
                <img src={`http://localhost:5000/images/${product.img}`} alt={product.name} className='w-full h-full rounded' />
              </div>
              <div className="font-bold text-lg mb-1">{product.name}</div>
              <div className="text-gray-500 text-sm mb-2 line-clamp-4">{product.description}</div>
              <div className="font-bold text-xl">Rs {product.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;