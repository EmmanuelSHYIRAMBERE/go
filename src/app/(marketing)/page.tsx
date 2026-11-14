import {
  ArrowRight,
  BadgeCheck,
  Clock,
  CreditCard,
  FlaskConical,
  HardDrive,
  Lock,
  MailCheck,
  QrCode,
  Receipt,
  ShieldCheck,
  Signal,
  Smartphone,
  Undo2,
} from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CurrencyAmount } from "@/components/finance/currency-amount";
import { ServiceCard } from "@/components/finance/service-card";
import { TransactionRow } from "@/components/finance/transaction-row";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Badge, DemoBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { DetailRow } from "@/components/ui/misc";
import {
  ACTIVATION_FEE_USD_MINOR,
  QUOTE_LOCK_MINUTES,
  REFUND_DEDUCTION_USD_MINOR,
  WALLET_PERIOD_DAYS,
} from "@/lib/config/product";
import { DEMO_EPOCH_ISO, formatDateTime } from "@/lib/dates";
import { buildTopUpQuote, formatRate } from "@/lib/fx";
import { buildWalletSummary, sortNewestFirst } from "@/lib/ledger";
import { formatMoney, formatUsd } from "@/lib/money";
import { HELP_CATEGORIES } from "@/lib/mock-data/guides";
import { DEMO_WALLET_ACCOUNT } from "@/lib/mock-data/profile";
import { SAMPLE_RATE_BOARD } from "@/lib/mock-data/rates";
import { SERVICES } from "@/lib/mock-data/services";
import { SEED_TRANSACTIONS } from "@/lib/mock-data/transactions";

export const metadata: Metadata = {
  title: { absolute: "Rwanda Visitor Wallet — a 30-day wallet for visitors (demo)" },
  description: "Top up from your card, see the rate and fee up front, pay and tip with eKash QR, and get roaming data. Demo with sample data.",
};

const STEPS = [
  { icon: MailCheck, title: "Sign up with email", body: "No local SIM or phone number. Confirm your email with a 6-digit code and secure the app with your device passkey." },
  { icon: BadgeCheck, title: "Activate and verify", body: `A one-off ${formatUsd(ACTIVATION_FEE_USD_MINOR)} activation opens a ${WALLET_PERIOD_DAYS}-day wallet. Passport and liveness checks set your tier.` },
  { icon: CreditCard, title: "Top up from your card", body: "See the amount in your currency, the rate, the 2% fee and the francs you'll receive — before you pay." },
  { icon: Undo2, title: "Leave with your balance", body: `When you close or reach day ${WALLET_PERIOD_DAYS}, the balance goes back to your card, minus ${formatUsd(REFUND_DEDUCTION_USD_MINOR)}.` },
] as const;

const FAQ_IDS = ["what-is", "sim-needed", "fee", "live-rates", "tip-fee", "end"];

/** Public landing page. Server-rendered; preview figures come from the shared demo ledger. */
export default function LandingPage() {
  const epoch = new Date(DEMO_EPOCH_ISO);
  const transactions = sortNewestFirst(SEED_TRANSACTIONS);
  const wallet = buildWalletSummary(DEMO_WALLET_ACCOUNT, transactions, epoch);
  const quote = buildTopUpQuote(10_000, "USD", SAMPLE_RATE_BOARD, epoch);
  const faqs = HELP_CATEGORIES.flatMap((category) => category.faqs).filter((faq) => FAQ_IDS.includes(faq.id));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-ink-inverse">
        <HillsBackdrop />
        <div className="relative mx-auto grid max-w-marketing gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-ink-inverse/20 px-3 py-1 text-xs font-semibold text-accent">
              <FlaskConical className="size-3.5" aria-hidden="true" />
              Product demo · sample data only
            </p>
            <h1 className="type-display mt-5 max-w-xl">Your money in Rwanda, sorted from the moment you land.</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-inverse/80">
              A planned {WALLET_PERIOD_DAYS}-day Rwandan franc wallet for international visitors. Top up from your card with the rate and
              fee shown up front, pay and tip with eKash QR, and buy roaming data — no local SIM needed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/sign-in" size="lg" variant="inverse">
                Explore the demo
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/#how-it-works" size="lg" variant="on-dark">
                How it works
              </ButtonLink>
            </div>
          </div>

          <figure aria-label="Illustration of the wallet dashboard using sample data" className="relative">
            <div className="rounded-xl bg-surface p-5 text-ink shadow-overlay sm:p-6">
              <div className="flex items-center justify-between">
                <p className="type-overline text-ink-subtle">Wallet balance</p>
                <DemoBadge label="Sample" />
              </div>
              <CurrencyAmount money={{ amountMinor: wallet.balanceRwf, currency: "RWF" }} size="xl" className="mt-2 block" />
              <p className="type-caption mt-1 text-ink-muted">
                Day {wallet.dayNumber} of {WALLET_PERIOD_DAYS} · Verified tier
              </p>
              <div className="mt-5 divide-y divide-border border-t border-border">
                {transactions.slice(0, 3).map((transaction) => (
                  <TransactionRow key={transaction.id} transaction={transaction} interactive={false} />
                ))}
              </div>
            </div>
            <figcaption className="type-caption mt-3 text-center text-ink-inverse/70">Illustration with sample data</figcaption>
          </figure>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 py-16 md:py-24">
        <div className="mx-auto max-w-marketing px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="How it works" title="Built around a visitor's 30 days" description="One wallet from arrival to departure, designed for people who don't have a Rwandan bank account or SIM." />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-border bg-canvas p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-md bg-brand-navy text-ink-inverse" aria-hidden="true">
                    <step.icon className="size-5" />
                  </span>
                  <span className="type-overline text-ink-subtle">Step {index + 1}</span>
                </div>
                <h3 className="type-card-title mt-4 text-ink">{step.title}</h3>
                <p className="type-caption mt-1.5 text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="type-caption mt-6 text-ink-subtle">
            Fees and limits are taken from the pilot requirements and are illustrative — they remain subject to regulator and partner approval.
          </p>
        </div>
      </section>

      {/* Exchange + local access */}
      <section id="exchange" className="scroll-mt-20 bg-canvas py-16 md:py-24">
        <div className="mx-auto grid max-w-marketing gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Exchange"
              title="Know exactly what you'll get"
              description={`Before any top-up you see the amount in your currency, the rate, the 2% fee, and the francs you'll receive. The rate is held for ${QUOTE_LOCK_MINUTES} minutes.`}
            />
            <ul className="mt-8 space-y-4">
              <Feature icon={<Receipt />} title="Fees shown separately" body="The fee is never hidden inside the rate." />
              <Feature icon={<Clock />} title={`${QUOTE_LOCK_MINUTES}-minute rate lock`} body="Take your time to review; request a fresh quote after it expires." />
              <Feature icon={<Undo2 />} title="Convert back when you leave" body="Estimate what returns to your card before you go." />
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 shadow-raised sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="type-section-title text-ink">Sample top-up quote</h3>
              <DemoBadge label="Sample rate" />
            </div>
            <dl className="mt-4 divide-y divide-border">
              <DetailRow label="You top up" value={formatMoney(quote.amount)} />
              <DetailRow label="Top-up fee (2%)" value={formatMoney(quote.fee)} />
              <DetailRow label="Charged to your card" value={formatMoney(quote.totalCharged)} />
              <DetailRow label="Rate" value={formatRate("USD", quote.rateMilli)} />
              <DetailRow label="You receive" value={formatMoney({ amountMinor: quote.receiveRwf, currency: "RWF" })} emphasis />
            </dl>
            <p className="type-caption mt-4 text-ink-subtle">
              Sample rate dated {formatDateTime(SAMPLE_RATE_BOARD.asOf)} (Kigali). Not a live, official or guaranteed rate.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-20 py-16 md:py-24">
        <div className="mx-auto max-w-marketing px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Local access"
            title="Everything a visitor needs, in one place"
            description="Pay at eKash merchants, send to MTN MoMo and Airtel Money numbers, get data, and find practical guidance for your stay."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="warning" icon={<QrCode aria-hidden="true" />}>Demo flow — simulated</Badge>
            <Badge tone="info" icon={<Smartphone aria-hidden="true" />}>Guide — information only</Badge>
            <Badge tone="neutral" icon={<Signal aria-hidden="true" />}>Not in pilot</Badge>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section id="transparency" className="scroll-mt-20 bg-canvas py-16 md:py-24">
        <div className="mx-auto max-w-marketing px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Transparency"
            title="What's real in this demo — and what's planned"
            description="We keep a clear line between what this website actually does and what the pilot is designed to do."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-6">
              <h3 className="type-section-title flex items-center gap-2 text-ink">
                <HardDrive className="size-5 text-brand" aria-hidden="true" />
                This demo website
              </h3>
              <ul className="type-body mt-4 space-y-3 text-ink-muted">
                <CheckItem>Runs entirely in your browser. There is no server, database or payment integration.</CheckItem>
                <CheckItem>Rates, balances, merchants and payments are fixed sample data.</CheckItem>
                <CheckItem>Anything you do is saved only in this browser, and cleared when you sign out.</CheckItem>
                <CheckItem>Codes and PINs you type are checked in memory and never saved.</CheckItem>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-surface p-6">
              <h3 className="type-section-title flex items-center gap-2 text-ink">
                <ShieldCheck className="size-5 text-accent-strong" aria-hidden="true" />
                The pilot design (planned)
              </h3>
              <ul className="type-body mt-4 space-y-3 text-ink-muted">
                <CheckItem icon={<Lock />}>Card details handled by the card acquirer&apos;s hosted fields and tokens, not the wallet&apos;s servers.</CheckItem>
                <CheckItem icon={<Lock />}>3-D Secure on every card top-up; prepaid and gift cards blocked.</CheckItem>
                <CheckItem icon={<Lock />}>Larger payments need an email code as well as biometrics or the app PIN.</CheckItem>
                <CheckItem icon={<Lock />}>Every accepted payment either completes or is reversed — and you&apos;re told which.</CheckItem>
              </ul>
              <p className="type-caption mt-4 text-ink-subtle">Planned requirements, not yet independently verified.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionIntro eyebrow="FAQ" title="Questions visitors ask" align="center" />
          <Accordion className="mt-10">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} title={faq.question} name="landing-faq">
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <div className="mx-auto flex max-w-marketing flex-col items-start gap-6 rounded-xl bg-brand-navy p-8 text-ink-inverse sm:p-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="type-page-title">See the full visitor journey</h2>
            <p className="mt-2 max-w-lg text-ink-inverse/80">Sign in with any email and the demo code to explore the wallet, payments, data and guides.</p>
          </div>
          <ButtonLink href="/sign-in" size="lg" variant="inverse">
            Open the demo
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

/** Section heading block used across the landing page. */
function SectionIntro({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "text-center" : undefined}>
      <p className="type-overline text-accent-strong">{eyebrow}</p>
      <h2 className="type-page-title mt-2 text-ink">{title}</h2>
      {description ? <p className={`type-body mt-3 max-w-2xl text-ink-muted ${align === "center" ? "mx-auto" : ""}`}>{description}</p> : null}
    </div>
  );
}

/** Icon + title + body list item. */
function Feature({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <li className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-surface text-brand shadow-card [&_svg]:size-5" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="font-semibold text-ink">{title}</p>
        <p className="type-caption mt-0.5 text-ink-muted">{body}</p>
      </div>
    </li>
  );
}

/** Bullet with a small icon. */
function CheckItem({ children, icon = <BadgeCheck /> }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 shrink-0 text-success [&_svg]:size-4" aria-hidden="true">
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}

/** Decorative hill silhouettes behind the hero. */
function HillsBackdrop() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute inset-x-0 bottom-0 h-48 w-full text-brand-navy-soft" viewBox="0 0 1440 200" preserveAspectRatio="none">
      <path d="M0 140c160-70 300-100 440-60s250 70 400 20 330-110 600-40v140H0z" fill="currentColor" />
      <path d="M0 175c200-40 380-50 560-20s360 40 520 0 260-40 360-25v70H0z" fill="var(--color-brand-navy)" opacity="0.6" />
    </svg>
  );
}
