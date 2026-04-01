export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      desc: "For trying things out",
      features: ["Community access", "3 workflows", "Email support"],
      popular: false,
    },
    {
      name: "Pro",
      price: "$19/mo",
      desc: "For individuals",
      features: ["Unlimited workflows", "Priority support", "Analytics"],
      popular: true,
    },
    {
      name: "Team",
      price: "$49/mo",
      desc: "For teams",
      features: ["Seats & roles", "Mentor hub", "SLA support"],
      popular: false,
    },
  ]

  return (
    <main className="container py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="font-heading font-extrabold text-3xl md:text-5xl tracking-tight">Pricing</h1>
        <p className="text-muted-foreground mt-2">Choose a plan that scales with you.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            className={`rounded-xl border p-6 transition-all-smooth hover-lift animate-fade-in-up ${
              tier.popular
                ? "border-primary/50 bg-primary/[0.04] shadow-[0_0_40px_oklch(0.77_0.152_192/0.06)] relative"
                : "border-border/60 bg-card"
            }`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h2 className="font-heading font-bold text-xl">{tier.name}</h2>
            <p className="text-3xl font-heading font-extrabold mt-2 tracking-tight">{tier.price}</p>
            <p className="text-sm text-muted-foreground mt-1">{tier.desc}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="/automate"
                className={`inline-flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-all-smooth hover-lift ${
                  tier.popular
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
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
