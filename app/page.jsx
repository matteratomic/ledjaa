
import { FlipText } from "./components/FlipText";
import PricingSection from "./components/Pricing";
import InfiniteSlideText from "./components/InfiniteSlideText";

import { LucideBarChart, LucideBell, LucideCalendar, LucideCoins, LucideGroup, LucideTarget, LucideUsers } from "lucide-react";
import Image from "next/image";
export default function Home() {
  return (
    <main className="relative min-h-screen bg-gray-100  p-8">
      <div className=" pt-20 flex relative min-h-screen items-center justify-between bg-gray-100">
        <div className="px-16 pt-16 flex flex-col w-3/5 h-screen items-center justify-start">
          <div className="w-2/3 bg-gray-200 p-4 flex rounded-full items-center">
            <div style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1592598015799-35c84b09394c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
            }} className="bg-cover w-12 h-12 bg-amber-500 rounded-full border-2 border-white"></div>
            <div
              style={{
                backgroundImage: "url(https://randomuser.me/api/portraits/men/59.jpg)"
              }}
              className="bg-cover -ml-4 w-12 h-12 bg-amber-500 rounded-full border-2 border-white"></div>
            <div
              style={{
                backgroundImage: "url(https://randomuser.me/api/portraits/women/36.jpg)"
              }}
              className="bg-cover -ml-4 w-12 h-12 bg-amber-500 rounded-full border-2 border-white"></div>
            <div
              style={{
                backgroundImage: "url(https://randomuser.me/api/portraits/men/83.jpg)",
              }}
              className="bg-cover -ml-4 w-12 h-12 bg-amber-500 rounded-full border-2 border-white"></div>
            {/* <p className="ml-2 text-lg font-semibold text-black">5K</p> */}
            <p className="ml-2 w-3/5 text-sm font-semibold text-black">Join our platform to save,invest, budget and grow</p>
          </div>
          <h1 className="mt-3 text-7xl font-bold text-black text-center">Turn small steps into <p
            className="pb-2 bg-gradient-to-r inline-block from-amber-300 to-amber-500 bg-clip-text text-transparent">big dreams</p></h1>

          <p className="mt-4 text-center text-gray-600 font-medium">
            Whether you`&apos;`re saving for a rainy day, a dream vacation, or your child`&apos;`s education, Lejaa makes it easy. Set your goals, save at your own pace, and watch your savings grow—all from your mobile phone. No bank account needed. Your future starts with just a few taps
          </p>
          <div className="mt-8 flex space-x-3 w-2/3 h-16">
            <div className="bg-gradient-to-r from-amber-300 to-amber-500 flex items-center justify-center rounded-full p-6 py-3 w-1/2 bg-amber-500 text-lg font-semibold">Sign Up</div>
            <div className="flex items-center justify-center rounded-full p-6 w-1/2 bg-white text-lg text-black font-semibold">About Us</div>
          </div>
        </div>
        <div
          // style={{ }}
          className="relative w-2/5 h-screen">
          <div
            style={{
              backgroundImage: "url(https://h6etacfy2f.execute-api.us-east-1.amazonaws.com/default/images-resizer?path=prod/iamdavidrotimi/1920x1920/1633433894968.1118.jpeg)"
              // backgroundImage: "url(https://plus.unsplash.com/premium_photo-1678344184755-867393167022?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
            }}
            className="bg-cover bg-center h-5/6 w-full bg-amber-500 rounded-2xl"></div>
        </div>
      </div>

      <div>
        <div className="text-gray-800 font-bold text-5xl mb-8">How savings work on <span className="text-amber-400 bg-gradient-to-r inline-block from-amber-300 to-amber-500 bg-clip-text text-transparent pb-2">Lejaa</span></div>
        <div className="flex w-full space-x-8">
          <div
            style={{
              backgroundImage: "url(https://plus.unsplash.com/premium_photo-1661330042351-047e8a9e3cbb?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
            }}
            className="relative bg-cover w-1/3 h-72 rounded-lg bg-amber-500 flex items-center p-3">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-300/40 to-amber-500"></div>
            <div className="relative z-1 flex items-center justify-between w-full mt-auto">
              <p className="w-2/4 font-medium">Sign up on Lejaa and create your account without any extra charge</p>
              <div className="w-12 h-12 text-amber-500 font-bold text-xl bg-white rounded-md flex items-center justify-center">
                1
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundImage: "url(https://h6etacfy2f.execute-api.us-east-1.amazonaws.com/default/images-resizer?path=prod/Saitarg/1920x1920/1545963492941.422.jpeg)",
            }}
            className="relative bg-cover w-1/3 h-72 rounded-lg bg-amber-500 flex items-center p-3">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-300/40 to-amber-500"></div>
            <div className="relative z-1 flex items-center justify-between w-full mt-auto">
              <p className="w-3/4 font-medium">Create your savings and investment goals. You can create both personal and group goals</p>
              <div className="w-12 h-12 text-amber-500 font-bold text-xl bg-white rounded-md flex items-center justify-center">
                2
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: "url(https://h6etacfy2f.execute-api.us-east-1.amazonaws.com/default/images-resizer?path=prod/Iwaria/1920x1920/1583798120881.1079.jpeg)" }}
            className="relative bg-cover w-1/3 h-72 rounded-lg bg-amber-500 flex items-center p-3">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-300/40 to-amber-500"></div>
            <div className="relative z-1 flex items-center justify-between w-full mt-auto">
              <p className="w-3/4 font-medium">
                Start depositing cash in to the goals that you create. You can do this effortlessly through reminders and saving rules
              </p>
              <div className="w-12 h-12 text-amber-500 font-bold text-xl bg-white rounded-md flex items-center justify-center">
                3
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfiniteSlideText />

      <section className="text-gray-600 bg-white rounded-2xl body-font mt-16">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-12 flex-col items-center text-center">
            <h1 className="sm:text-4xl text-2xl font-bold title-font mb-2 text-gray-900">
              Savings built around <span className="text-amber-400">your habits</span>
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Our savings app simplifies money management by offering personalized goals, smart budgeting tools, and automated savings features tailored to your needs.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-amber-100 mb-4">
                  <LucideUsers className={`w-8 h-8 text-amber-500 shrink-0`} />
                </div>
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">Save as a group</h2>
                <p className="leading-relaxed text-base">
                  Come together with family, friends and colleagues and save for shared goals.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-amber-100 mb-4">
                  <LucideTarget className={`w-8 h-8 text-amber-500 shrink-0`} />
                </div>
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">Set Goals</h2>
                <p className="leading-relaxed text-base"></p>
                Create, track and achieve all your savings goals. Lejaa will help you along the way.
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-amber-100 mb-4">
                  <LucideBell className={`w-8 h-8 text-amber-500 shrink-0`} />
                </div>
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">Get Reminders</h2>
                <p className="leading-relaxed text-base">
                  Don`&apos;`t lose track of your savings. Choose when to get reminders to deposit.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-amber-100 mb-4">
                  <LucideCalendar className={`w-8 h-8 text-amber-500 shrink-0`} />
                </div>
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">Track your progress</h2>
                <p className="leading-relaxed text-base">
                  Once you create your goals, Chumz will help you track them on an easy to use interface.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-amber-100 mb-4">
                  <LucideBarChart className={`w-8 h-8 text-amber-500 shrink-0`} />
                </div>
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">Get Reports</h2>
                <p className="leading-relaxed text-base">
                  See your saving performance over time. Get detailed reports along with suggestions for improvements.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-amber-100 mb-4">
                  <LucideCoins className={`w-8 h-8 text-amber-500 shrink-0`} />
                </div>
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">Save Automatically</h2>
                <p className="leading-relaxed text-base">
                  Lejaa will enable you to save whenever you spend or receive mobile money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />

    </main >
  );
}
