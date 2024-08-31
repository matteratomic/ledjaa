// pages/paystack-redirect.js
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const PaystackRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Logic to redirect to Paystack with the specified amount
    // For now, just simulate the process
    setTimeout(() => {
      alert("Payment successful!");
      router.push("/dashboard/savings"); // Redirect back to savings page after payment
    }, 3000); // Simulate payment processing time
  }, [router]);

  return (
    <div className="container mx-auto mt-16 p-6">
      <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
      <p>Please wait while we redirect you to Paystack...</p>
    </div>
  );
};

export default PaystackRedirect;
