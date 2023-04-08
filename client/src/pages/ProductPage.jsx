import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { addDays, differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  let numberOfDays = 0;
  let today = new Date();
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today,1));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  useEffect(() => {
    if (!id) return;

    axios.get(`/product/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  async function bookThisProduct(e) {
    e.preventDefault();
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      name,
      email,
      phone,
      product: product._id,
      price: numberOfDays * product.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!product) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <h2 className="text-3xl">Photos of {product.title}</h2>
            <button
              className="fixed bottom-10 flex gap-2  py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
              onClick={() => setShowAllPhotos(false)}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          {product?.photos?.length > 0 &&
            product.photos.map((photo) => (
              <div>
                <img src={"http://localhost:5001/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{product.title}</h1>
      <div className="flex gap-2 my-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        <a
          href={"https://maps.google.com/?q=" + product.address}
          target="_blank"
          className="block font-semibold underline"
        >
          {product.address}
        </a>
      </div>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[4fr_1fr] rounded-2xl overflow-hidden ">
          <div className="">
            {product.photos?.[0] && (
              <div className="">
                <img
                  src={"http://localhost:5001/uploads/" + product.photos?.[0]}
                  alt="photo"
                  className="aspect-square object-cover w-full h-[600px]"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {product.photos?.[1] && (
              <img
                src={"http://localhost:5001/uploads/" + product.photos?.[1]}
                alt="photo"
                className="aspect-square object-cover h-[300px]"
              />
            )}
            {product.photos?.[2] && (
              <div className="overflow-hidden">
                <img
                  src={"http://localhost:5001/uploads/" + product.photos?.[2]}
                  alt="photo"
                  className="aspect-square object-cover relative top-2 h-[300px]"
                />
              </div>
            )}
          </div>
        </div>
        <button
          className="flex gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
          onClick={() => setShowAllPhotos(true)}
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <form className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {product.description}
          </div>
        </div>
        <div>
          <div className="bg-gray-200 p-4 rounded-2xl shadow">
            <div className="text-2xl text-center">
              Price: {product.price} Rs / per day
            </div>
            <div className="border py-4 px-4 rounded-2xl">
              <label>Check in:</label> <br />
              <input
                className="p-2 rounded-2xl mt-2"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                min={today.toISOString().slice(0, 10)}
              />
            </div>
            <div className="border py-4 px-4 rounded-2xl ">
              <label>Check out:</label> <br />
              <input
                className="p-2 rounded-2xl mt-2"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>
            {numberOfDays > 0 && (
              <>
                <div className="border py-4 px-4 rounded-2xl w-80">
                  <label>Your full name:</label>
                  <input
                    type="text"
                    placeholder="John Rai"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="border py-4 px-4">
                  <label>Phone:</label><br/>
                  <input
                    required
                    type="phone"
                    value={phone}
                    pattern="^\98[0-9]{8}$"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}
            {phone &&
            name &&
            checkIn.length > 0 &&
            checkOut.length > 0 ? (
              <button type="submit" className="primary" onClick={bookThisProduct}>
                
                {numberOfDays > 0 && (
                  <span> Rs {numberOfDays * product.price}</span>
                )}
              </button>
            ) : (
              <button
                type="submit"
                className="bg-gray-400 p-2 w-full text-white rounded-2xl"
                onClick={bookThisProduct}
                disabled
              >
                
                {numberOfDays > 0 && (
                  <span> Rs {numberOfDays * product.price}</span>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductPage;
