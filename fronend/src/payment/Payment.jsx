import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Payment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const checkoutHandler = async (e) => {
    // e.preventDefault();
    if (!name || !email || !contact)
      return toast.error("Please enter all details");
    ("came");
    const {
      data: { key },
    } = await axios.get("http://localhost/api/getRazorKey");
    const {
      data: { order },
    } = await axios.post("http://localhost/api/payment");
    var options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: "2000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Educate India",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // callback_url: "http://localhost/api/paymentVerification",
      handler: async function (response) {
        const razorpay_payment_id = response.razorpay_payment_id;
        const razorpay_order_id = response.razorpay_order_id;
        const razorpay_signature = response.razorpay_signature;
        const { data } = await axios.post(
          "http://localhost/api/paymentVerification",
          {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            email,
            name,
          }
        );
        window.location.href = "http://localhost:5173/studentRegister";
        // (data);
      },
      prefill: {
        name: name,
        email: email,
        contact: contact,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://theacademicinsights.com/wp-content/uploads/2021/10/education-in-21st-century.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // backgroundColor: "blue",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          boxShadow: "5px 10px 18px #888888",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <h1>Payment Form</h1>
        <p style={{ padding: "1vmax", color: "red" }}>
          Note : Available only in local host as the Razorpay is in test mode
        </p>
        <form
          style={{
            width: "40vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // border: "1px solid black",

            // backgroundColor: "blue",
          }}
        >
          <TextField
            sx={{ width: "30vw", margin: "1vmax" }}
            variant="outlined"
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            sx={{ width: "30vw", margin: "1vmax" }}
            variant="outlined"
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            sx={{ width: "30vw", margin: "1vmax" }}
            variant="outlined"
            label="Contact_Number"
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
          <TextField
            sx={{ width: "30vw", margin: "1vmax" }}
            variant="outlined"
            value="20"
            disabled
            label="Amount"
          />
          <Button
            sx={{ width: "30vw", margin: "1vmax" }}
            variant="contained"
            onClick={checkoutHandler}
          >
            pay
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
