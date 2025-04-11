import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RevenueExpensesTrendProps {
  data?: {
    month: string;
    revenue: number;
    expenses: number;
  }[];
  title?: string;
  subtitle?: string;
  period?: "monthly" | "quarterly" | "yearly";
}

const RevenueExpensesTrend = ({
  data = [
    { month: "Jan", revenue: 24000, expenses: 18000 },
    { month: "Feb", revenue: 26000, expenses: 17500 },
    { month: "Mar", revenue: 25000, expenses: 19000 },
    { month: "Apr", revenue: 28500, expenses: 20100 },
    { month: "May", revenue: 30200, expenses: 21500 },
    { month: "Jun", revenue: 29800, expenses: 22000 },
    { month: "Jul", revenue: 32000, expenses: 23400 },
    { month: "Aug", revenue: 34500, expenses: 24200 },
    { month: "Sep", revenue: 33800, expenses: 24800 },
    { month: "Oct", revenue: 36000, expenses: 25500 },
    { month: "Nov", revenue: 37500, expenses: 26200 },
    { month: "Dec", revenue: 38200, expenses: 27000 },
  ],
  title = "Revenue vs Expenses Trend",
  subtitle = "Monthly comparison of revenue and expenses",
  period = "monthly",
}: RevenueExpensesTrendProps) => {
  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-PH", {
      currencySign: "standard",
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-md shadow-md">
          <p className="font-bold text-gray-800">{label}</p>
          <p className="text-[#1C61A1]">
            Revenue: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-[#0078D7]">
            Expenses: {formatCurrency(payload[1].value)}
          </p>
          <p className="text-[#20476E] font-semibold">
            Profit: {formatCurrency(payload[0].value - payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-[#20476E]">
          {title}
        </CardTitle>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#1C61A1] mr-2"></div>
                <span className="text-sm">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#0078D7] mr-2"></div>
                <span className="text-sm">Expenses</span>
              </div>
            </div>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#20476E" }}
                  axisLine={{ stroke: "#DCDCDC" }}
                />
                <YAxis
                  tick={{ fill: "#20476E" }}
                  axisLine={{ stroke: "#DCDCDC" }}
                  tickFormatter={(value) => `₱${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1C61A1"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#1C61A1", strokeWidth: 0 }}
                  activeDot={{
                    r: 6,
                    fill: "#1C61A1",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#0078D7"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#0078D7", strokeWidth: 0 }}
                  activeDot={{
                    r: 6,
                    fill: "#0078D7",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="quarterly" className="w-full h-[300px]">
            <div className="flex items-center justify-center h-full text-gray-500">
              Quarterly data visualization will appear here
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="w-full h-[300px]">
            <div className="flex items-center justify-center h-full text-gray-500">
              Yearly data visualization will appear here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RevenueExpensesTrend;
