'use client'
import { LucideArrowUp, LucideBell, LucideDollarSign, LucideFile, LucidePlaySquare, LucidePlus, LucidePlusSquare } from 'lucide-react'
import React from 'react'
import { PieChart, Pie, Cell, BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import {Communities} from "../../components/Communities"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SectionItem = ({ active, text }) => {
  return <div className="cursor-pointer text-gray-400 flex space-x-2 bg-purple-0300 p-6 pl-3 relative h-16">
    <div className={`absolute w-1 rounded-xl h-2/3 ${active ? "bg-amber-300 " : "bg-transparent"} right-0 top-1/2 -translate-y-1/2`}></div>
    <div className="flex space-x-4">
      <div className={`border-2 ${active ? "border-amber-500" : "border-gray-400"} rounded-md w-6 h-6 flex items-center justify-center`}>
        <LucideDollarSign className={`w-4 h-4 ${active ? "text-amber-500 " : "text-gray-400"} shrink-0`} />
      </div>
      <div className={`${active ? "text-gray-800" : "text-gray-400"} font-semibold`}>{text}</div>
    </div>
  </div>
}

const Dashboard = (props) => {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const data2 = [
    {
      name: '21 Aug',
      earn: 4000,
      spend: 2400,
      amt: 2400,
    },
    {
      name: '22 Aug',
      earn: 3000,
      spend: 1398,
      amt: 2210,
    },
    {
      name: '23 Aug',
      earn: 2000,
      spend: 9800,
      amt: 2290,
    },
    {
      name: '24 Aug',
      earn: 2780,
      spend: 3908,
      amt: 2000,
    },
    {
      name: '25 Aug',
      earn: 1890,
      spend: 4800,
      amt: 2181,
    },
    {
      name: '26 Aug',
      earn: 2390,
      spend: 3800,
      amt: 2500,
    },
    {
      name: '27 Aug',
      earn: 3490,
      spend: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="bg-slate-200 relative flex h-screen space-x-4">
      <div className="relative p-8 pr-0 h-full w-1/6">
        <div className="rounded-lg h-full w-full bg-white py-4">
          <div className="font-arcane text-3xl text-amber-500 rounded-md w-16 h-16 px-6">Lejaa</div>
          <div className="mt-4 flex flex-col">
            <SectionItem active text="Dashboard" />
            <SectionItem text="Transactions" />
            <SectionItem text="Cards" />
            <SectionItem text="Reports" />
            <SectionItem text="Settings" />
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col w-2/3 p-16 pb-8">
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold text-slate-800">Dashboard</p>
          <p className="text-slate-800"><span className="text-gray-500">Showing for </span>21 Aug - 28 Aug 2024</p>
        </div>

        <div className="bg-white flex items-center rounded-2xl p-2 mt-8 space-x-4">
          <div className="flex flex-1 flex-col items-center justify-center p-4 space-y-2 h-20 rounded-2xl">
            <div className="border-2 border-gray-400 rounded-md p-1">
              <LucideDollarSign className="w-4 h-4 text-gray-400 shrink-0" />
            </div>
            <p className="text-gray-400 text-sm font-semibold">Send Money</p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center p-4 space-y-2 h-20 bg-amber-100 rounded-2xl">
            <div className="border-2 border-amber-500 rounded-md p-1">
              <LucideFile className="w-4 h-4 text-amber-500 shrink-0" />
            </div>
            <p className="text-gray-800 text-sm font-semibold">Statements</p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center p-4 space-y-2 h-20 rounded-2xl">
            <div className="border-2 border-gray-400 rounded-md p-1">
              <LucideDollarSign className="w-4 h-4 text-gray-400 shrink-0" />
            </div>
            <p className="text-gray-400 text-sm font-semibold">Top Up</p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center p-4 space-y-2 h-20 rounded-2xl">
            <div className="border-2 border-gray-400 rounded-md p-1">
              <LucideDollarSign className="w-4 h-4 text-gray-400 shrink-0" />
            </div>
            <p className="text-gray-400 text-sm font-semibold">More</p>
          </div>
        </div>

        <div className="mt-4 flex h-52 w-full space-x-3">
          <div className="flex flex-col items-center justify-center bg-white shadow-md w-1/2 h-full rounded-2xl">
            <p className="text-sm text-gray-800 font-semibold">Total spent</p>
            <p className="text-4xl font-bold text-gray-800 my-4"><span className="text-lg">KES</span> 23,502</p>
            <div className="flex items-center justify-center bg-green-100 font-bold text-sm text-green-600 rounded-2xl p-1 px-2">
              <LucideArrowUp className="w-4 h-4 text-green-600 shrink-0" />
              3.14%
            </div>
          </div>

          <div>
            <Communities />
          </div>
          <div className="relative flex flex-col items-center justify-center p-4 bg-white shadow-md w-1/2 h-full rounded-2xl">
            <p className="text-sm text-gray-800 font-semibold mr-auto">Expenses</p>
            <div className="flex ml-8">
              <div className="flex items-center justify-center">
                <div className="absolute text-gray-800 font-bold text-2xl">1,376</div>
                <PieChart
                  width={150} height={150}>
                  <Pie
                    data={data}
                    cx={"50%"}
                    cy={"50%"}
                    innerRadius={60}
                    outerRadius={75}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="ml-8 flex flex-col space-y-3 items-start">
                <div className="flex items-center justify-center text-gray-800 text-sm space-x-2">
                  <div className="animate-pulse bg-[#0088FE] rounded-full w-2 h-2 mr-1"></div>Rent
                </div>
                <div className="flex items-center justify-center text-gray-800 text-sm space-x-2">
                  <div className="animate-pulse bg-[#00C49F] rounded-full w-2 h-2 mr-1"></div>Food
                </div>
                <div className="flex items-center justify-center text-gray-800 text-sm space-x-2">
                  <div className="animate-pulse bg-[#FFBB28] rounded-full w-2 h-2 mr-1"></div>Electricity
                </div>
                <div className="flex items-center justify-center text-gray-800 text-sm space-x-2">
                  <div className="animate-pulse bg-[#FF8042] rounded-full w-2 h-2 mr-1"></div>Shopping
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl w-full flex-1 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data2}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#FFBB28" />
              <YAxis yAxisId="right" orientation="right" stroke="#F59E0B" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="spend" fill="#FFBB28" />
              <Bar yAxisId="right" dataKey="earn" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="relative rounded-lg bg-white h-full min-w-80 p-8">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center justify-center rounded-full border border-gray-400 w-10 h-10">
            <div className="absolute bg-amber-500 rounded-full w-2 h-2 right-0 -top-px"></div>
            <LucideBell className="w-6 h-6 text-slate-500 shrink-0" />
          </div>
          <div
            style={{ backgroundImage: "url(https://randomuser.me/api/portraits/women/36.jpg)" }}
            className="bg-cover bg-center relative flex items-center justify-center rounded-full border border-gray-400 w-10 h-10">
          </div>
        </div>

        <div className="mt-16 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-800">Your Wallet</p>
            <LucidePlusSquare role="button" className="cursor-pointer w-6 h-6 text-slate-500 shrink-0" />
          </div>

          <div className="shadow-2xl mt-4 rounded-2xl w-full h-44 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex flex-col p-4">
            <div className="flex w-full items-center justify-end text-white text-sm"> <div className="animate-pulse bg-lime-400 rounded-full w-2 h-2 mr-1"></div>Active</div>
            <div className="mt-8 flex w-full items-baseline text-white text-4xl font-bold"><span className="text-lg">KES </span>&nbsp;43,552</div>
            <div className="mt-4 font-bold">IAN NDEU MACHARIA</div>
            <div className="font-light text-xs">WALLET ID: 9SJOWXGTPW</div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="font-semibold text-gray-800">Your Friends</p>
            <LucidePlusSquare role="button" className="cursor-pointer w-6 h-6 text-slate-500 shrink-0" />
          </div>

          <div className="mt-4 flex items-center space-x-3">
            <div className="relative flex items-center justify-center rounded-full border border-gray-400 w-10 h-10">
              <LucidePlus className="w-6 h-6 text-slate-500 shrink-0" />
            </div>
            <div
              style={{ backgroundImage: "url(https://randomuser.me/api/portraits/women/36.jpg)" }}
              className="bg-cover bg-center relative flex items-center justify-center rounded-full border border-gray-400 w-10 h-10">
            </div>
            <div
              style={{ backgroundImage: "url(https://randomuser.me/api/portraits/men/36.jpg)" }}
              className="bg-cover bg-center relative flex items-center justify-center rounded-full border border-gray-400 w-10 h-10">
            </div>
            <div
              style={{ backgroundImage: "url(https://randomuser.me/api/portraits/men/83.jpg)" }}
              className="bg-cover bg-center relative flex items-center justify-center rounded-full border border-gray-400 w-10 h-10">
            </div>
            <div
              style={{ backgroundImage: "url(https://randomuser.me/api/portraits/men/59.jpg)" }}
              className="bg-cover bg-center relative flex items-center justify-center rounded-full border border-gray-400 w-10 h-10">
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="font-semibold text-gray-800">Recent transactions</p>
          </div>

          <div className="mt-4 flex flex-col space-y-6">
            <div className="flex items-center">
              <div className="relative flex items-center justify-center rounded-2xl border border-gray-400 w-10 h-10"> </div>
              <div className="ml-3 flex flex-col items-start justify-center">
                <p className="text-gray-800 font-semibold">Google</p>
                <p className="text-gray-400 text-sm">28 Jul 2024</p>
              </div>
              <p className="ml-auto text-gray-800 text-sm font-semibold">KES 125</p>
            </div>

            <div className="flex items-center">
              <div className="relative flex items-center justify-center rounded-2xl border border-gray-400 w-10 h-10"> </div>
              <div className="ml-3 flex flex-col items-start justify-center">
                <p className="text-gray-800 font-semibold">Nike</p>
                <p className="text-gray-400 text-sm">05 Aug 2024</p>
              </div>
              <p className="ml-auto text-gray-800 text-sm font-semibold">KES 1745</p>
            </div>

            <div className="flex items-center">
              <div className="relative flex items-center justify-center rounded-2xl border border-gray-400 w-10 h-10"> </div>
              <div className="ml-3 flex flex-col items-start justify-center">
                <p className="text-gray-800 font-semibold">Uber</p>
                <p className="text-gray-400 text-sm">08 Aug 2024</p>
              </div>
              <p className="ml-auto text-gray-800 text-sm font-semibold">KES 410</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard