"use client"

import type React from "react"
import { useRef } from "react"

type TiltCardProps = {
  className?: string
  children: React.ReactNode
  maxTiltDeg?: number
}

export function TiltCard({ className = "", children, maxTiltDeg = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2
    const rotY = ((x - midX) / midX) * maxTiltDeg
    const rotX = -((y - midY) / midY) * maxTiltDeg
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={["transition-transform duration-200 ease-out will-change-transform", className].join(" ")}
    >
      {children}
    </div>
  )
}
