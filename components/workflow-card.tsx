"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Users } from "lucide-react"

export type Workflow = {
  id: number
  title: string
  description: string
  category: string
  steps: number
  icon: React.ReactNode
  tags: string[]
  author?: string
  duration?: string
  popularity?: number
}

interface WorkflowCardProps {
  workflow: Workflow
  onViewDetails?: (id: number) => void
  index?: number
}

export function WorkflowCard({ workflow, onViewDetails, index }: WorkflowCardProps) {
  const router = useRouter()
  const handleView = () => {
    if (onViewDetails) return onViewDetails(workflow.id)
    router.push(`/workflows/${workflow.id}`)
  }

  return (
    <Card
      className="group transition-all-smooth hover-lift cursor-pointer border-2 hover:border-primary/50 animate-fade-in-up"
      style={{ animationDelay: index != null ? `${index * 0.1}s` : undefined }}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all-smooth">
              {workflow.icon}
            </div>
            <Badge variant="secondary">{workflow.category}</Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{workflow.steps} steps</span>
          </div>
        </div>
        <CardTitle className="font-montserrat font-bold group-hover:text-primary transition-colors">
          {workflow.title}
        </CardTitle>
        <CardDescription className="text-base">{workflow.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {workflow.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {workflow.author && (
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <span>by {workflow.author}</span>
            {workflow.popularity && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{workflow.popularity}</span>
              </div>
            )}
          </div>
        )}

        <Button
          className="w-full transition-all-smooth group-hover:bg-primary group-hover:text-primary-foreground"
          onClick={handleView}
          aria-label={`View workflow ${workflow.title}`}
        >
          View Workflow
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )
}
