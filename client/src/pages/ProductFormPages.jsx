import React, { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const categories = [
  "Mens",
  "Female",
  "Kids"
]

const ProductFormPages = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);

  useEffect(() => {
    if (!id) return;

    axios.get("/product/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setCategory(data.category);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveProduct(e) {
    e.preventDefault();

    const productData = {
      title,
      address,
      addedPhotos,
      description,
      category,
      price,
    };

    if (id) {
      //update
      await axios.put("/product", {
        id,
        ...productData,
      });
      setRedirect(true);
    } else {
      //new product
      await axios.post("/product", productData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/product"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveProduct}>
        {preInput("Product Name")}

        <input
        className="border border-gray-400 rounded-md py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nike Shorts"
        />

        {preInput("Address")}

        <input className="border border-gray-400 rounded-md py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Itahari, Dulari"
        />

        {preInput(
          "Photos",)}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Category")}
        <select className="border border-gray-400 rounded-md py-2 px-3 w-full text-gray-700 "
         onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>

        {preInput("Description")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div>
          <h3 className="mt-2 -mb-1 ">Price per day</h3>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default ProductFormPages;
