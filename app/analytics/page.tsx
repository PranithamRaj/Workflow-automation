"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", completed: 2, downloads: 120 },
  { name: "Tue", completed: 3, downloads: 160 },
  { name: "Wed", completed: 1, downloads: 90 },
  { name: "Thu", completed: 4, downloads: 210 },
  { name: "Fri", completed: 5, downloads: 260 },
  { name: "Sat", completed: 3, downloads: 140 },
  { name: "Sun", completed: 2, downloads: 100 },
]

export default function AnalyticsPage() {
  return (
    <main className="container py-10 px-4">
      <header className="mb-8">
        <h1 className="font-montserrat font-black text-3xl md:text-4xl">Analytics</h1>
        <p className="text-muted-foreground">Track usage stats and engagement.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat font-bold">Workflows Completed</CardTitle>
            <CardDescription>Weekly completion trends</CardDescription>
          </CardHeader>
          <CardContent style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat font-bold">Downloads</CardTitle>
            <CardDescription>Weekly downloads trends</CardDescription>
          </CardHeader>
          <CardContent style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="downloads" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
