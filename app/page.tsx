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
import { Search, Zap, Users, MessageCircle, Play, Settings, Database, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import { NotificationMenu } from "@/components/notification-menu"
import { PopularCarousel } from "@/components/popular-carousel"
import { ProfileSheet } from "@/components/profile-sheet"
import { Reveal } from "@/components/reveal"
import { TiltCard } from "@/components/tilt-card"
import { AnimatedCounter } from "@/components/animated-counter"

const sampleWorkflows = [
  {
    id: 1,
    title: "Email to Slack Notification",
    description: "Automatically send Slack notifications when important emails arrive",
    category: "Communication",
    steps: 3,
    icon: <Mail className="w-6 h-6" />,
    tags: ["Email", "Slack", "Notifications"],
  },
  {
    id: 2,
    title: "Database Backup Automation",
    description: "Schedule daily database backups and store them in cloud storage",
    category: "Data Management",
    steps: 5,
    icon: <Database className="w-6 h-6" />,
    tags: ["Database", "Backup", "Cloud"],
  },
  {
    id: 3,
    title: "Calendar Event Sync",
    description: "Sync events between Google Calendar and project management tools",
    category: "Productivity",
    steps: 4,
    icon: <Calendar className="w-6 h-6" />,
    tags: ["Calendar", "Sync", "Productivity"],
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg animate-pulse-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-montserrat font-black text-xl text-primary">WorkflowHub</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/automate" className="text-sm font-medium hover:text-primary transition-colors">
              Start Automating
            </Link>
            <Link href="/automate#workflows" className="text-sm font-medium hover:text-primary transition-colors">
              Workflows
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors">
              Community
            </Link>
            <NotificationMenu />
            <Button asChild variant="outline" size="sm" className="transition-all-smooth hover-lift bg-transparent">
              <Link href="/profile">Profile</Link>
            </Button>
            <Button size="sm" className="transition-all-smooth hover-lift">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Reveal>
            <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <h1 className="font-montserrat font-black text-4xl md:text-6xl lg:text-7xl mb-6 text-foreground">
                Automate Your
                <span className="text-primary block animate-float">Workflows</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover, share, and create powerful automation workflows with n8n. Join thousands of professionals
                streamlining their work processes.
              </p>
            </div>
          </Reveal>
          {/* Search Bar */}
          <Reveal delayMs={100}>
            <div
              className={`max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-300 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search workflows, automations, or use cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 focus:border-primary transition-all-smooth hover-lift"
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
                className="text-lg px-8 py-6 transition-all-smooth hover-lift bg-transparent"
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
      <section id="workflows" className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <PopularCarousel workflows={filteredWorkflows as any} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">Why Choose WorkflowHub?</h2>
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
                  <Card className="h-full text-center transition-all-smooth hover-lift animate-fade-in-up">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="font-montserrat font-bold">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Stats Section with Animated Counters */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
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
      <section id="community" className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">Join Our Community</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with automation enthusiasts, share your workflows, and get help from experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="transition-all-smooth hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center font-montserrat font-bold">
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

            <Card className="transition-all-smooth hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center font-montserrat font-bold">
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
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-montserrat font-black text-3xl md:text-5xl mb-6">Ready to Automate?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have streamlined their workflows with WorkflowHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 transition-all-smooth hover-lift animate-pulse-glow" asChild>
              <Link href="/automate">Start Free Trial</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 transition-all-smooth hover-lift bg-transparent"
              asChild
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-montserrat font-black text-xl text-primary">WorkflowHub</span>
              </div>
              <p className="text-muted-foreground">Empowering professionals with intelligent workflow automation.</p>
            </div>

            <div>
              <h3 className="font-montserrat font-bold mb-4">Product</h3>
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
              <h3 className="font-montserrat font-bold mb-4">Community</h3>
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
              <h3 className="font-montserrat font-bold mb-4">Support</h3>
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

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 WorkflowHub. All rights reserved.</p>
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
