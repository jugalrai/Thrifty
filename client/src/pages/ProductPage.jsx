import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { addDays, differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./../Home/components/Khalti/KhaltiConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  let numberOfDays = 0;
  let today = new Date();
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today, 1));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  let checkout = new KhaltiCheckout(config);

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

    if (!user) {
      toast.error("Please log in to book this product.");
      return;
    }

    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      name,
      email,
      phone,
      product: product._id,
      price: numberOfDays * product.price * 10,
    });


    checkout.show({ amount: numberOfDays * product.price })
    const bookingId = response.data._id;
    // setRedirect(`/user/bookings`);
    if (localStorage.getItem("paymentDetails")) {
      setRedirect(`/user/bookings`);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!product) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="p-8 grid gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Photos of {product.title}</h2>
            <button
              className="py-2 px-4 bg-white rounded-2xl shadow-md text-gray-600 font-medium hover:text-gray-800 transition-colors"
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
            product.photos.map((photo, index) => (
              <div key={index}>
                <img src={"http://localhost:5001/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="flex items-center mb-6">
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
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {product.address}
        </a>
      </div>
      <div className="relative">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden">
          {product.photos?.slice(1, 2).map((photo) => (
            <div className="">
              <img
                key={photo}
                src={`http://localhost:5001/uploads/${photo}`}
                alt="photo"
                className="w-full object-cover aspect-h-3 aspect-w-4"
              />
            </div>
          ))}
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
          <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
            <div className="text-2xl font-semibold text-center mb-6">
              Price: {product.price} Rs / per day
            </div>
            <div className="flex flex-col">
              <label className="font-semibold ">Check in:</label> <br />
              <input
                className="border border-gray-300 rounded-lg p-2 mb-5"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={today.toISOString().slice(0, 10)}
                required
              />
            </div>
            <div className="flex flex-col ">
              <label className="font-semibold ">Check out:</label> <br />
              <input
                className="border border-gray-300 rounded-lg p-2 mb-5"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn}
                required
              />
            </div>
            {numberOfDays > 0 &&
              (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold mb-3">Your full name:</label>
                    <input
                      type="text"
                      placeholder="John Rai"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label className="font-semibold">Phone:</label><br />
                    <input
                      className="border border-gray-300 rounded-lg p-1 mb-4"
                      type="tel"
                      value={phone}
                      placeholder="9829562154"
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
            {phone &&
              name &&
              checkIn.length > 0 &&
              checkOut.length > 0 ? (
                <button type="submit"
                  className="bg-purple-700 p-2 w-full text-white rounded-2xl"
                  onClick={bookThisProduct}>

                  {numberOfDays > 0 && (
                    <span> Rs {numberOfDays * product.price}</span>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-purple-700 p-2 w-full text-white rounded-2xl cursor-not-allowed"
                  onClick={bookThisProduct}>
                  {numberOfDays > 0 && (<span> Rs {numberOfDays * product.price}</span>)}
                </button>
              )}
          </div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default ProductPage;
