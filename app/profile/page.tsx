"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  return (
    <main className="container py-10 px-4">
      <header className="mb-8">
        <h1 className="font-montserrat font-black text-3xl md:text-4xl">Your Profile</h1>
        <p className="text-muted-foreground">Manage your public profile and saved content.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="font-montserrat font-bold">Overview</CardTitle>
            <CardDescription>Social stats and badges.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              Followers: <strong>156</strong>
            </div>
            <div className="text-sm">
              Following: <strong>89</strong>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Starter</Badge>
              <Badge>Contributor</Badge>
              <Badge>Mentor</Badge>
            </div>
            <Button className="w-full">Edit Profile</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-montserrat font-bold">Past Works & Contributions</CardTitle>
            <CardDescription>Showcase your automations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>• Email → Slack Notification (2.1k downloads)</div>
            <div>• Calendar Sync Pro (1.4k downloads)</div>
            <div>• DB Backup Essentials (1.1k downloads)</div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="font-montserrat font-bold">Contact</CardTitle>
            <CardDescription>Reach out directly.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>Email: you@example.com</div>
            <div>Website: example.com</div>
            <div>Discord: you#1234</div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-montserrat font-bold">Saved Workflows</CardTitle>
            <CardDescription>Quick access to your favorites.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>• Error Alert to PagerDuty</div>
            <div>• Weekly Report Email</div>
            <div>• Content Publishing Pipeline</div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
