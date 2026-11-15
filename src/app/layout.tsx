import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/nunito-sans";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { PRODUCT_NAME } from "@/lib/config/product";

export const metadata: Metadata = {
  title: { default: `${PRODUCT_NAME} — demo`, template: `%s · ${PRODUCT_NAME}` },
  description:
    "A demonstration of Rwanda Visitor Wallet: a 30-day RWF wallet concept for international visitors. All rates, balances and payments are sample data.",
  applicationName: PRODUCT_NAME,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
};

/** Root layout: fonts (self-hosted via Fontsource), global styles, client providers. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
