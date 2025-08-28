"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export function ProfileSheet({ triggerClassName = "" }: { triggerClassName?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Open profile panel"
          className={`flex items-center justify-center w-12 h-12 rounded-full border bg-card text-foreground shadow-sm hover-lift transition-all-smooth ${triggerClassName}`}
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-montserrat font-bold">Your Profile</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border p-4 bg-card animate-fade-in-up">
            <p className="text-sm text-muted-foreground">Manage your account and preferences.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" asChild>
              <Link href="/profile">View profile</Link>
            </Button>
            <Button variant="outline">Edit profile</Button>
            <Button variant="outline">Permissions</Button>
            <Button variant="outline">Profile analysis</Button>
            <Button className="col-span-2">Post</Button>
          </div>
          <div className="rounded-lg border p-4 bg-card">
            <p className="text-sm font-medium mb-2">Badges</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">
                Starter
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">
                Contributor
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">
                Mentor
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
