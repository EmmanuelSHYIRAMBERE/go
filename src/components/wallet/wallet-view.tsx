"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TransactionRow } from "@/components/finance/transaction-row";
import { PageHeader } from "@/components/layout/page-header";
import { DemoBadge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/feedback-states";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { DemoNotice } from "@/components/ui/misc";
import { ConvertBackForm } from "@/components/wallet/convert-back-form";
import { TopUpForm } from "@/components/wallet/top-up-form";
import { WalletSummaryCard } from "@/components/wallet/wallet-summary-card";
import { cn } from "@/lib/cn";
import { TIER_LIMITS } from "@/lib/config/product";
import { formatDate, formatDateTime } from "@/lib/dates";
import { formatRate, getRateMilli } from "@/lib/fx";
import { formatUsd } from "@/lib/money";
import { SAMPLE_RATE_BOARD } from "@/lib/mock-data/rates";
import { useDemoStore } from "@/lib/store/demo-store";
import type { ExchangeDirection } from "@/types/exchange";
import type { WalletTier } from "@/types/wallet";

const DIRECTIONS = [
  { value: "top_up", label: "Top up · card → RWF" },
  { value: "convert_back", label: "Convert back · RWF → card" },
] as const;

const TIER_ORDER: WalletTier[] = ["standard", "verified", "premium"];

/** Wallet & exchange page: balance, quote tools, sample rates, tier limits and recent top-ups. */
export function WalletView() {
  const { wallet, data, transactions } = useDemoStore();
  const [direction, setDirection] = useState<ExchangeDirection>("top_up");
  const homeCurrency = data.preferences.homeCurrency;
  const topUps = transactions.filter((transaction) => transaction.type === "top_up").slice(0, 3);

  return (
    <>
      <PageHeader
        title="Wallet & exchange"
        description="Top up from your card with every cost shown up front, or estimate what would return to your card when you leave."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Wallet & exchange" }]}
      />
      <DemoNotice className="mb-6">
        Sample rates and simulated top-ups. Confirming a top-up adds a demo transaction in this browser only — no card is charged.
      </DemoNotice>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Card as="section" aria-labelledby="exchange-heading" padding="lg">
          <CardHeader id="exchange-heading" title="Exchange" description="Choose a direction" action={<DemoBadge label="Sample rates" />} />
          <SegmentedControl
            label="Exchange direction"
            hideLabel
            name="exchange-direction"
            value={direction}
            options={DIRECTIONS}
            onChange={setDirection}
            className="mb-6"
          />
          {direction === "top_up" ? <TopUpForm /> : <ConvertBackForm key={wallet.balanceRwf} />}
        </Card>

        <div className="space-y-6">
          <WalletSummaryCard wallet={wallet} homeCurrency={homeCurrency} homeRateMilli={getRateMilli(SAMPLE_RATE_BOARD, homeCurrency)} showActions={false} />

          <Card as="section" aria-labelledby="rates-heading">
            <CardHeader id="rates-heading" title="Sample rates" description={`As of ${formatDateTime(SAMPLE_RATE_BOARD.asOf)} (Kigali)`} level="h2" />
            <table className="w-full text-sm">
              <caption className="sr-only">Sample exchange rates to Rwandan francs</caption>
              <thead>
                <tr className="text-left text-ink-subtle">
                  <th scope="col" className="pb-2 font-medium">Currency</th>
                  <th scope="col" className="pb-2 text-right font-medium">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SAMPLE_RATE_BOARD.rates.map((rate) => (
                  <tr key={rate.currency}>
                    <th scope="row" className="py-2.5 text-left font-semibold text-ink">
                      {rate.currency}
                    </th>
                    <td className="tabular py-2.5 text-right text-ink">{formatRate(rate.currency, rate.rwfPerUnitMilli)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="type-caption mt-3 text-ink-subtle">Illustrative only — not live, official (BNR) or guaranteed rates.</p>
          </Card>

          <Card as="section" aria-labelledby="tiers-heading">
            <CardHeader
              id="tiers-heading"
              title="Your limits"
              description={`Wallet ${wallet.walletId} · ends ${formatDate(wallet.expiresAt)}`}
            />
            <ul className="space-y-2">
              {TIER_ORDER.map((tier) => {
                const limits = TIER_LIMITS[tier];
                const current = tier === wallet.tier;
                return (
                  <li
                    key={tier}
                    className={cn("rounded-md border p-3", current ? "border-brand bg-brand-soft" : "border-border")}
                    aria-current={current ? "true" : undefined}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                        {current ? <ShieldCheck className="size-4 text-brand" aria-hidden="true" /> : null}
                        {limits.label}
                        {current ? <span className="type-caption font-normal text-ink-muted">(your tier)</span> : null}
                      </p>
                      <p className="tabular text-sm text-ink">{formatUsd(limits.perConversionUsdMinor)}</p>
                    </div>
                    <p className="type-caption mt-1 text-ink-muted">
                      {limits.rolling30DayUsdMinor ? `${formatUsd(limits.rolling30DayUsdMinor)} per 30 days. ` : ""}
                      {limits.description}
                    </p>
                  </li>
                );
              })}
            </ul>
            <Link href="/account/upgrade" className="focus-ring mt-4 inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-brand-strong hover:underline">
              Compare tiers <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>
        </div>
      </div>

      <Card as="section" aria-labelledby="topups-heading" className="mt-6">
        <CardHeader
          id="topups-heading"
          title="Recent top-ups"
          action={
            <Link href="/transactions?group=top_ups" className="focus-ring rounded-sm text-sm font-semibold text-brand-strong hover:underline">
              All top-ups
            </Link>
          }
        />
        {topUps.length === 0 ? (
          <EmptyState icon={<ArrowRight />} title="No top-ups yet" description="Your card top-ups will appear here." />
        ) : (
          <div className="divide-y divide-border">
            {topUps.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} showDate={formatDate(transaction.createdAt)} />
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
