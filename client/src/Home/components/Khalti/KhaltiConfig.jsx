import axios from "axios";
import { useState } from "react";
import myKey from "./KhaltiKeys";

let config = {
  // replace this key with yours
  "publicKey": myKey.publicTestKey,
  "productIdentity": "1234567890",
  "productName": "Thrifty",
  "productUrl": "http://127.0.0.1:5173/",
  "eventHandler": {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
      let data = {
        "token": payload.token,
        "amount": payload.amount
      };

      let config = {
        headers: { 'Authorization': myKey.secretKey }
      };

      axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
        .then(response => {
          console.log(response.data);
          localStorage.setItem("paymentDetails", response.data)
          // send the response to the merchant
        })
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log('widget is closing');
    }
  },
  paymentPreference: ["KHALTI"],
};

export default config;