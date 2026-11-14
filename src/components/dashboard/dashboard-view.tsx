"use client";

import { ArrowRight, Banknote, BellRing, BookUser, CalendarClock, QrCode, Send, Signal } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { SpendBars } from "@/components/analytics/spend-bars";
import { ServiceCard } from "@/components/finance/service-card";
import { TransactionRow } from "@/components/finance/transaction-row";
import { PageHeader } from "@/components/layout/page-header";
import { DemoBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/feedback-states";
import { ExchangeRateCard } from "@/components/wallet/exchange-rate-card";
import { WalletSummaryCard } from "@/components/wallet/wallet-summary-card";
import { computeAnalytics } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { EXPIRY_REMINDER_DAYS, EXTENSION_FEE_USD_MINOR } from "@/lib/config/product";
import { formatDate, formatRelative, formatWeekday, greetingFor } from "@/lib/dates";
import { getRateMilli } from "@/lib/fx";
import { formatRwf, formatUsd } from "@/lib/money";
import { SAMPLE_RATE_BOARD } from "@/lib/mock-data/rates";
import { SERVICES } from "@/lib/mock-data/services";
import { useDemoStore } from "@/lib/store/demo-store";

const QUICK_ACTIONS = [
  { label: "Pay & tip", href: "/services/pay-tip", icon: QrCode },
  { label: "Send money", href: "/services/mobile-money", icon: Send },
  { label: "Buy data", href: "/services/esim", icon: Signal },
  { label: "Find cash", href: "/services/atm-cash", icon: Banknote },
] as const;

/** The signed-in home: balance, rate, quick actions, activity, spending, notifications and travel info. */
export function DashboardView() {
  const { profile, wallet, transactions, notifications, unreadCount, now, data } = useDemoStore();
  const homeCurrency = data.preferences.homeCurrency;
  const week = useMemo(() => computeAnalytics(transactions, "7d", now), [transactions, now]);
  const recent = transactions.slice(0, 5);
  const latestNotifications = notifications.slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        eyebrow={<p className="type-caption text-ink-muted">{formatWeekday(now.toISOString())} · Kigali (demo date)</p>}
        title={`${greetingFor(now)}, ${profile.givenName}`}
        description="Here's your wallet at a glance. Everything below uses sample data."
        actions={<DemoBadge label="Demo data" />}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WalletSummaryCard wallet={wallet} homeCurrency={homeCurrency} homeRateMilli={getRateMilli(SAMPLE_RATE_BOARD, homeCurrency)} />
        </div>
        <ExchangeRateCard initialCurrency={homeCurrency} />
      </div>

      <nav aria-label="Quick actions">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <li key={action.href}>
              <Link
                href={action.href}
                className="focus-ring flex h-full flex-col items-center gap-2 rounded-lg border border-border bg-surface p-4 text-center shadow-card transition-[border-color,translate] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-border-strong"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent-strong" aria-hidden="true">
                  <action.icon className="size-5" />
                </span>
                <span className="text-sm font-semibold text-ink">{action.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card as="section" aria-labelledby="recent-heading" className="lg:col-span-2">
          <CardHeader
            id="recent-heading"
            title="Recent activity"
            action={
              <Link href="/transactions" className="focus-ring inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-brand-strong hover:underline">
                View all <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            }
          />
          {recent.length === 0 ? (
            <EmptyState icon={<Send />} title="No activity yet" description="Payments and top-ups will appear here." />
          ) : (
            <div className="divide-y divide-border">
              {recent.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} showDate={formatRelative(transaction.createdAt, now)} />
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card as="section" aria-labelledby="spend-heading">
            <CardHeader
              id="spend-heading"
              title="Last 7 days"
              description="Completed wallet spending, RWF"
              action={
                <Link href="/analytics" className="focus-ring rounded-sm text-sm font-semibold text-brand-strong hover:underline">
                  Analytics
                </Link>
              }
            />
            <p className="type-amount text-2xl text-ink">{formatRwf(week.totalSpentRwf)}</p>
            <p className="type-caption text-ink-muted">
              {week.spendCount} payments
              {week.topCategory ? ` · most on ${week.topCategory.label.toLowerCase()}` : ""}
            </p>
            <SpendBars days={week.daily} className="mt-4" />
          </Card>

          <Card as="section" aria-labelledby="notifications-heading">
            <CardHeader
              id="notifications-heading"
              title="Notifications"
              description={unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
              action={
                <Link href="/account/notifications" className="focus-ring rounded-sm text-sm font-semibold text-brand-strong hover:underline">
                  See all
                </Link>
              }
            />
            <ul className="space-y-3">
              {latestNotifications.map((notification) => (
                <li key={notification.id} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className={cn("mt-1.5 size-2 shrink-0 rounded-full", notification.read ? "bg-border-strong" : "bg-brand")}
                  />
                  <div className="min-w-0">
                    <p className={cn("text-sm text-ink", !notification.read && "font-semibold")}>
                      {notification.title}
                      {!notification.read ? <span className="sr-only"> (unread)</span> : null}
                    </p>
                    <p className="type-caption text-ink-subtle">{formatRelative(notification.createdAt, now)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section aria-labelledby="services-heading" className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="services-heading" className="type-section-title text-ink">
              Services
            </h2>
            <Link href="/services" className="focus-ring rounded-sm text-sm font-semibold text-brand-strong hover:underline">
              All services
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICES.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} compact />
            ))}
          </div>
        </section>

        <Card as="section" aria-labelledby="travel-heading">
          <CardHeader id="travel-heading" title="Your stay" description="Useful reminders for this trip" />
          <ul className="space-y-4">
            <li className="flex gap-3">
              <CalendarClock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-sm text-ink-muted">
                <span className="font-semibold text-ink">Wallet ends {formatDate(wallet.expiresAt)}.</span> Reminders on day {EXPIRY_REMINDER_DAYS[0]} and day{" "}
                {EXPIRY_REMINDER_DAYS[1]}; one extension available for {formatUsd(EXTENSION_FEE_USD_MINOR)} (illustrative).
              </p>
            </li>
            <li className="flex gap-3">
              <BookUser className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-sm text-ink-muted">
                <span className="font-semibold text-ink">Your wallet isn&apos;t your visa.</span> Check your permitted stay with the immigration authorities.
              </p>
            </li>
            <li className="flex gap-3">
              <BellRing className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-sm text-ink-muted">
                <span className="font-semibold text-ink">Leaving early?</span> Closing returns your balance to your card, minus a USD 3 deduction (illustrative).
              </p>
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink href="/services/immigration" variant="outline" size="sm">
              Stay guide
            </ButtonLink>
            <ButtonLink href="/services/refunds" variant="outline" size="sm">
              Refund guide
            </ButtonLink>
          </div>
        </Card>
      </div>
    </div>
  );
}
