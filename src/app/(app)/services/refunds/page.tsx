import { ArrowLeftRight, Flag, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { GuideBrowser } from "@/components/services/guide-browser";
import { Alert } from "@/components/ui/alert";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { DetailRow } from "@/components/ui/misc";
import {
  EXTENSION_DAYS,
  EXTENSION_FEE_USD_MINOR,
  REFUND_DEDUCTION_USD_MINOR,
  REFUND_TARGET_BUSINESS_DAYS,
  WALLET_PERIOD_DAYS,
} from "@/lib/config/product";
import { formatUsd } from "@/lib/money";
import { REFUND_SECTIONS } from "@/lib/mock-data/guides";

export const metadata: Metadata = { title: "Refund Guide" };

/** Refund, expiry and dispute guidance. Information only — it doesn't start a refund. */
export default function RefundGuidePage() {
  return (
    <>
      <PageHeader
        title="Refund Guide"
        description="How your balance comes back to you, and what to do if a payment goes wrong."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "Refund Guide" }]}
      />
      <Alert tone="info" title="This page is guidance, not a refund request" className="mb-6">
        Reading this guide doesn&apos;t start a refund or reverse a payment, and it can&apos;t promise an outcome. To raise an issue, use Report a
        Problem with your transaction reference.
      </Alert>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <GuideBrowser id="refunds" sections={REFUND_SECTIONS} searchLabel="Search the refund guide" searchPlaceholder="Search, e.g. “dispute” or “card”" />

        <aside className="space-y-6">
          <Card as="section" aria-labelledby="rules-heading">
            <CardHeader id="rules-heading" title="Key rules" description="Illustrative — subject to approval" />
            <dl className="divide-y divide-border">
              <DetailRow label="Wallet period" value={`${WALLET_PERIOD_DAYS} days`} />
              <DetailRow label="Refund deduction" value={formatUsd(REFUND_DEDUCTION_USD_MINOR)} />
              <DetailRow label="Refund initiated within" value={`${REFUND_TARGET_BUSINESS_DAYS} business day (target)`} />
              <DetailRow label="Extension" value={`${formatUsd(EXTENSION_FEE_USD_MINOR)} for ${EXTENSION_DAYS} days, once`} />
            </dl>
          </Card>
          <Card as="section" aria-labelledby="next-heading">
            <CardHeader id="next-heading" title="Next steps" />
            <div className="grid gap-2">
              <ButtonLink href="/wallet" variant="secondary" fullWidth>
                <ArrowLeftRight aria-hidden="true" />
                Estimate a convert-back
              </ButtonLink>
              <ButtonLink href="/account/report-problem" variant="outline" fullWidth>
                <Flag aria-hidden="true" />
                Report a problem
              </ButtonLink>
              <ButtonLink href="/account/contact-support" variant="outline" fullWidth>
                <MessageSquare aria-hidden="true" />
                Contact support
              </ButtonLink>
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}
