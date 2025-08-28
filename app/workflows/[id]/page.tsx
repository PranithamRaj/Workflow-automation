"use client"

import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"

type Module = {
  title: string
  instructions: string
}

const byId = {
  1: {
    title: "Email to Slack Notification",
    category: "Communication",
    modules: [
      { title: "Connect Email", instructions: "Connect your email provider and set filters for important messages." },
      { title: "Connect Slack", instructions: "Authorize Slack and select the channel for notifications." },
      { title: "Map Fields", instructions: "Map email fields to Slack message content and test the flow." },
    ] as Module[],
  },
  2: {
    title: "Database Backup Automation",
    category: "Data Management",
    modules: [
      { title: "Connect DB", instructions: "Add connection URL and select the backup schedule." },
      { title: "Storage", instructions: "Choose cloud storage and configure retention." },
      { title: "Alerts", instructions: "Set email or Slack alerts on backup success/failure." },
      { title: "Test", instructions: "Run a test backup to verify permissions and connectivity." },
      { title: "Monitor", instructions: "Enable monitoring and weekly report summaries." },
    ] as Module[],
  },
  3: {
    title: "Calendar Event Sync",
    category: "Productivity",
    modules: [
      { title: "Connect Google Calendar", instructions: "Authorize calendar and select primary calendars to sync." },
      { title: "Connect PM Tool", instructions: "Choose your project management tool and authenticate." },
      { title: "Rules", instructions: "Choose which events should be synced and how they are mapped." },
      { title: "Test", instructions: "Perform a dry run to see changes before syncing." },
    ] as Module[],
  },
} satisfies Record<number, { title: string; category: string; modules: Module[] }>

export default function WorkflowDetailsPage() {
  const params = useParams()
  const idNum = Number(params?.id)
  const router = useRouter()
  const wf = (byId as any)[idNum] as (typeof byId)[1] | undefined
  const [completed, setCompleted] = useState<Record<number, boolean>>({})
  const [showHelp, setShowHelp] = useState(false)

  const allDone = useMemo(() => {
    if (!wf) return false
    return wf.modules.every((_, idx) => completed[idx])
  }, [wf, completed])

  if (!wf) {
    return (
      <main className="container py-12 px-4">
        <p className="text-muted-foreground">Workflow not found.</p>
        <Button className="mt-4" onClick={() => router.push("/automate")}>
          Back to Automate
        </Button>
      </main>
    )
  }

  return (
    <main className="container py-10 px-4">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-montserrat font-black text-3xl md:text-4xl animate-fade-in-up">{wf.title}</h1>
            <Badge variant="secondary" className="mt-2">
              {wf.category}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowHelp((s) => !s)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              {showHelp ? "Hide Assistant" : "Ask Assistant"}
            </Button>
            <Button variant="ghost" onClick={() => router.push("/automate")}>
              All Workflows
            </Button>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {wf.modules.map((m, idx) => {
            const done = !!completed[idx]
            return (
              <Card
                key={idx}
                className={`transition-all-smooth ${done ? "border-primary/60" : ""} animate-fade-in-up`}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <CardHeader>
                  <CardTitle className="font-montserrat font-bold flex items-center justify-between">
                    <span>
                      {idx + 1}. {m.title}
                    </span>
                    <button
                      onClick={() => setCompleted((c) => ({ ...c, [idx]: !c[idx] }))}
                      className={`text-xs rounded-full px-2 py-1 border ${done ? "bg-primary text-primary-foreground" : "bg-card"}`}
                      aria-pressed={done}
                    >
                      {done ? "Completed" : "Mark done"}
                    </button>
                  </CardTitle>
                  <CardDescription>{m.instructions}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}

          <div className="pt-2">
            <Button className="w-full h-12 text-base" disabled={!allDone}>
              {allDone ? "Activate Workflow" : "Complete all modules to activate"}
            </Button>
          </div>
        </div>

        <aside className="space-y-4">
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-montserrat font-bold">Gamification</CardTitle>
              <CardDescription>Earn rewards as you complete modules.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">Module Novice</span>
              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">Consistency</span>
              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">Pro Automator</span>
            </CardContent>
          </Card>

          {showHelp && (
            <Card className="animate-slide-in-right">
              <CardHeader>
                <CardTitle className="font-montserrat font-bold">Assistant</CardTitle>
                <CardDescription>Inline help while completing modules.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Botpress integration placeholder. Hook your Botpress webchat here.
                </p>
                <Button variant="outline" onClick={() => alert("Botpress widget would open here.")}>
                  Open Chat
                </Button>
              </CardContent>
            </Card>
          )}
        </aside>
      </section>
    </main>
  )
}
