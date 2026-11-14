# Testing — Rwanda Visitor Wallet web (demo)

This frontend is a **demo**. Passing every check below means the demo behaves as designed — not that the product is production-ready. Real authentication, payments, KYC, eSIM provisioning, security review and compliance work are out of scope and unverified.

## Layers

| Layer | Command | What it covers |
| --- | --- | --- |
| Types | `npm run typecheck` | Strict TypeScript, no `any`, no suppressions |
| Lint | `npm run lint` | `eslint-config-next` (core-web-vitals, TypeScript, React Hooks/Compiler rules, jsx-a11y basics) |
| Unit | `npm test` | Money/FX arithmetic, ledger and analytics reconciliation, QR payload parsing, validation schemas, persisted-state validation, design-token contrast, banned-claim and no-network source scans |
| Browser | `npm run test:e2e` | Playwright journeys, axe accessibility, responsive layout, camera/QR behaviour with mocked devices |
| Build | `npm run build` | Production build; type or lint errors fail it |

`npm run check` runs typecheck, lint and unit tests.

## Browser tests (Playwright)

- **Runner:** `@playwright/test` with `@axe-core/playwright` for accessibility.
- **Browser:** the locally installed **Google Chrome** (`channel: "chrome"`), so no browser download is needed. For CI or machines without Chrome:
  `npx playwright install chromium` then `PLAYWRIGHT_CHANNEL=chromium npm run test:e2e`.
- **Server:** `playwright.config.ts` builds and starts the app on port 3100 (`npm run build && npm run start -- --port 3100`). Locally an already-running server on 3100 is reused — make sure it's a fresh build.
- **Projects:** `desktop` (1440×900) runs every spec. `tablet` (820×1180) and `mobile` (390×844, touch) run `responsive.spec.ts` and `accessibility.spec.ts`.
- **State:** each test gets a fresh browser context. `seedSignedIn()` writes a valid demo session to `localStorage` before the first load only, so multi-page journeys keep their changes. Every test fails on any uncaught page error or console error.
- **Time:** OTP expiry, resend cooldown and quote locks use Playwright's `page.clock`, so 10-minute rules are tested without waiting.

| Spec | Journeys |
| --- | --- |
| `auth.spec.ts` | Route protection for 7 routes; public pages stay public; email validation and focus; demo-code disclosure; wrong code; return to `next`; unsafe `next` ignored; 10-minute expiry and 30-second resend cooldown; verify without a pending sign-in |
| `wallet.spec.ts` | Seeded balance and day count; fee/total/received breakdown; minimum, format and tier-limit validation; Esc + focus return; confirmed demo top-up updates balance; expired quote can't be confirmed; convert-back estimate with USD 3 deduction |
| `transactions.spec.ts` | Grouping, totals and "show more"; search, type, status and sort filters; empty state reset; `?group=` deep link; top-up, failed and pending receipts; share → clipboard fallback; unknown id |
| `payments.spec.ts` | Pay & Tip happy path with tip and focus moves; malformed/unknown merchant codes; simulated failure doesn't change balance; over-balance block; USD 500 step-up code. Mobile Money validation, failed lookup, success, receive explanation. eSIM purchase without activation; insufficient balance |
| `account.spec.ts` | Profile validation + persistence; preferences; notifications read/unread; payment methods add/default/remove (no card fields); change-PIN rules and PIN never stored; contact support; report a problem with review; Premium application + withdraw; every account page exists; sign-out cancel/confirm, data cleared, routes re-protected |
| `consistency.spec.ts` | After a top-up, payment + tip, failed payment, transfer and eSIM purchase, dashboard, history, analytics and filters reconcile to the cent |
| `camera.spec.ts` | Explanation before permission; decoded demo code resolves merchant and stops the camera; untrusted and tampered QR content rejected; denied / no camera / other errors; unsupported browser never opens the camera; stop button and navigation release the camera, including leaving during the permission prompt |
| `accessibility.spec.ts` | axe WCAG 2.0/2.1/2.2 A+AA on every public and signed-in route; one h1 and no skipped heading levels; dialogs (axe, focus trap, Esc, focus return); form-error wiring; skip link; `aria-current`; mobile drawer; keyboard radio groups; reduced motion |
| `responsive.spec.ts` | Every route at each viewport: no horizontal scroll, one h1, buttons ≥ 24×24 px; sidebar vs drawer; table scrolls in place; dialogs fit the viewport |

## Manual checks still required

Automated tools catch roughly a third to a half of accessibility issues. Before any real release, test these by hand:

### Screen readers
Test with **NVDA + Firefox/Chrome (Windows)**, **VoiceOver + Safari (macOS and iOS)** and **TalkBack + Chrome (Android)**:
1. Sign-in → verify: the OTP group is announced with its label; errors and the expiry countdown are read when they change.
2. Top-up review dialog: title and description are announced on open; focus returns to "Review top-up" on close.
3. Pay & Tip and Mobile Money: each new step's heading is announced when focus moves to it; success and failure are announced.
4. Transaction history: day headings and row content (merchant, amount, status) read in a sensible order; status isn't conveyed by colour alone.
5. Analytics: the chart is skipped and the text summary and "View as table" content are read.
6. Toasts: confirmations are announced once and don't steal focus.
7. Mobile drawer: opening moves focus inside; closing returns it to the menu button.

### Visual and input
- 200% and 400% browser zoom, and OS large-text settings: no clipped or overlapping text.
- Windows High Contrast / forced-colors mode: focus rings, borders and status badges remain visible.
- Real touch devices: tap targets, the bottom-sheet dialog on iOS Safari (dynamic toolbar), and keyboard overlap on forms.

### Camera (needs a physical device)
Camera tests above use mocks; a real device is required for:
1. Chrome on Android: "Allow camera and scan" prompts once; a printed `rvw-demo:pay?code=EK-100421` QR resolves Ikawa Corner Café; the camera light turns off immediately after.
2. Deny permission, then re-allow from site settings and press "Try again".
3. A real eKash / MoMoPay QR code is **rejected** with "isn't a demo merchant code" — no payment screen appears.
4. Switch apps or lock the phone mid-scan, return, and confirm the camera is off.
5. Safari (iOS/macOS) and Firefox: confirm the "can't decode QR codes from the camera" message and that the manual and test-code paths work.
6. Over plain HTTP on a LAN IP (not localhost): confirm the secure-context message.

Generate test QR codes from the payloads in `src/lib/qr-payload.ts` (`SAMPLE_QR_PAYLOADS`) with any offline QR generator.
