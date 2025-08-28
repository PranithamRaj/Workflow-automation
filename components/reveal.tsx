"use client"

import type React from "react"
import { useEffect, useRef } from "react"

type RevealProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  delayMs?: number
}

export function Reveal({ as = "div", className = "", children, delayMs = 0 }: RevealProps) {
  const Comp = as as any
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      el.classList.remove("opacity-0", "translate-y-4")
      el.classList.add("opacity-100", "translate-y-0")
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            if (delayMs) target.style.transitionDelay = `${delayMs}ms`
            target.classList.remove("opacity-0", "translate-y-4")
            target.classList.add("opacity-100", "translate-y-0")
            obs.unobserve(target)
          }
        })
      },
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delayMs])

  return (
    <Comp
      ref={ref}
      className={[
        "opacity-0 translate-y-4 transition-all duration-700 ease-out will-change-transform will-change-opacity",
        className,
      ].join(" ")}
    >
      {children}
    </Comp>
  )
}
