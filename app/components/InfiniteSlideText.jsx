'use client'
import { motion } from "framer-motion"

const InfiniteSlideText = () => {
  const SlideText = () => {
    return <>
      <img alt="star" className="w-20 h-20" src="/star.svg" />
      <h1
        className="text-6xl sm:text-7xl text-black whitespace-nowrap"
        style={{ fontFamily: "Bebas Neue" }}>Save</h1>
      <img alt="star" className="w-16 h-16 sm:w-20 sm:h-20" src="/star.svg" />
      <h1 className="text-6xl sm:text-7xl text-amber-400 whitespace-nowrap" style={{ fontFamily: "Bebas Neue" }}>Invest</h1>
      <img alt="star" className="w-16 h-16 sm:w-20 sm:h-20" src="/star.svg" />
      <h1 className="text-6xl sm:text-7xl text-black whitespace-nowrap" style={{ fontFamily: "Bebas Neue" }}>Budget</h1>
      <img alt="star" className="w-16 h-16 sm:w-20 sm:h-20" src="/star.svg" />
      <h1 className="text-6xl sm:text-7xl text-amber-400 whitespace-nowrap" style={{ fontFamily: "Bebas Neue" }}>Grow</h1> </>
  }
  return <section className={`rounded-3xl mt-8 z-10 overflow-hidden relative infinite-slide-text w-full h-[18rem] sm:h-[10rem] bg-white`}>
    <motion.div
      initial={{ x: 0 }}
      animate={{
        x: "-100%",
        transition: {
          ease: 'linear',
          repeat: Infinity,
          repeatType: "loop",
          duration: 20
        }
      }}
      className="relative flex flex-nowrap items-center w-full h-full">
      {Array(24).fill(0).map((_, i) => {
        return <SlideText key={i} />
      })}
    </motion.div>
  </section>
}
export default InfiniteSlideText
