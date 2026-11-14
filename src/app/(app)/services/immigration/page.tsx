import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { GuideBrowser } from "@/components/services/guide-browser";
import { Alert } from "@/components/ui/alert";
import { Card, CardHeader } from "@/components/ui/card";
import { IMMIGRATION_SECTIONS, OFFICIAL_RESOURCES } from "@/lib/mock-data/guides";

export const metadata: Metadata = { title: "Immigration & Stay" };

/** Information-only guidance on entry and stay, pointing to official sources. */
export default function ImmigrationPage() {
  return (
    <>
      <PageHeader
        title="Immigration & Stay"
        description="Practical pointers for your visit, and where to find the official rules."
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "Immigration & Stay" }]}
      />
      <Alert tone="warning" title="Requirements change — always check official sources" className="mb-6">
        This guide is general information, not legal or immigration advice. It doesn&apos;t decide whether you need a visa, and nothing in this
        app reflects an official approval or status.
      </Alert>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <GuideBrowser id="immigration" sections={IMMIGRATION_SECTIONS} searchLabel="Search the stay guide" searchPlaceholder="Search, e.g. “extend” or “passport”" />

        <aside className="space-y-6">
          <Card as="section" aria-labelledby="official-heading">
            <CardHeader id="official-heading" title="Official resources" description="External sites — we don't control their content." />
            <ul className="space-y-4">
              {OFFICIAL_RESOURCES.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-brand-strong hover:underline"
                  >
                    {resource.name}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <p className="type-caption mt-0.5 text-ink-muted">{resource.description}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card as="section" aria-labelledby="reminders-heading">
            <CardHeader id="reminders-heading" title="Good to remember" />
            <ul className="type-caption list-disc space-y-2 pl-4 text-ink-muted">
              <li>Your wallet&apos;s 30-day period is separate from your permitted stay.</li>
              <li>Keep digital copies of your documents available offline.</li>
              <li>Apply for any extension before your permitted stay ends.</li>
            </ul>
          </Card>
        </aside>
      </div>
    </>
  );
}
