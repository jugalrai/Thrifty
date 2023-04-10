import axios from "axios";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns/fp";
import React, { useEffect, useState } from "react";
import ProductImg from "../ProductImg";
import AccountNav from "./AccountNav";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  const deleteBooking = async (bookingId) => {
    setLoading(true);
    try {
      const confirmed = window.confirm("Are you sure you want to cancel this booking?");
      if (confirmed) {
        await axios.delete(`/bookings/${bookingId}`);
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AccountNav />
      <div>
        {bookings?.length > 0 && bookings.map((booking) => (
          <div className="flex gap-4  bg-yellow-100 rounded-2xl overflow-hidden mb-3 idi2"
            key={booking._id}>
            <div className="max-w-xs overflow-hidden py-2 px-2">
              <ProductImg product={booking.product} />
            </div>
            <div className=" grow flex gap-2 flex-col ml-80 mt-14">
              <h2 className="text-4xl font-bold">{booking.product.title}</h2>
              <h2 className="mt-2 text-2xl ">{booking.product.category}</h2>
              <div className=" text-2xl">
                Date: {format(new Date(booking.checkIn), "dd-MM-yyyy")} until{" "}
                {format(new Date(booking.checkOut), "dd-MM-yyyy")}
              </div>
              <div className="mt- text-2xl">
                {differenceInCalendarDays(
                  new Date(booking.checkIn),
                  new Date(booking.checkOut)
                )}{" "}
                day | Price: Rs {booking.price}
              </div>
              <button
                className="ml-80 text-xl bg-red-500 hover:bg-red-600  text-white font-bold w-40 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => deleteBooking(booking._id)}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Cancel Booking"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookingsPage;
