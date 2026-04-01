"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserPlus, FileText, BarChart2, Filter } from "lucide-react"
import { WorkflowCard, type Workflow } from "@/components/workflow-card"

const workflows: Workflow[] = [
  {
    id: 2,
    title: "New Hire Onboarding Tracker",
    description: "HR submits a form and the workflow instantly creates a Drive folder, schedules a check-in, and sends a welcome email.",
    category: "HR & Onboarding",
    steps: 4,
    icon: <UserPlus className="w-6 h-6" />,
    tags: ["Google Forms", "Google Drive", "Google Calendar", "Gmail"],
    author: "WorkflowHub",
    popularity: 2310,
  },
  {
    id: 3,
    title: "IT Helpdesk Router",
    description: "Logs hardware and software requests from a Google Form into a master sheet and pings the IT-Support chat instantly.",
    category: "IT & Operations",
    steps: 3,
    icon: <FileText className="w-6 h-6" />,
    tags: ["Google Forms", "Google Sheets", "Google Chat"],
    author: "WorkflowHub",
    popularity: 1205,
  },
  {
    id: 4,
    title: "End-of-Day Summary",
    description: "Reads the day's data from a Google Sheet at 5 PM, formats it into a concise summary, and emails it to the manager.",
    category: "Reporting",
    steps: 4,
    icon: <BarChart2 className="w-6 h-6" />,
    tags: ["Google Sheets", "AI", "Gmail"],
    author: "WorkflowHub",
    popularity: 978,
  },
]

const allTags = Array.from(new Set(workflows.flatMap((w) => w.tags)))

export default function AutomatePage() {
  const [query, setQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const visible = useMemo(() => {
    return workflows.filter((w) => {
      const matchesText =
        w.title.toLowerCase().includes(query.toLowerCase()) || w.description.toLowerCase().includes(query.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.every((t) => w.tags.includes(t))
      return matchesText && matchesTags
    })
  }, [query, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const topTags = useMemo(() => {
    const counts: Record<string, number> = {}
    visible.forEach((w) => w.tags.forEach((t) => (counts[t] = (counts[t] || 0) + 1)))
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([t]) => t)
  }, [visible])

  const recommended = useMemo(() => {
    if (topTags.length === 0) return workflows
    return workflows
      .filter((w) => w.tags.some((t) => topTags.includes(t)))
      .filter((w) => !visible.find((v) => v.id === w.id))
  }, [topTags, visible])

  return (
    <main className="container py-10 px-4">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-3xl md:text-5xl tracking-tight">Start Automating</h1>
          <p className="text-muted-foreground">Search use cases, filter by tags, and preview workflows.</p>
        </div>
        <Button variant="outline" className="transition-all-smooth hover-lift bg-transparent">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </header>

      <div className="max-w-2xl mb-6">
        <Input
          placeholder="Search workflows, automations, or use cases..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 text-base pl-4"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const active = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm border transition-all-smooth ${
                active ? "bg-primary text-primary-foreground" : "bg-card hover-lift"
              }`}
            >
              <Badge variant={active ? "default" : "outline"} className="pointer-events-none">
                {tag}
              </Badge>
            </button>
          )
        })}
      </div>

      <section id="workflows" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((wf, i) => (
          <WorkflowCard key={wf.id} workflow={wf} index={i} />
        ))}
      </section>

      {/* Recommended Section */}
      {recommended.length > 0 && (
        <section className="mt-10">
          <header className="mb-4">
            <h2 className="font-heading font-bold text-2xl">Recommended for you</h2>
            <p className="text-muted-foreground text-sm">Suggestions based on your current filters and browsing.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommended.map((wf, i) => (
              <WorkflowCard key={wf.id} workflow={wf} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
