import { CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";

const POINTS = [
  "No local SIM or phone number needed",
  "Rate, fee and francs received shown before you pay",
  "Pay and tip at eKash merchants by QR",
] as const;

/** Split-screen layout for sign-in and verification. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <aside className="relative hidden overflow-hidden bg-brand-navy p-12 text-ink-inverse lg:flex lg:flex-col">
        <BrandLogo inverse />
        <div className="my-auto max-w-md">
          <h2 className="type-page-title">A wallet for your stay in Rwanda</h2>
          <ul className="mt-6 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-ink-inverse/85">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <p className="type-caption text-ink-inverse/60">Demo only — no real accounts, money or emails.</p>
      </aside>
      <main id="main-content" className="flex flex-col bg-surface px-4 py-8 sm:px-8">
        <div className="lg:hidden">
          <BrandLogo />
        </div>
        <div className="mx-auto flex w-full max-w-form flex-1 flex-col justify-center py-10">{children}</div>
      </main>
    </div>
  );
}
