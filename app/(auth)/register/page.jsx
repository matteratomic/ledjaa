"use client";

import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, updateProfile } from "firebase/auth";
import { useRouter } from 'next/navigation';
import {auth} from '../../lib/firebase'
import {Input} from '../../../components/ui/input'
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookSignUp = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="w-full md:w-1/2 flex bg-white items-center justify-center p-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <img src="/logo.jpg" alt="Logo" className="h-24 mb-8 mx-auto" />
              <h2 className="text-3xl font-bold mb-2">Create an account</h2>
              <p className="text-gray-600">Sign up to get started</p>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <FaLock className="absolute top-3 left-3 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button onClick={handleGoogleSignUp} variant="outline" className="flex items-center justify-center">
                    <FaGoogle className="mr-2" />
                    Google
                  </Button>
                  <Button onClick={handleFacebookSignUp} variant="outline" className="flex items-center justify-center">
                    <FaFacebook className="mr-2" />
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <p className="mt-8 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-[#22742c] hover:underline">Sign in</a>
          </p>
        </motion.div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-purple-600">
        <img src="/registration.jpg" alt="Decorative" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Register;
