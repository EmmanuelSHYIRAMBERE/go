import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Original brand mark: rolling hills under a rising sun on a navy tile — a
 * nod to Rwanda's landscape without using any state, bank, or partner
 * symbol. Colours come from design tokens.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8 shrink-0", className)} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="var(--color-brand)" />
      <circle cx="21.5" cy="11" r="3" fill="var(--color-warning-fill)" />
      <path d="M5 21.5c3.2-4.4 6-6.6 8.6-6.6 3.4 0 4.6 4.1 8 4.1 1.8 0 3.3-.8 5.4-2.6" fill="none" stroke="var(--color-accent)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M5 26h22" stroke="var(--color-brand)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

interface BrandLogoProps {
  href?: string;
  /** Use light text on dark backgrounds. */
  inverse?: boolean;
  className?: string;
}

/** Mark + wordmark, linking home. */
export function BrandLogo({ href = "/", inverse = false, className }: BrandLogoProps) {
  return (
    <Link href={href} className={cn("focus-ring inline-flex items-center gap-2.5 rounded-sm", className)} aria-label="Rwanda Visitor Wallet — home">
      <BrandMark />
      <span className="leading-none">
        <span className={cn("type-overline block text-[0.625rem]", inverse ? "text-accent" : "text-accent-strong")}>Rwanda</span>
        <span className={cn("block font-display text-[1.0625rem] font-bold tracking-tight", inverse ? "text-ink-inverse" : "text-brand-strong")}>
          Visitor Wallet
        </span>
      </span>
    </Link>
  );
}
