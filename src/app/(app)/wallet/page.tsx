import type { Metadata } from "next";
import { WalletView } from "@/components/wallet/wallet-view";

export const metadata: Metadata = { title: "Wallet & exchange" };

/** Wallet balance, top-up quotes and convert-back estimates. */
export default function WalletPage() {
  return <WalletView />;
}
