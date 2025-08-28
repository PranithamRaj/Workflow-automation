"use client"

import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Mic, MessageSquare, Heart, Reply } from "lucide-react"

const categories = [
  { slug: "it-devops", name: "IT & DevOps", members: 5421, online: 231 },
  { slug: "students-education", name: "Students & Education", members: 3280, online: 129 },
  { slug: "data-analytics", name: "Data Analytics", members: 4120, online: 167 },
  { slug: "business-entrepreneurship", name: "Business & Entrepreneurship", members: 2987, online: 102 },
  { slug: "others", name: "Others (expandable)", members: 953, online: 23 },
] as const

type Post = {
  id: string
  author: string
  title: string
  body: string
  likes: number
  replies: { id: string; author: string; body: string }[]
}

const seedPosts: Post[] = [
  {
    id: "p1",
    author: "Alex Chen",
    title: "Best practices for email automation",
    body: "What patterns are you using for retrying failed email sends in n8n?",
    likes: 12,
    replies: [
      { id: "r1", author: "Sarah Kim", body: "Use queues and exponential backoff with a max attempt guard." },
      { id: "r2", author: "Mike Johnson", body: "We also tag errors to detect flaky providers." },
    ],
  },
  {
    id: "p2",
    author: "Priya Patel",
    title: "Slack app rate limits",
    body: "Any suggestions to avoid hitting Slack rate limits during peak events?",
    likes: 7,
    replies: [{ id: "r3", author: "Emma Wilson", body: "Batch messages and use a single worker per workspace." }],
  },
]

const mentors = [
  { id: "m1", name: "Emma Wilson", speciality: "Automation Architecture" },
  { id: "m2", name: "David Park", speciality: "Messaging & Notifications" },
  { id: "m3", name: "Lisa Garcia", speciality: "Data Pipelines" },
]

const voiceRooms = [
  { id: "v1", name: "Office Hours", users: 12 },
  { id: "v2", name: "Quick Help", users: 5 },
  { id: "v3", name: "Live Build", users: 18 },
]

export default function CommunityCategoryPage() {
  const params = useParams()
  const slug = String(params?.slug || "")
  const router = useRouter()
  const cat = useMemo(() => categories.find((c) => c.slug === slug), [slug])

  const [tab, setTab] = useState<"mentor" | "queries" | "voice">("queries")
  const [posts, setPosts] = useState<Post[]>(seedPosts)
  const [draftTitle, setDraftTitle] = useState("")
  const [draftBody, setDraftBody] = useState("")
  const [joinedVoice, setJoinedVoice] = useState<string | null>(null)

  if (!cat) {
    return (
      <main className="container py-10 px-4">
        <p className="text-muted-foreground">Community not found.</p>
        <Button className="mt-4" onClick={() => router.push("/community")}>
          Back to Community
        </Button>
      </main>
    )
  }

  const createPost = () => {
    if (!draftTitle.trim() || !draftBody.trim()) return
    setPosts((prev) => [
      {
        id: `p${Date.now()}`,
        author: "You",
        title: draftTitle.trim(),
        body: draftBody.trim(),
        likes: 0,
        replies: [],
      },
      ...prev,
    ])
    setDraftTitle("")
    setDraftBody("")
  }

  const likePost = (id: string) => setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)))

  return (
    <main className="container py-10 px-4">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-montserrat font-black text-3xl md:text-4xl animate-fade-in-up">{cat.name}</h1>
            <p className="text-muted-foreground">
              <span className="inline-flex items-center">
                <Users className="w-4 h-4 mr-1 text-primary" /> {cat.members} members • {cat.online} online
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant={tab === "queries" ? "default" : "outline"} onClick={() => setTab("queries")}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Queries
            </Button>
            <Button variant={tab === "mentor" ? "default" : "outline"} onClick={() => setTab("mentor")}>
              Mentor
            </Button>
            <Button variant={tab === "voice" ? "default" : "outline"} onClick={() => setTab("voice")}>
              <Mic className="w-4 h-4 mr-2" />
              Voice
            </Button>
          </div>
        </div>
      </header>

      {tab === "mentor" && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((m, i) => (
            <Card
              key={m.id}
              className="transition-all-smooth hover-lift animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <CardHeader>
                <CardTitle className="font-montserrat font-bold">{m.name}</CardTitle>
                <CardDescription>{m.speciality}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => alert(`Requested mentorship with ${m.name}`)}>
                  Request Mentor
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {tab === "queries" && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="font-montserrat font-bold">Start a discussion</CardTitle>
                <CardDescription>Ask questions or share insights with the community.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <input
                  aria-label="Post title"
                  placeholder="Title"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full h-11 rounded-md border bg-background px-3 text-sm"
                />
                <textarea
                  aria-label="Post body"
                  placeholder="Write your question or tip..."
                  value={draftBody}
                  onChange={(e) => setDraftBody(e.target.value)}
                  className="w-full min-h-[100px] rounded-md border bg-background p-3 text-sm leading-relaxed"
                />
                <Button onClick={createPost} className="w-full">
                  Post
                </Button>
              </CardContent>
            </Card>

            {posts.map((p, i) => (
              <Card
                key={p.id}
                className="transition-all-smooth hover-lift animate-fade-in-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <CardHeader>
                  <CardTitle className="font-montserrat font-bold">{p.title}</CardTitle>
                  <CardDescription>by {p.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-pretty mb-3">{p.body}</p>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => likePost(p.id)} aria-label="Like post">
                      <Heart className="w-4 h-4 mr-2" />
                      {p.likes} Likes
                    </Button>
                    <Badge variant="secondary">{p.replies.length} Replies</Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    {p.replies.map((r) => (
                      <div key={r.id} className="rounded-md border p-2 text-sm">
                        <span className="font-medium">{r.author}:</span> {r.body}
                      </div>
                    ))}
                  </div>
                  <button
                    className="mt-3 inline-flex items-center text-sm text-primary hover:underline"
                    onClick={() => alert("Reply form coming soon")}
                    aria-label="Reply to thread"
                  >
                    <Reply className="w-4 h-4 mr-1" /> Reply
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <aside className="space-y-4">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="font-montserrat font-bold">Guidelines</CardTitle>
                <CardDescription>Keep it friendly and constructive.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Share reproducible steps and screenshots when possible.</p>
                <p>• Use tags and clear titles.</p>
                <p>• Upvote helpful answers.</p>
              </CardContent>
            </Card>
          </aside>
        </section>
      )}

      {tab === "voice" && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {voiceRooms.map((room, i) => {
            const joined = joinedVoice === room.id
            return (
              <Card
                key={room.id}
                className={`transition-all-smooth hover-lift animate-fade-in-up ${joined ? "border-primary/60" : ""}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <CardHeader>
                  <CardTitle className="font-montserrat font-bold flex items-center">
                    <Mic className="w-5 h-5 mr-2 text-primary" />
                    {room.name}
                  </CardTitle>
                  <CardDescription>{room.users} listening</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    variant={joined ? "default" : "outline"}
                    onClick={() => setJoinedVoice(joined ? null : room.id)}
                  >
                    {joined ? "Leave Room" : "Join Voice"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </section>
      )}
    </main>
  )
}
