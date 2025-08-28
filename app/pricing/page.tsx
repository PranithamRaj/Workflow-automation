export default function PricingPage() {
  return (
    <main className="container py-12 px-4">
      <header className="text-center mb-10">
        <h1 className="font-montserrat font-black text-3xl md:text-4xl">Pricing</h1>
        <p className="text-muted-foreground">Choose a plan that scales with you.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Starter",
            price: "$0",
            desc: "For trying things out",
            features: ["Community access", "3 workflows", "Email support"],
          },
          {
            name: "Pro",
            price: "$19/mo",
            desc: "For individuals",
            features: ["Unlimited workflows", "Priority support", "Analytics"],
          },
          {
            name: "Team",
            price: "$49/mo",
            desc: "For teams",
            features: ["Seats & roles", "Mentor hub", "SLA support"],
          },
        ].map((tier, i) => (
          <div
            key={tier.name}
            className="rounded-lg border bg-card p-6 transition-all-smooth hover-lift animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <h2 className="font-montserrat font-bold text-xl">{tier.name}</h2>
            <p className="text-2xl mt-1">{tier.price}</p>
            <p className="text-sm text-muted-foreground mt-1">{tier.desc}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {tier.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="/automate"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground transition-all-smooth hover-lift"
              >
                Get Started
              </a>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
