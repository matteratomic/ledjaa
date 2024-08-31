"use client"
import React, { useState } from 'react';
import { FaUser, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { auth } from '@/app/lib/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
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
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-gray-600 mb-8">Please enter your details to sign in</p>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39c049]"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39c049]"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Remember me</span>
              </label>
              <a href="/pwdreset" className="text-sm text-purple-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#39c049] text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={handleGoogleSignIn} className="flex items-center justify-center px-4 py-2 border border-green-400 rounded-md hover:bg-gray-50 transition duration-300">
                <FaGoogle className="mr-2" />
                Google
              </button>
              <button onClick={handleFacebookSignIn} className="flex items-center justify-center px-4 py-2 border border-green-400 rounded-md hover:bg-gray-50 transition duration-300">
                <FaFacebook className="mr-2" />
                Facebook
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center">
            Don`&apos;`t have an account?{' '}
            <a href="/register" className="text-[#22742c] hover:underline bg-white">Sign up</a>
          </p>
        </motion.div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-purple-600">
        <img src="/login.jpg" alt="Decorative" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;