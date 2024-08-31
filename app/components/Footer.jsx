'use client'
import { motion } from 'framer-motion'
import React from 'react'
import { FlipText } from './FlipText'
import Link from 'next/link'

const HoverLink = ({ text, href = "#", className }) => {
  return <Link href={href}><motion.div
    initial="initial"
    whileHover="hovered"
    className={`text-black duration-500 hover:text-[#4203FC] pb-2 w-80 overflow-hidden relative text-2xl sm:text-3xl cursor-pointer ${className}`} >
    {text}
    <motion.div
      variants={{
        initial: { x: "0%" },
        hovered: { x: "200%" },
      }}
      transition={{
        duration: .5
      }}
      className="absolute w-full bg-black h-1 bottom-0" />
    <motion.div
      variants={{
        initial: { x: "-100%" },
        hovered: { x: "0%" }
      }}
      transition={{
        duration: .5
      }}
      className="absolute w-full bg-[#4203FC] h-1 bottom-0"
    />
  </motion.div>
  </Link>
}

const Footer = () => {
  return (
    <div
      style={{
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
      }}
      className="flex flex-col px-4 sm:px-16 pb-32 pt-16 relative z-1 bg-amber-500 bg-gradient-to-br from-amber-500 to-amber-300 sm:min-h-screen w-full overflow-x-hidden">
      <div className="flex items-center">
        <h1 className="text-black text-center text-7xl sm:text-[8rem]"
          style={{ fontFamily: "Bebas Neue", lineHeight: 1 }}>
          SAVINGS MADE EASY <span className="sm:translate-y-12 overflow-hidden inline-block text-white">
            <FlipText>
              FOR&nbsp;YOU.
            </FlipText>
          </span>SIGN UP TO REACH YOUR GOALS FASTER</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-start mt-16 space-y-16 sm:space-y-0 sm:space-x-36">
        <div>
          <h2
            className="text-5xl text-black mb-4"
            style={{ fontFamily: "Bebas Neue", lineHeight: 1 }}>Email
          </h2>
          <HoverLink
            className="text-2xl sm:text-3xl"
            href="mailto:support@lejaa.com" text="support@lejaa.com" />
        </div>
        <div>
          <h2
            className="text-5xl text-black sm:text-6xl mb-4"
            style={{ fontFamily: "Bebas Neue", lineHeight: 1 }}>Social</h2>

          <div className="flex flex-col space-y-4">
            <HoverLink
              className="text-2xl sm:text-3xl"
              href="#" text="LinkedIn" />
            <HoverLink
              className="text-2xl sm:text-3xl"
              href="#" text="Youtube" />
            <HoverLink
              className="text-2xl sm:text-3xl"
              href="#" text="X (formerly known as twitter)" />
          </div>
        </div>
        <div>
          <h2
            className="text-black text-5xl sm:text-6xl mb-4"
            style={{ fontFamily: "Bebas Neue", lineHeight: 1 }}>Menu</h2>
          <div className="flex flex-col space-y-4">
            <HoverLink
              className="text-2xl sm:text-3xl"
              href="/" text="Home" />
            <HoverLink
              className="text-2xl sm:text-3xl"
              href="/" text="Pricing" />
            <HoverLink
              className="text-2xl sm:text-3xl"
              href="/" text="Dashboard" />
          </div>
        </div>
      </div>
      <div
        className="mt-16 sm:text-2xl text-black/50 mx-auto">© Lejaa {new Date().getFullYear()}. All rights reserved</div>
    </div>
  )
}

export default Footer
