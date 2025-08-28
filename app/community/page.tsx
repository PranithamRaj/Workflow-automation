"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import Link from "next/link"

const categories = [
  { slug: "it-devops", name: "IT & DevOps", members: 5421, online: 231 },
  { slug: "students-education", name: "Students & Education", members: 3280, online: 129 },
  { slug: "data-analytics", name: "Data Analytics", members: 4120, online: 167 },
  { slug: "business-entrepreneurship", name: "Business & Entrepreneurship", members: 2987, online: 102 },
  { slug: "others", name: "Others (expandable)", members: 953, online: 23 },
]

export default function CommunityPage() {
  return (
    <main className="container py-10 px-4">
      <header className="text-center mb-10">
        <h1 className="font-montserrat font-black text-3xl md:text-4xl">Community</h1>
        <p className="text-muted-foreground">Join groups, ask questions, and connect via voice channels.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c, i) => (
          <Card
            key={c.slug}
            className="transition-all-smooth hover-lift animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <CardHeader>
              <CardTitle className="font-montserrat font-bold flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                {c.name}
              </CardTitle>
              <CardDescription>
                {c.members} members • {c.online} online
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Mentor Section (expert guidance)</li>
                <li>Queries Section (Q&A forum)</li>
                <li>Voice Communication Channel (Discord-like)</li>
              </ul>
              <div className="mt-4">
                <Link href={`/community/${c.slug}`} className="text-primary hover:underline">
                  Enter {c.name}
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
