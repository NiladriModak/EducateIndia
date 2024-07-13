import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function PaymentStatus() {
  const navigator = useNavigate();
  const goto = () => {
    navigator("/studentRegistration");
  };
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  return (
    <div>
      <h1>Payment Successfull </h1>
      <h4>{referenceNum}</h4>
      <button onClick={goto}>Sign Up</button>
    </div>
  );
}

export default PaymentStatus;
