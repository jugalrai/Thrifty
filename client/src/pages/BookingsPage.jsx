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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings?.length > 0 ?
          (bookings.map((booking) => (
            <div
              className="border bg-white rounded-lg shadow-lg overflow-hidden"
              key={booking._id}
            >
              <div className="h-48 overflow-hidden">
                <ProductImg product={booking.product} />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{booking.product.title}</h2>
                <h2 className="text-lg font-medium mb-2">{booking.product.category}</h2>
                <div className="text-lg mb-2">
                  <span className="font-bold">Date:</span>{" "}
                  {format(new Date(booking.checkIn), "dd-MM-yyyy")} until{" "}
                  {format(new Date(booking.checkOut), "dd-MM-yyyy")}
                </div>
                <div className="text-lg mb-2">
                  <span className="font-bold">Duration:</span>{" "}
                  {differenceInCalendarDays(
                    new Date(booking.checkIn),
                    new Date(booking.checkOut)
                  )}{" "}
                  day
                </div>
                <div className="text-lg mb-2">
                  <span className="font-bold">Price:</span> Rs {booking.price}
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => deleteBooking(booking._id)}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Cancel Booking"}
                  </button>
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="flex justify-center items-center h-96">
              <p className="text-3xl text-gray-500">No bookings found.</p>
            </div>)}
      </div>
    </>
  );
};

export default BookingsPage;
