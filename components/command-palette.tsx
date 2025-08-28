"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

type Command = {
  label: string
  href: string
  keywords?: string[]
}

const COMMANDS: Command[] = [
  { label: "Start Automating", href: "/automate", keywords: ["workflows", "search", "start"] },
  { label: "Community", href: "/community", keywords: ["forum", "mentor", "voice"] },
  { label: "Analytics", href: "/analytics", keywords: ["charts", "metrics", "data"] },
  { label: "Home", href: "/", keywords: ["landing", "hero", "intro"] },
  { label: "Pricing", href: "/pricing", keywords: ["plans", "subscribe", "upgrade"] },
]

function match(q: string, c: Command) {
  const s = (c.label + " " + (c.keywords || []).join(" ")).toLowerCase()
  return s.includes(q.toLowerCase())
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const results = useMemo(() => (query.trim() ? COMMANDS.filter((c) => match(query, c)) : COMMANDS), [query])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC")
      if ((isMac && e.metaKey && e.key.toLowerCase() === "k") || (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      {/* Launcher Button */}
      <button
        type="button"
        aria-label="Open command palette"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-primary text-primary-foreground px-4 py-2 shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Search ⌘K
      </button>

      {/* Dialog */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          className="fixed inset-0 z-50 grid place-items-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-4 w-full max-w-lg rounded-lg border border-border bg-background p-3 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, e.g. 'Automate'..."
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary"
            />

            <ul className="mt-3 max-h-64 overflow-auto divide-y">
              {results.length === 0 && <li className="p-3 text-sm text-muted-foreground">No results</li>}
              {results.map((cmd) => (
                <li key={cmd.href} className="p-0">
                  <Link
                    href={cmd.href}
                    onClick={() => setOpen(false)}
                    className="block p-3 text-sm hover:bg-muted focus:bg-muted focus:outline-none"
                  >
                    {cmd.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex items-center justify-between px-1">
              <span className="text-xs text-muted-foreground">Press Esc to close</span>
              <span className="text-xs text-muted-foreground">Cmd/Ctrl + K</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
