"use client"

import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ExternalLink, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { WORKFLOW_ACTIONS } from "@/lib/n8n-workflows"

type Module = {
  title: string
  instructions: string
}

const byId = {
  2: {
    title: "New Hire Onboarding Tracker",
    category: "HR & Onboarding",
    modules: [
      { title: "Submit New Hire Form", instructions: "Fill in the new hire's name, role, and email in the Google Form to kick off the onboarding process." },
      { title: "Drive Folder Created", instructions: "A copy of the Standard Onboarding Folder is automatically created and renamed to the employee's name." },
      { title: "Calendar Check-in Scheduled", instructions: "A '1st Week Check-in' event is added to Google Calendar with the new hire's manager." },
      { title: "Welcome Email Sent", instructions: "A welcome email is sent via Gmail with links to all the new hire's resources." },
    ] as Module[],
  },
  3: {
    title: "IT Helpdesk Router",
    category: "IT & Operations",
    modules: [
      { title: "Submit Support Form", instructions: "Employee fills out the IT support form with ticket details, category, urgency, and description." },
      { title: "Ticket Logged in Sheet", instructions: "The request is automatically logged into the master Google Sheet (IT Tickets)." },
      { title: "IT Chat Notified", instructions: "A notification is sent to the Google Chat #IT-Support space so the team can act fast." },
    ] as Module[],
  },
  4: {
    title: "End-of-Day Summary",
    category: "Reporting",
    modules: [
      { title: "Trigger at 5:00 PM", instructions: "The workflow fires automatically at the scheduled time every workday." },
      { title: "Read Daily Sheet", instructions: "The last 20 rows of the daily Google Sheet are read and collected." },
      { title: "Format Summary", instructions: "The raw data is formatted into a clean, readable summary paragraph." },
      { title: "Email Summary", instructions: "The formatted summary is sent via Gmail to the manager." },
    ] as Module[],
  },
} satisfies Record<number, { title: string; category: string; modules: Module[] }>

export default function WorkflowDetailsPage() {
  const params = useParams()
  const idNum = Number(params?.id)
  const router = useRouter()
  const wf = (byId as any)[idNum] as (typeof byId)[2] | undefined
  const action = WORKFLOW_ACTIONS[idNum]
  const [completed, setCompleted] = useState<Record<number, boolean>>({})
  const [showHelp, setShowHelp] = useState(false)
  const [activating, setActivating] = useState(false)

  const allDone = useMemo(() => {
    if (!wf) return false
    return wf.modules.every((_, idx) => completed[idx])
  }, [wf, completed])

  async function handleActivate() {
    if (!action) return

    if (action.type === "form") {
      window.open(action.url, "_blank", "noopener,noreferrer")
      toast.success("Form opened in a new tab")
      return
    }

    setActivating(true)
    try {
      const method = action.type === "webhook" ? (action.method ?? "POST") : "POST"
      const res = await fetch(action.url, { method })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      toast.success("Workflow activated successfully!")
    } catch {
      toast.error("Failed to activate workflow. Please try again.")
    } finally {
      setActivating(false)
    }
  }

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

  const buttonLabel = action?.label ?? "Activate Workflow"
  const isForm = action?.type === "form"

  return (
    <main className="container py-10 px-4">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight animate-fade-in-up">{wf.title}</h1>
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
                  <CardTitle className="font-heading font-bold flex items-center justify-between">
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
            <Button
              className="w-full h-12 text-base"
              disabled={!allDone || activating}
              onClick={handleActivate}
            >
              {activating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Activating...
                </>
              ) : (
                <>
                  {isForm && <ExternalLink className="w-4 h-4 mr-2" />}
                  {allDone ? buttonLabel : "Complete all modules to activate"}
                </>
              )}
            </Button>
          </div>
        </div>

        <aside className="space-y-4">
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-heading font-bold">Gamification</CardTitle>
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
                <CardTitle className="font-heading font-bold">Assistant</CardTitle>
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
