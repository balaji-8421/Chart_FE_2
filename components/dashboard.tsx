"use client"

import { useState } from "react"
import { BarChart, LineChart, PieChart, ScatterChart, AreaChart } from "recharts"
import {
  Bar,
  Line,
  Pie,
  Scatter,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import {
  ArrowUpRight,
  BarChart3,
  LineChartIcon,
  PieChartIcon,
  ScatterChartIcon,
  AreaChartIcon,
  TableIcon,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  monthlySalesData,
  productPerformanceData,
  marketShareData,
  customerAcquisitionData,
  revenueByChannelData,
} from "@/lib/data"
import DataTable from "./data-table"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="container mx-auto py-8 px-4 relative z-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Interactive data visualization with multiple chart types</p>
      </header>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4" />
            <span className="hidden md:inline">Sales</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            <span className="hidden md:inline">Products</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <ScatterChartIcon className="h-4 w-4" />
            <span className="hidden md:inline">Customers</span>
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <AreaChartIcon className="h-4 w-4" />
            <span className="hidden md:inline">Channels</span>
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center gap-2">
            <TableIcon className="h-4 w-4" />
            <span className="hidden md:inline">Table</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Monthly Sales</CardTitle>
                <CardDescription>Revenue trends over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    target: {
                      label: "Target",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <BarChart data={monthlySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => value.substring(0, 3)}
                    />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}k`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" fill="var(--color-target)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                  <span className="font-medium text-emerald-500">+12.5%</span>
                  <span className="ml-1">from previous period</span>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Market Share</CardTitle>
                <CardDescription>Distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={marketShareData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {marketShareData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`$${value}k`, name]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="grid grid-cols-3 gap-2 w-full">
                  {marketShareData.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-xs truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>Monthly revenue and growth trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                  growth: {
                    label: "Growth",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <LineChart data={monthlySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}k`} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="growth"
                    stroke="var(--color-growth)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Sales vs. Satisfaction rating</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sales: {
                    label: "Sales",
                    color: "hsl(var(--chart-1))",
                  },
                  satisfaction: {
                    label: "Satisfaction",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="sales"
                    name="Sales"
                    unit="k"
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    label={{ value: "Sales ($k)", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="satisfaction"
                    name="Satisfaction"
                    unit="/10"
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 10]}
                    label={{ value: "Satisfaction", angle: -90, position: "insideLeft" }}
                  />
                  <ChartTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={
                      <ChartTooltipContent
                        formatter={(value, name, props) => {
                          if (name === "sales") return [`$${value}k`, "Sales"]
                          if (name === "satisfaction") return [`${value}/10`, "Satisfaction"]
                          return [value, name]
                        }}
                      />
                    }
                  />
                  <Scatter name="Products" data={productPerformanceData} fill="var(--color-sales)" />
                </ScatterChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>New vs. Returning customers over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  new: {
                    label: "New Customers",
                    color: "hsl(var(--chart-1))",
                  },
                  returning: {
                    label: "Returning Customers",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <AreaChart data={customerAcquisitionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="new"
                    stackId="1"
                    stroke="var(--color-new)"
                    fill="var(--color-new)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="returning"
                    stackId="1"
                    stroke="var(--color-returning)"
                    fill="var(--color-returning)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Channel</CardTitle>
              <CardDescription>Distribution across marketing channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueByChannelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {revenueByChannelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`$${value}k`, "Revenue"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Revenue",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <BarChart
                      data={revenueByChannelData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}k`} />
                      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} barSize={30}>
                        {revenueByChannelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="table" className="space-y-4">
          <DataTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
