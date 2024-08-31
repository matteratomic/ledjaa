"use client";

import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const EmailEntry = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="w-full md:w-1/2 flex bg-white items-center justify-center p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <img src="/logo.jpg" alt="Logo" className="h-24 mb-8" />
          <h2 className="text-3xl font-bold mb-2">Reset Your Password</h2>
          <p className="text-gray-600 mb-8">
            Enter your email to receive a password reset code
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39c049]"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#39c049] text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Send Reset Code
              </button>

              <Link
                href="/pwdreset/otp"
                className="w-full text-black py-2 rounded-md hover:underline underline-offset-2 transition duration-300"
              >
                Already Have Reset Code? Enter it Here
              </Link>
            </div>
          </form>

          <p className="mt-8 text-center">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-[#22742c] hover:underline bg-white"
            >
              Sign in
            </a>
          </p>
        </motion.div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-purple-600">
        <img
          src="/reset-password.jpg"
          alt="Decorative"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default EmailEntry;
