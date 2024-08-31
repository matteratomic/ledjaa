"use client"
import React, { useState } from 'react';
import { FaUser, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useRouter } from 'next/navigation';
import {auth} from '../../lib/firebase'
import {Input} from '../../../components/ui/input'
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { Checkbox } from '../../../components/ui/checkbox';

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
      router.push('/dashboard');
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
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="w-full md:w-1/2 flex bg-white items-center justify-center p-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <img src="/logo.jpg" alt="Logo" className="h-24 mb-8" />
              <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
              <p className="text-gray-600">Please enter your details to sign in</p>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <FaLock className="absolute top-3 left-3 text-gray-300" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <Checkbox id="remember" />
                    <span className="ml-2 text-sm">Remember me</span>
                  </label>
                  <a href="/pwdreset" className="text-sm text-purple-600 hover:underline">Forgot password?</a>
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
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
                  <Button onClick={handleGoogleSignIn} variant="outline" className="flex items-center justify-center">
                    <FaGoogle className="mr-2" />
                    Google
                  </Button>
                  <Button onClick={handleFacebookSignIn} variant="outline" className="flex items-center justify-center">
                    <FaFacebook className="mr-2" />
                    Facebook
                  </Button>
                </div>
              </div>
              
              <p className="mt-8 text-center">
                Don`&apos;`t have an account?{' '}
                <a href="/register" className="text-purple-600 hover:underline">Sign up</a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-purple-600">
        <img src="/login.jpg" alt="Decorative" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;