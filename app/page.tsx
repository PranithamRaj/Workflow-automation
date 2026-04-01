"use client"

import { CardContent } from "@/components/ui/card"
import { CardDescription } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Zap, Users, MessageCircle, Play, Settings, FileText, BarChart2, UserPlus } from "lucide-react"
import Link from "next/link"
import { NotificationMenu } from "@/components/notification-menu"
import { PopularCarousel } from "@/components/popular-carousel"
import { ProfileSheet } from "@/components/profile-sheet"
import { Reveal } from "@/components/reveal"
import { TiltCard } from "@/components/tilt-card"
import { AnimatedCounter } from "@/components/animated-counter"

const sampleWorkflows = [
  {
    id: 2,
    title: "New Hire Onboarding Tracker",
    description: "HR submits a form and the workflow instantly creates a Drive folder, schedules a check-in, and sends the new hire a welcome email.",
    category: "HR & Onboarding",
    steps: 4,
    icon: <UserPlus className="w-6 h-6" />,
    tags: ["Google Forms", "Google Drive", "Google Calendar", "Gmail"],
    author: "WorkflowHub",
    duration: "~4 min setup",
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
    duration: "~3 min setup",
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
    duration: "~4 min setup",
    popularity: 978,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredWorkflows, setFilteredWorkflows] = useState(sampleWorkflows)
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    function isEditable(el: EventTarget | null) {
      return (
        (el instanceof HTMLElement && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) ||
        false
      )
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && !isEditable(e.target)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    const filtered = sampleWorkflows.filter(
      (workflow) =>
        workflow.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workflow.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    setFilteredWorkflows(filtered)
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg animate-pulse-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-extrabold text-xl text-primary tracking-tight">WorkflowHub</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/automate" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Start Automating
            </Link>
            <Link href="/automate#workflows" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Workflows
            </Link>
            <Link href="/community" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
            <NotificationMenu />
            <Button asChild variant="outline" size="sm" className="transition-all-smooth hover-lift bg-transparent border-border/60">
              <Link href="/profile">Profile</Link>
            </Button>
            <Button size="sm" className="transition-all-smooth hover-lift animate-pulse-glow">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-28 md:py-36 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="absolute top-[-15%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[8%] w-[420px] h-[420px] rounded-full bg-accent/[0.04] blur-[120px]" />

        <div className="container mx-auto text-center relative z-10">
          <Reveal>
            <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <h1 className="font-heading font-extrabold text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
                Automate Your
                <span className="text-gradient block animate-float">Workflows</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                Discover, share, and create powerful automation workflows with n8n. Join thousands of professionals
                streamlining their work processes.
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <div
              className={`max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-300 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search workflows, automations, or use cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm focus:border-primary/60 focus:shadow-[0_0_24px_oklch(0.77_0.152_192/0.1)] transition-all-smooth"
                  aria-label="Search workflows"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={200}>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            >
              <Button size="lg" className="text-lg px-8 py-6 transition-all-smooth hover-lift" asChild>
                <Link href="/automate">
                  <Play className="w-5 h-5 mr-2" />
                  Start Automating
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 transition-all-smooth hover-lift bg-transparent border-border/60"
                asChild
              >
                <Link href="/community">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Workflows */}
      <section id="workflows" className="relative py-20 px-4">
        <div className="absolute inset-0 bg-card/30" />
        <div className="container mx-auto relative z-10">
          <PopularCarousel workflows={filteredWorkflows as any} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Why Choose WorkflowHub?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, share, and manage your automation workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Easy Automation",
                description: "Create powerful workflows with our intuitive drag-and-drop interface",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Driven",
                description: "Share workflows and learn from thousands of automation experts",
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "Advanced Features",
                description: "Access premium integrations and advanced workflow management tools",
              },
            ].map((feature, index) => (
              <Reveal key={feature.title} delayMs={index * 120}>
                <TiltCard className="h-full">
                  <Card className="h-full text-center transition-all-smooth hover-lift hover:border-primary/30 animate-fade-in-up border-border/60">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="font-heading font-bold">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y border-border/40">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:divide-x sm:divide-border/40">
            <Reveal as="div" delayMs={0}>
              <div>
                <AnimatedCounter end={2400} suffix="+" className="text-4xl font-extrabold text-primary" />
                <p className="mt-1 text-sm text-muted-foreground">Workflows Published</p>
              </div>
            </Reveal>
            <Reveal as="div" delayMs={120}>
              <div>
                <AnimatedCounter end={12300} suffix="+" className="text-4xl font-extrabold text-primary" />
                <p className="mt-1 text-sm text-muted-foreground">Active Users</p>
              </div>
            </Reveal>
            <Reveal as="div" delayMs={240}>
              <div>
                <AnimatedCounter end={200} suffix="+" className="text-4xl font-extrabold text-primary" />
                <p className="mt-1 text-sm text-muted-foreground">Integrations</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Join Our Community</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with automation enthusiasts, share your workflows, and get help from experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="transition-all-smooth hover-lift border-border/60 hover:border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center font-heading font-bold">
                  <MessageCircle className="w-6 h-6 mr-3 text-primary" />
                  Discussion Forum
                </CardTitle>
                <CardDescription>
                  Ask questions, share tips, and discuss automation strategies with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { user: "Alex Chen", topic: "Best practices for email automation", replies: 12 },
                    { user: "Sarah Kim", topic: "Integrating Slack with project management", replies: 8 },
                    { user: "Mike Johnson", topic: "Database backup strategies", replies: 15 },
                  ].map((discussion, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {discussion.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{discussion.topic}</p>
                        <p className="text-xs text-muted-foreground">
                          by {discussion.user} • {discussion.replies} replies
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 transition-all-smooth">Join Discussion</Button>
              </CardContent>
            </Card>

            <Card className="transition-all-smooth hover-lift border-border/60 hover:border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center font-heading font-bold">
                  <Users className="w-6 h-6 mr-3 text-primary" />
                  User Profiles
                </CardTitle>
                <CardDescription>
                  Create your profile, showcase your workflows, and build your automation portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Emma Wilson", workflows: 23, followers: 156 },
                    { name: "David Park", workflows: 18, followers: 89 },
                    { name: "Lisa Garcia", workflows: 31, followers: 203 },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Avatar>
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.workflows} workflows • {user.followers} followers
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 transition-all-smooth">Create Profile</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-primary/[0.05] blur-[140px]" />

        <div className="container mx-auto text-center relative z-10">
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl mb-6 tracking-tight">Ready to Automate?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto font-light">
            Join thousands of professionals who have streamlined their workflows with WorkflowHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 transition-all-smooth hover-lift animate-pulse-glow" asChild>
              <Link href="/automate">Start Free Trial</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 transition-all-smooth hover-lift bg-transparent border-border/60"
              asChild
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-heading font-extrabold text-xl text-primary tracking-tight">WorkflowHub</span>
              </div>
              <p className="text-muted-foreground">Empowering professionals with intelligent workflow automation.</p>
            </div>

            <div>
              <h3 className="font-heading font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Workflows
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-bold mb-4">Community</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2026 WorkflowHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg animate-pulse-glow transition-all-smooth hover-lift"
          onClick={() => {
            // Placeholder for Botpress integration
            alert("Chatbot integration coming soon!")
          }}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <ProfileSheet />
      </div>
    </div>
  )
}
