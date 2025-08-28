"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Workflow, WorkflowCard } from "./workflow-card"

export function PopularCarousel({ workflows }: { workflows: Workflow[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (delta: number) => {
    const node = scrollerRef.current
    if (!node) return
    node.scrollBy({ left: delta, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="text-left">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-1">Popular Workflows</h2>
          <p className="text-lg text-muted-foreground">Trending templates from the community</p>
        </div>
        <div className="hidden md:flex gap-2">
          <Button variant="outline" size="icon" aria-label="Scroll left" onClick={() => scrollBy(-360)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Scroll right" onClick={() => scrollBy(360)}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2"
        style={{ scrollBehavior: "smooth" }}
        aria-label="Popular workflows carousel"
      >
        {workflows.map((wf, i) => (
          <div key={wf.id} className="min-w-[280px] md:min-w-[340px] snap-start">
            <WorkflowCard workflow={wf} index={i} />
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="ghost" asChild className="transition-all-smooth hover-lift">
          <a href="/automate">More</a>
        </Button>
      </div>
    </div>
  )
}
