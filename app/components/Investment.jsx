
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { RefreshCw, TrendingUp, DollarSign, Bitcoin } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';


const API_KEY = 'BMBZAZ4F5I72GMGS'; // Replace with your Alpha Vantage API key

const fetchData = async (symbol, isStock) => {
    const functionName = isStock ? 'TIME_SERIES_DAILY' : 'DIGITAL_CURRENCY_DAILY';
    const market = isStock ? '' : '&market=USD';
    const url = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbol}${market}&apikey=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return isStock ? data['Time Series (Daily)'] : data['Time Series (Digital Currency Daily)'];
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
  const processData = (rawData, isStock) => {
    if (!rawData) return [];
  
    return Object.entries(rawData).slice(0, 30).reverse().map(([date, values]) => ({
      date,
      value: isStock ? parseFloat(values['4. close']) : parseFloat(values['4a. close (USD)']),
    }));
  };
  
  const calculatePerformance = (data) => {
    if (data.length < 2) return 0;
    const latestPrice = data[data.length - 1].value;
    const previousPrice = data[data.length - 2].value;
    return ((latestPrice - previousPrice) / previousPrice) * 100;
  };
  
  const Investment = () => {
    const [activeTab, setActiveTab] = useState('stocks');
    const [stockData, setStockData] = useState({});
    const [cryptoData, setCryptoData] = useState({});
    const [topPerformers, setTopPerformers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB'];
    const cryptoSymbols = ['BTC', 'ETH', 'DOGE', 'ADA', 'XRP'];
  
    const fetchAllData = async () => {
      setIsLoading(true);
      const newStockData = {};
      const newCryptoData = {};
  
      for (const symbol of stockSymbols) {
        const data = await fetchData(symbol, true);
        newStockData[symbol] = processData(data, true);
      }
  
      for (const symbol of cryptoSymbols) {
        const data = await fetchData(symbol, false);
        newCryptoData[symbol] = processData(data, false);
      }
  
      setStockData(newStockData);
      setCryptoData(newCryptoData);
  
      const allPerformances = [
        ...Object.entries(newStockData).map(([symbol, data]) => ({ symbol, performance: calculatePerformance(data), isStock: true })),
        ...Object.entries(newCryptoData).map(([symbol, data]) => ({ symbol, performance: calculatePerformance(data), isStock: false })),
      ];
  
      setTopPerformers(allPerformances.sort((a, b) => b.performance - a.performance).slice(0, 5));
      setIsLoading(false);
    };
  
    useEffect(() => {
      fetchAllData();
    }, []);
  
    const handleRefresh = () => {
      fetchAllData();
    };
  
    const renderLineChart = (data, symbols) => (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" allowDuplicatedCategory={false} />
          <YAxis />
          <Tooltip />
          <Legend />
          {symbols.map((symbol, index) => (
            <Line
              key={symbol}
              type="monotone"
              dataKey="value"
              data={data[symbol]}
              name={symbol}
              stroke={`hsl(${index * 60}, 70%, 50%)`}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  
    const renderPerformanceChart = () => (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topPerformers}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="symbol" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="performance" fill="#8884d8" name="Performance (%)" />
        </BarChart>
      </ResponsiveContainer>
    );
  
    return (
      <div className="p-8 max-w-7xl mx-auto mt-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Financial Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Market Overview</span>
                <RefreshCw
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={handleRefresh}
                  size={24}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="stocks" className="flex items-center"><TrendingUp className="mr-2" size={16} />Stocks</TabsTrigger>
                  <TabsTrigger value="crypto" className="flex items-center"><Bitcoin className="mr-2" size={16} />Cryptocurrencies</TabsTrigger>
                </TabsList>
                <TabsContent value="stocks">
                  {isLoading ? (
                    <p>Loading stock data...</p>
                  ) : (
                    renderLineChart(stockData, stockSymbols)
                  )}
                </TabsContent>
                <TabsContent value="crypto">
                  {isLoading ? (
                    <p>Loading cryptocurrency data...</p>
                  ) : (
                    renderLineChart(cryptoData, cryptoSymbols)
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2" size={24} />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading top performers...</p>
              ) : (
                <ul className="space-y-2">
                  {topPerformers.map((item, index) => (
                    <li key={item.symbol} className="flex justify-between items-center p-2 bg-white rounded shadow">
                      <span className="font-semibold">{item.symbol}</span>
                      <span className={`font-bold ${item.performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.performance.toFixed(2)}%
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading performance data...</p>
            ) : (
              renderPerformanceChart()
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

export default Investment;