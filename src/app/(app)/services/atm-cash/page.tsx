import { CreditCard, Receipt, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { AtmLocator } from "@/components/services/atm-locator";
import { Card, CardHeader } from "@/components/ui/card";
import { DemoNotice } from "@/components/ui/misc";

export const metadata: Metadata = { title: "ATM & Cash" };

const TIPS: readonly { icon: ReactNode; title: string; body: string }[] = [
  { icon: <ShieldCheck />, title: "Use banks and licensed bureaux", body: "Exchange cash only at banks or licensed bureaux de change, which display their rates." },
  { icon: <CreditCard />, title: "Tell your card issuer", body: "Let your bank know you're travelling so ATM withdrawals aren't blocked as suspicious." },
  { icon: <Receipt />, title: "Check fees and keep receipts", body: "Your issuer and the ATM operator may both charge fees. Receipts help if a withdrawal goes wrong." },
  { icon: <Wallet />, title: "Carry smaller notes", body: "Smaller denominations are easier for taxis, markets and small purchases." },
  { icon: <Smartphone />, title: "Pay without cash where you can", body: "Many merchants accept eKash QR payments, which you can pay from the wallet." },
];

/** Cash-access guidance with a sample locator. */
export default function AtmCashPage() {
  return (
    <>
      <PageHeader
        title="ATM & Cash"
        description="Where you might get Rwandan francs, and how to do it safely."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "ATM & Cash" }]}
      />
      <DemoNotice className="mb-6">
        All locations are illustrative samples. Hours, networks and currencies are unverified, and nothing shows real-time availability.
      </DemoNotice>
      <AtmLocator />
      <Card as="section" aria-labelledby="cash-tips-heading" className="mt-8">
        <CardHeader id="cash-tips-heading" title="Cash tips for visitors" />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((tip) => (
            <li key={tip.title} className="flex gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent-strong [&_svg]:size-4" aria-hidden="true">
                {tip.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{tip.title}</p>
                <p className="type-caption mt-0.5 text-ink-muted">{tip.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
