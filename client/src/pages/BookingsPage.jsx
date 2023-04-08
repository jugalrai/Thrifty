import axios from "axios";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns/fp";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductImg from "../ProductImg";
import AccountNav from "./AccountNav";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="">
        {bookings?.length > 0 && bookings.map((booking) => (
          <Link key={booking._id} to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-3 idi2">
            <div className="w-48">
              <ProductImg product={booking.product} />
            </div>
            <div className=" grow flex gap-2 flex-col">
              <h2 className="text-xl font-bold">{booking.product.title}</h2>
              <h2 className="text-xl font-bold">{booking.product.category}</h2>
              <div className=" -mt-2">
                Date: {format(new Date(booking.checkIn), "dd-MM-yyyy")} until{" "}
                {format(new Date(booking.checkOut), "dd-MM-yyyy")}
              </div>
              <div className="text-xl">
                {differenceInCalendarDays(
                  new Date(booking.checkIn),
                  new Date(booking.checkOut)
                )}{" "}
                days | Price: Rs {booking.price}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
