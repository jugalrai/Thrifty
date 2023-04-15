import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns/fp";
import axios from "axios";
import ProductImg from "../ProductImg";

function AdminBookingList() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get("/admin")
            .then((response) => {
                setBookings(response.data);
            });
    }, []);

    return (
        <>  
            <h1 className="text-4xl font-bold mt-8 mb-8">Booked Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings?.length > 0 ?
                    (bookings.map((booking) => (
                        <div className="border border-gray-200 rounded-xl overflow-hidden"
                            key={booking._id}>
                            <div className="h-48 overflow-hidden">
                                <ProductImg product={booking.product} />
                            </div>
                            <div className="px-6 py-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold">{booking.product.title}</h2>
                                    <h3 className="text-xl font-medium text-gray-600">
                                        {booking.product.category}
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-2 mb-4">
                                    <h4 className="text-lg font-medium">
                                        <span className="text-gray-600">Booked By: </span>
                                        {booking.name}
                                    </h4>
                                    <h4 className="text-lg font-medium">
                                        <span className="text-gray-600">Phone: </span>
                                        {booking.phone}
                                    </h4>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-lg font-medium">
                                        <span className="text-gray-600">Booked Date: </span>
                                        {format(new Date(booking.checkIn), "dd-MM-yyyy")} until{" "}
                                        {format(new Date(booking.checkOut), "dd-MM-yyyy")}
                                    </h4>
                                    <h4 className="text-lg font-medium">
                                        <span className="text-gray-600">Duration: </span>
                                        {differenceInCalendarDays(
                                            new Date(booking.checkIn),
                                            new Date(booking.checkOut)
                                        )}{" "}
                                        day(s)
                                    </h4>
                                    <h4 className="text-lg font-medium">
                                        <span className="text-gray-600">Price: </span>Rs {booking.price}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    ))
                    ) : (
                        <div className="flex justify-center items-center h-96">
                            <p className="text-3xl text-gray-500">No bookings found.</p>
                        </div>
                    )}
            </div>

        </>
    );
}

export default AdminBookingList;
