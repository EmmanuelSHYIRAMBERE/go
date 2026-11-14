Act as a senior frontend architect, Next.js specialist, TypeScript engineer, UI/UX designer, accessibility specialist, and frontend quality assurance engineer refer to C:\Users\emash\FoodBundles\food-bundles-fn.

You are responsible for designing and implementing a complete, professional, modern web frontend for **Rwanda Visitor Wallet**, a visitor-focused digital wallet concept associated with **Local Access GO Limited**.

Your task is to build the frontend directly in the existing project directory:

`C:\Users\emash\FoodBundles\rwanda-visitor-wallet\web`

The application must demonstrate a polished digital wallet experience for international visitors in Rwanda.

The final product should look and feel like a carefully designed financial technology platform, with consistent layouts, strong visual hierarchy, smooth interactions, clear data presentation, and excellent usability across desktop, tablet, and mobile devices.

This is a real implementation task, not a request for a tutorial, wireframe description, or code samples.

**Inspect the repository, plan the implementation, create the required files, implement the pages and components, and run the available quality checks.**

Do not stop after generating a landing page or a few static screens.

Do not merely describe the work that should be done. Implement it.

---

# 2. First Step: Inspect the Existing Project

Before writing code, inspect the existing project and understand its current state.

Check:

- Whether the web directory already contains a Next.js application.
- Existing package.json and installed dependencies.
- Existing Next.js version and App Router configuration.
- Existing TypeScript configuration.
- Tailwind CSS configuration and version.
- Existing design references, screenshots, assets, and documentation.
- The existing Rwanda Visitor Wallet mobile application, if accessible.
- Existing product specifications and feature descriptions.
- Existing branding, logos, typography, colors, and icons.
- Existing mock data, route names, and terminology.
- Existing CLAUDE.md, AGENTS.md, or other project instructions.

If the web directory is empty, initialize the application using a stable, compatible Next.js setup with the App Router.

If an application already exists, preserve its working configuration and build on top of it.

Do not overwrite existing source files blindly.

Do not create a second nested application inside the existing web directory.

Do not upgrade dependencies unnecessarily.

If the mobile application or its specifications are available, use them as the primary reference for product behavior and branding. Adapt the user interface to web conventions rather than copying mobile navigation patterns directly.

If design screenshots are available, inspect them and reproduce their visual structure as closely as possible.

If no design reference exists for a particular screen, create a coherent design that follows the established product design system. Do not claim pixel-perfect matching against a design that was never provided.

Before implementation, produce a short internal plan covering:

1. Existing project structure.
2. Dependencies that can be reused.
3. Required dependencies.
4. Proposed route structure.
5. Design system.
6. Component architecture.
7. Mock-data architecture.
8. Implementation phases.
9. Validation and testing strategy.

Then begin implementation.

---

# 3. Product Vision

Build a high-quality web experience for Rwanda Visitor Wallet.

The application helps international visitors explore a unified set of services relevant to their stay in Rwanda, including:

- Foreign exchange information and a wallet overview.
- ATM and cash access.
- Mobile money information and demo flows.
- QR-based Pay & Tip interactions.
- eSIM and mobile data information.
- Immigration and stay guidance.
- Cards information.
- Refund guidance.
- Transaction history and details.
- Spending analytics.
- Account management.
- Notifications.
- Help and support.

The frontend must present these services as part of one coherent product.

Do not represent unavailable services as operational integrations.

All financial operations, exchange rates, payment confirmations, account verification, and service-provider interactions must use clearly labelled demo data unless a real integration is explicitly configured and authorized.

Never imply that the application is a licensed bank, a regulated payment institution, an approved financial intermediary, or an officially integrated service provider unless that status has been independently established.

The UI should be suitable for a product demonstration, stakeholder review, and future backend integration.

---

# 4. Technology Stack

Use the following technologies.

### Core

- Next.js with the App Router.
- React.
- TypeScript in strict mode.
- Tailwind CSS.
- React Server Components by default.
- Client Components only where browser interactivity is required.

### Forms and validation

- React Hook Form.
- Zod.
- The appropriate React Hook Form resolver for Zod.

### Animation

- Framer Motion, using the API compatible with the installed version.

### Icons

- Lucide React or the icon library already established in the project.

### Data presentation

- A suitable React charting library if charts are required.
- Prefer an existing compatible dependency over adding a competing library.

### Optional UI components

Use shadcn/ui or another compatible component system if it improves consistency and fits the existing project. Do not install multiple UI libraries that solve the same problems.

### Testing

Use the existing testing framework where available. Otherwise, introduce a suitable lightweight testing setup when justified by the project.

### Important architecture rules

1. Use the Next.js App Router.
2. Use TypeScript for all application source files.
3. Avoid `any`, including implicit or disguised uses.
4. Use Server Components by default.
5. Add `"use client"` only when browser APIs, state, effects, or client-side interactions require it.
6. Do not use Server Actions.
7. Do not introduce API routes, server endpoints, databases, or backend services as part of this frontend-only implementation.
8. Do not hardcode sensitive secrets.
9. Keep all demo data local and deterministic.
10. Keep the project compatible with the installed Next.js version.

Do not use an outdated package API simply because an example online uses it. Verify the installed version and use its supported APIs.

---

# 5. Mandatory Engineering Standards

Follow these standards throughout the implementation.

## 5.1 TypeScript

Use strict TypeScript.

Requirements:

- No explicit `any`.
- No unnecessary type assertions.
- No `@ts-ignore` to hide errors.
- Define interfaces or types for every significant data structure.
- Type component props.
- Type event handlers where appropriate.
- Type form inputs and validation schemas.
- Type mock-data objects.
- Type reusable hooks.
- Type component variants.
- Type navigation and query parameters.
- Handle nullable and optional values correctly.
- Avoid duplicating equivalent type definitions across components.

Organize shared types in a dedicated directory, for example:

`src/types/`

Create appropriate domain types for:

- Transactions.
- Wallet summaries.
- Exchange-rate samples.
- Services.
- Notifications.
- Payment methods.
- Support requests.
- Analytics.
- User profile information.
- Account preferences.

## 5.2 Naming conventions

Use:

- Lowercase kebab-case for folder names.
- PascalCase for React component names.
- camelCase for functions and variables.
- UPPER_SNAKE_CASE for constants where appropriate.
- Descriptive names instead of abbreviations.
- Consistent file naming throughout the repository.

Examples:

- `components/dashboard/wallet-summary-card.tsx`
- `components/transactions/transaction-list.tsx`
- `lib/mock-data/transactions.ts`
- `hooks/use-wallet-summary.ts`
- `types/transaction.ts`

Follow the existing project convention when it is already consistent.

## 5.3 JSDoc

Add meaningful JSDoc comments to application functions, custom hooks, utility functions, and non-trivial components.

Document:

- Purpose.
- Parameters.
- Return values where useful.
- Important side effects.
- Important constraints.

Keep comments useful and accurate. Do not add redundant comments that simply repeat the function name.

For React components, document the component's responsibility and relevant props where useful.

## 5.4 Error handling

Handle errors intentionally.

Use try-catch when an operation can genuinely throw, such as:

- Browser storage access.
- Clipboard operations.
- File reading.
- Download operations.
- External browser APIs.
- Asynchronous client-side workflows.

Do not add meaningless try-catch blocks around every function.

For synchronous form validation, use Zod and React Hook Form rather than throwing exceptions unnecessarily.

Provide:

- Helpful inline validation.
- Error messages.
- Retry actions where appropriate.
- Recoverable error states.
- Safe fallback UI.

Do not silently swallow exceptions.

Do not expose stack traces or internal implementation details to users.

## 5.5 Logging

Do not include `console.log` in production application code.

Use the project's established error-reporting strategy if one exists.

Do not log passwords, OTPs, PINs, sensitive form values, or other confidential information.

## 5.6 Reusability

Extract shared components when doing so improves consistency and maintainability.

Do not duplicate the same:

- Page headers.
- Navigation.
- Form fields.
- Buttons.
- Dialogs.
- Cards.
- Loading skeletons.
- Empty states.
- Error states.
- Tables.
- Status badges.
- Transaction rows.
- Filter controls.

Avoid overengineering components that have no meaningful reuse or independent responsibility.

---

# 6. Visual Design Direction

Create a premium, contemporary fintech visual identity for Rwanda Visitor Wallet.

The interface should feel trustworthy, welcoming, clear, and easy to navigate.

Do not produce a generic dashboard assembled from unrelated template components.

Develop one cohesive design system.

## 6.1 Visual characteristics

Aim for:

- Clear visual hierarchy.
- Strong typography.
- Generous but controlled spacing.
- Well-balanced layouts.
- Carefully aligned content.
- Consistent card radii.
- Subtle borders.
- Restrained shadows.
- Consistent icon sizing.
- Readable data visualizations.
- Clear primary actions.
- High-quality empty states.
- Deliberate use of color.
- Smooth but restrained motion.
- Appropriate whitespace.

Avoid:

- Excessive gradients.
- Too many competing accent colors.
- Unnecessary glassmorphism.
- Oversized decorative elements.
- Inconsistent corner radii.
- Crowded cards.
- Excessively small text.
- Unreadable low-contrast text.
- Fake functionality.
- Decorative charts with arbitrary numbers.
- Excessive animation.
- Unnecessary animations on every element.

## 6.2 Design tokens

Establish reusable design tokens for:

- Brand colors.
- Primary and secondary text.
- Muted text.
- Page background.
- Card background.
- Borders.
- Success.
- Warning.
- Error.
- Information.
- Spacing.
- Border radii.
- Shadows.
- Typography.
- Animation durations.
- Focus rings.
- Layout widths.

Store these tokens in the appropriate Tailwind theme or shared styling configuration for the installed Tailwind version.

Do not scatter unrelated hexadecimal color values throughout the components.

Use semantic color names wherever possible.

## 6.3 Typography

Use a consistent typography system.

Provide distinct styles for:

- Page titles.
- Section titles.
- Card titles.
- Body text.
- Secondary descriptions.
- Form labels.
- Helper text.
- Monetary values.
- Table data.
- Status badges.

Use tabular numerals for financial values when supported.

Use a readable font stack and avoid excessive font weights.

## 6.4 Brand assets

Inspect existing project assets before creating replacements.

Reuse the official project logo and brand assets if available.

If no logo exists, create a simple, original visual identity appropriate for the application without implying a government or financial institution endorsement.

Do not use unrelated brand logos as substitutes for real payment-provider partnerships.

## 6.5 Imagery

Use imagery selectively.

Suitable uses may include:

- Welcome or onboarding pages.
- Travel-related promotional sections.
- Service illustrations.
- Empty states.
- Informational cards.

Prefer existing local assets when available.

If using Unsplash images, select relevant, high-quality imagery and handle image loading and failure states.

Use `next/image` for appropriate image optimization.

Do not rely on arbitrary remote images for essential interface elements.

Do not use photography as a replacement for functional UI components.

---

# 7. Responsive Layout

Every page must work on mobile, tablet, laptop, and large desktop screens.

Use Tailwind responsive breakpoints, including:

- `sm`
- `md`
- `lg`
- `xl`

Use `2xl` where appropriate.

Requirements:

- No horizontal overflow at supported screen sizes.
- Navigation adapts appropriately to smaller screens.
- Tables remain usable on mobile.
- Forms remain readable on narrow screens.
- Dialogs fit within the viewport.
- Charts resize without clipping.
- Buttons have appropriate touch targets.
- Sidebar layouts collapse appropriately.
- Content does not hide behind fixed navigation.
- Typography scales sensibly.
- Spacing remains consistent.
- Keyboard focus remains visible.

Do not treat responsive design as a final cosmetic task. Build it into each component from the beginning.

---

# 8. Application Architecture

Use a clear, maintainable folder structure.

Adapt this example to the existing repository rather than forcing a restructuring without reason.

```text
web/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   └── page.tsx
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx
│   │   │   └── verify/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── wallet/
│   │   │   │   └── page.tsx
│   │   │   ├── transactions/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   ├── atm-cash/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── mobile-money/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── pay-tip/
│   │   │   │   └── esim/
│   │   │   ├── immigration/
│   │   │   │   └── page.tsx
│   │   │   ├── cards/
│   │   │   │   └── page.tsx
│   │   │   ├── refunds/
│   │   │   │   └── page.tsx
│   │   │   └── account/
│   │   │       ├── page.tsx
│   │   │       ├── notifications/
│   │   │       ├── payment-methods/
│   │   │       ├── verification/
│   │   │       ├── change-pin/
│   │   │       ├── upgrade/
│   │   │       ├── help/
│   │   │       ├── contact-support/
│   │   │       ├── report-problem/
│   │   │       ├── terms/
│   │   │       ├── privacy/
│   │   │       └── about/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── wallet/
│   │   ├── transactions/
│   │   ├── analytics/
│   │   ├── services/
│   │   ├── account/
│   │   ├── forms/
│   │   └── feedback/
│   ├── hooks/
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── mock-data/
│   │   ├── validation/
│   │   ├── formatters/
│   │   └── browser/
│   └── types/
├── tests/
├── package.json
├── tsconfig.json
└── README.md
```

This is a suggested structure, not a requirement to create every directory immediately.

Create route files only for implemented pages.

Use Next.js route groups to organize pages without unintentionally changing public URLs.

Use shared layouts for common navigation and account or dashboard shells.

Keep business-domain data separate from presentation components.

---

# 9. Required Pages and Functional UI Scope

Implement a coherent set of pages covering the complete visitor wallet experience.

Prioritize the authenticated dashboard experience and its navigation.

## 9.1 Public landing page

Create a professional landing page that explains the product.

Include:

- Responsive navigation.
- Product logo and name.
- A clear headline and supporting description.
- Primary call to action.
- Product feature overview.
- Forex and local-access feature highlights.
- Service cards.
- Security and transparency messaging based only on verified product behavior.
- Frequently asked questions.
- Footer with appropriate navigation.
- Links to sign-in and relevant informational pages.

Do not invent customer testimonials, user counts, financial statistics, awards, or partnerships.

## 9.2 Sign-in and verification

Create a polished authentication interface suitable for the demo application.

Include:

- Email or other agreed demo sign-in identifier.
- Password field if required by the existing product design.
- Validation.
- Password visibility toggle where applicable.
- Loading state.
- Error feedback.
- Verification-code screen.
- Six-digit OTP input if that is part of the established flow.
- Resend-code countdown if appropriate.
- Accessible keyboard navigation.
- Clear demo-authentication disclosure.

No real authentication backend is to be created.

Use a clearly documented mock authentication flow.

Never store plaintext passwords, actual banking PINs, or OTP values in persistent browser storage.

## 9.3 Main dashboard

Build a comprehensive dashboard with:

- Personalized greeting using safe demo profile information.
- Wallet overview.
- Exchange-rate preview labelled as demo data.
- Currency selection.
- Quick actions.
- Service shortcuts.
- Recent transactions.
- Spending summary.
- Notification preview.
- Useful travel information.
- Responsive charts or summary visuals where appropriate.

Keep the dashboard informative without making it overcrowded.

Ensure each service shortcut navigates to its own page.

## 9.4 Wallet and exchange

Create a dedicated wallet and exchange screen.

Include:

- Source and destination currency selection.
- Amount input.
- Exchange direction toggle.
- Clear calculation summary.
- Fee breakdown where appropriate.
- Estimated received amount.
- Rate timestamp.
- Demo-only disclaimer.
- Review modal.
- Confirmation screen.
- Input validation.
- Loading and error feedback.

Use clearly labelled sample exchange rates.

If a sample USD 5 Local Access service fee is part of the existing specification, present it as illustrative demo pricing rather than an approved or final commercial fee.

Use one shared mock-rate source for all relevant components.

## 9.5 Transactions

Create a complete transaction experience.

Include:

- Transaction list.
- Search.
- Filters.
- Sorting.
- Date grouping where appropriate.
- Status badges.
- Type and category indicators.
- Pagination or sensible list handling.
- Empty state.
- Transaction details.
- Share action using browser-supported capabilities where appropriate.
- Clear demo transaction references.

Use consistent transaction data across dashboard summaries, history, analytics, and details.

## 9.6 Analytics

Create an analytics page with:

- Spending summary cards.
- Transaction counts.
- Average transaction value.
- Time-range filters.
- Spending trend chart.
- Category breakdown.
- Recent activity.
- Currency-aware summaries.
- Tooltips and accessible chart descriptions.
- Empty state for insufficient data.

Charts must be derived from coherent mock data.

Do not generate arbitrary chart values unrelated to the displayed transactions.

Do not add amounts from different currencies together without a documented conversion basis.

## 9.7 ATM & Cash

Create a dedicated ATM and cash-access screen.

Include:

- Search.
- Filters.
- Location cards or a responsive table.
- Sample location details.
- Currency information where available.
- Cash-access guidance.
- Map-style presentation if suitable assets or a supported map implementation exist.
- Empty and error states.

Clearly label simulated locations and unverified information.

Do not claim real-time ATM availability.

## 9.8 Mobile Money

Create a dedicated Mobile Money screen.

Include:

- Provider information based on established product requirements.
- Supported demo actions.
- Send and receive demo flows where appropriate.
- Form validation.
- Review and confirmation screens.
- Demo transaction references.
- Empty and error states.

Do not claim provider integration or initiate real transfers.

## 9.9 Pay & Tip

Create a dedicated Pay & Tip screen.

Include:

- QR code scanning interface suitable for the web.
- Camera permission explanation.
- Permission-denied state.
- Scanner loading state.
- Manual demo QR payload entry or a documented test QR code.
- QR payload validation.
- Merchant or recipient review.
- Optional amount input where supported by the demo payload format.
- Confirmation step.
- Simulated transaction result.
- Safe failure and retry states.

Browser camera access requires HTTPS or a trusted local development environment and user permission.

Do not assume that camera access works in every browser or environment.

Never interpret arbitrary QR content as a trusted payment instruction.

Never initiate real payments.

If live camera scanning is not available in the current environment, provide a usable demo testing path and clearly document the limitation.

## 9.10 eSIM and mobile data

Create a dedicated eSIM and data screen.

Include:

- Data package cards using demo offers.
- Package details.
- Coverage information only where supported.
- Purchase-review UI.
- Simulated confirmation.
- Clear explanation that activation is unavailable without a real provider integration.

Do not claim that an eSIM has been installed or activated when no such integration exists.

## 9.11 Immigration & Stay

Create a dedicated information screen.

Include:

- Travel and stay information.
- Organized guidance cards.
- Useful official resources when verified.
- Search or expandable sections where useful.
- Helpful reminders.
- Clear disclaimers that immigration requirements can change.

Do not invent visa eligibility decisions or official approval statuses.

## 9.12 Cards

Create a dedicated Cards screen.

Include:

- Card feature overview.
- Demo card state.
- Clear inactive or unavailable status when appropriate.
- Related demo activity if supported.
- Clear explanation of unavailable functions.

Never generate or request real card credentials or CVVs.

## 9.13 Refund Guide

Create a dedicated Refund Guide screen.

Include:

- Searchable refund information.
- Refund categories.
- Step-by-step guidance.
- Frequently asked questions.
- Support navigation.
- Clear distinction between guidance and an actual refund operation.

Do not promise a refund or imply that the app can reverse a real payment.

## 9.14 Account section

Create a dedicated account area with routes and meaningful content for:

- Profile.
- Notifications.
- Verification.
- Payment Methods.
- Change PIN.
- Upgrade to Premium.
- Help Centre.
- Contact Support.
- Report a Problem.
- Terms of Service.
- Privacy Policy.
- About.

Each destination must have its own appropriate page.

Use local demo state for interactions when needed.

Do not leave buttons pointing to unrelated pages.

### Profile

Include:

- Demo profile information.
- Editable non-sensitive profile fields where appropriate.
- Preferences.
- Account navigation.
- Sign-out action within the mock authentication flow.

### Notifications

Include:

- Notification list.
- Read and unread states.
- Mark-as-read actions.
- Empty state.
- Local state persistence where appropriate.

### Verification

Include:

- Demo verification status.
- Clear explanation of the verification flow.
- Available demo steps.
- Status indicators.
- No false claims of official or legal verification.

### Payment Methods

Include:

- Demo payment method list.
- Add and remove interactions.
- Default selection where appropriate.
- Masked fictional data only.
- No collection of actual payment credentials.

### Change PIN

If the existing product specification requires this feature, implement it as a clearly labelled demo PIN-management flow.

Never collect actual banking PINs or store sensitive values in plaintext persistent storage.

### Upgrade to Premium

Include:

- Feature comparison.
- Demo pricing only if supported by established product requirements.
- Review and confirmation.
- Simulated success and cancellation states.

Do not charge users or claim that a real subscription has been activated.

### Help Centre

Include:

- Search.
- FAQ categories.
- Expandable questions.
- Relevant product guidance.
- Contact Support navigation.

### Contact Support

Include:

- Subject and message fields.
- Validation.
- Submission feedback.
- Honest demo behavior when no backend exists.

### Report a Problem

Include:

- Problem category.
- Description.
- Optional attachment only if supported.
- Review and confirmation.
- Demo reference number.

### Terms of Service and Privacy Policy

Provide clearly organized, readable draft content based on the application's actual behavior.

Do not invent legal approval, regulatory compliance, or unsupported data-handling claims.

Label draft legal content as requiring appropriate review before production release.

### About

Include:

- Product name.
- Version where available.
- Application description.
- Demo status.
- Relevant navigation links.
- Established project information only.

---

# 10. Reusable UI Component System

Build reusable components with consistent APIs and styling.

At minimum, consider implementing:

### Layout

- `AppShell`
- `DashboardLayout`
- `Sidebar`
- `MobileNavigation`
- `TopNavigation`
- `PageHeader`
- `PageContainer`
- `Breadcrumbs`

### Core UI

- `Button`
- `IconButton`
- `Card`
- `Badge`
- `Avatar`
- `Input`
- `Select`
- `Textarea`
- `Checkbox`
- `Switch`
- `Tabs`
- `Tooltip`
- `DropdownMenu`
- `Dialog`
- `Drawer`
- `Skeleton`
- `Spinner`
- `Alert`
- `Toast`
- `EmptyState`
- `ErrorState`
- `ConfirmDialog`

### Financial UI

- `CurrencyAmount`
- `CurrencySelector`
- `ExchangeRateCard`
- `WalletSummaryCard`
- `TransactionRow`
- `TransactionStatusBadge`
- `TransactionDetails`
- `ServiceCard`
- `AnalyticsSummaryCard`
- `ChartCard`

### Forms

- `FormField`
- `FormError`
- `FormActions`
- `FormSection`

Do not create every component blindly at the start.

Extract components as the implementation develops, keeping them small, reusable, accessible, and easy to maintain.

---

# 11. React Hook Form and Zod

Use React Hook Form and Zod for interactive forms.

Create reusable schemas in an appropriate validation directory.

Examples include:

- Sign-in.
- Demo verification.
- Exchange amount.
- Mobile Money demo flow.
- Support contact form.
- Problem report.
- Profile editing.
- Demo PIN update.

Requirements:

- Validate input before submission.
- Display field-specific error messages.
- Associate labels with inputs.
- Support keyboard navigation.
- Prevent duplicate submissions.
- Display pending states.
- Display success and failure feedback.
- Reset form state appropriately after completion.
- Avoid unnecessary uncontrolled-to-controlled transitions.

Do not build a custom validation system when the established form libraries already solve the problem.

---

# 12. Animation and Interaction

Use Framer Motion consistently and selectively.

Suitable animations include:

- Page transitions where compatible with Next.js navigation.
- Card entrance effects.
- Dialog and drawer transitions.
- Dropdown appearance.
- Tab transitions.
- Toast notifications.
- Expandable sections.
- Button feedback.
- Loading-state transitions.
- Chart appearance.

Requirements:

- Keep animations smooth and performant.
- Avoid animating large expensive layout regions unnecessarily.
- Respect `prefers-reduced-motion`.
- Avoid distracting looping animations.
- Avoid delaying important interactions.
- Keep focus management correct when dialogs open or close.
- Do not rely on animation alone to communicate state.

Animations must enhance usability rather than compensate for missing functionality.

---

# 13. Loading, Empty, Error, and Success States

Every data-driven or interactive page must be designed for more than its initial happy path.

Implement appropriate states.

## Loading

Use skeletons that resemble the final content.

Avoid full-screen spinners when a content skeleton is more useful.

Do not display loading animations indefinitely.

## Empty

Provide meaningful messages and relevant next actions.

Examples:

- No transactions match the selected filters.
- No notifications yet.
- No saved payment methods.
- No spending data for this period.
- No matching help articles.

## Error

Explain what happened in user-friendly language.

Provide retry actions where appropriate.

Do not expose internal errors or stack traces.

## Success

Use clear confirmation feedback after successful demo actions.

Make the next appropriate action available.

Do not claim that a real financial operation succeeded when the action was simulated.

---

# 14. Accessibility Requirements

Implement accessible interfaces throughout the application.

Requirements:

- Semantic HTML.
- Proper heading hierarchy.
- Explicit form labels.
- Meaningful ARIA labels where needed.
- Keyboard-accessible navigation.
- Visible focus indicators.
- Accessible dialogs and dropdowns.
- Focus management.
- Sufficient text contrast.
- Accessible status announcements.
- Appropriate alternative text.
- Accessible chart summaries.
- Reduced-motion support.
- Error messages associated with relevant fields.

Use native HTML elements whenever they provide the required behavior.

Do not add ARIA attributes that conflict with native semantics.

Test important flows using keyboard navigation.

---

# 15. Frontend-Only Architecture

This phase is limited to the web frontend.

**Do not implement a backend. Do not use Server Actions.**

Use a clear client-side data architecture.

## Mock data

Create deterministic mock datasets for:

- Profile.
- Wallet summary.
- Exchange-rate samples.
- Transactions.
- Notifications.
- Payment methods.
- Service information.
- Analytics.
- Support requests.

Keep data definitions separate from UI components.

Use shared mock data so dashboard summaries, transaction history, details, and analytics remain consistent.

## State management

Use React state and context where appropriate.

Use a lightweight state-management library only if the existing project already uses one or the application complexity justifies it.

Avoid introducing unnecessary global state.

## Persistence

If persistence improves the demo, use a small, well-typed browser-storage adapter.

Requirements:

- Access browser storage only in the browser.
- Handle unavailable storage and parsing failures.
- Avoid hydration mismatches.
- Use versioned storage keys when useful.
- Provide safe defaults.
- Never persist passwords, OTPs, banking PINs, CVVs, or secrets.
- Do not store sensitive identity information.
- Clearly distinguish mock state from authoritative server data.

Do not treat client-side state or browser storage as a security boundary.

## Data access abstraction

Organize demo operations behind simple typed functions or a repository-style abstraction when useful.

For example:

- Read mock transactions.
- Filter transactions.
- Calculate dashboard summaries.
- Update notification state.
- Add a demo transaction.
- Calculate an illustrative exchange result.
- Submit a local demo support request.

Keep these operations deterministic and easy to replace with a real API in a later phase.

Do not create fake API endpoints or unnecessary network requests.

---

# 16. Exchange Calculations and Financial Presentation

Financial values must be handled carefully.

Use appropriate currency formatting utilities.

Requirements:

- Use correct currency codes.
- Use consistent decimal precision.
- Keep monetary values associated with their currency.
- Avoid accidental floating-point calculation errors in financial arithmetic.
- Separate display formatting from calculation logic.
- Validate amounts.
- Prevent negative amounts unless explicitly required by the feature.
- Display fees separately from the exchange amount.
- Show the rate and rate timestamp.
- Clearly identify sample rates as demo data.

Where exact decimal arithmetic is needed, use an appropriate decimal library if compatible with the project.

Never imply that sample exchange rates are live, guaranteed, or official.

If a fee is shown, clearly identify it as illustrative when it has not been commercially established.

---

# 17. Next.js Performance and Architecture

Use Next.js features appropriately.

Requirements:

- Use the App Router.
- Use layouts for shared navigation.
- Use loading.tsx for suitable route-level loading UI.
- Use error.tsx for recoverable route errors where appropriate.
- Use not-found.tsx for unknown routes.
- Provide page metadata.
- Use `next/image` for suitable imagery.
- Avoid unnecessary client-side JavaScript.
- Avoid marking entire route trees as Client Components.
- Lazy-load expensive client-only components when appropriate.
- Avoid unnecessary re-renders.
- Avoid duplicate expensive calculations.
- Keep charting and animation code isolated where possible.
- Avoid layout shifts.
- Keep bundle size reasonable.

Do not add Server Actions, database access, or server-side transaction processing.

Use Server Components for static presentation and local mock-data rendering when suitable.

Use Client Components for forms, dialogs, browser APIs, interactive charts, and client-side state.

---

# 18. Testing and Quality Gates

Before considering a phase complete, run the relevant checks.

## Static quality

- TypeScript checks.
- ESLint.
- Build checks.
- Formatting checks if configured.
- Unit tests for important utilities.

## Interaction tests

Verify:

- Navigation between all implemented pages.
- Form validation.
- Modal opening and closing.
- Keyboard navigation.
- Search and filters.
- Currency selection.
- Exchange calculations.
- Transaction details.
- Share behavior.
- Notification state.
- Responsive navigation.
- Loading and empty states.
- Demo confirmation flows.

## Responsive tests

Review the UI at representative mobile, tablet, and desktop widths.

Look for:

- Horizontal overflow.
- Clipped content.
- Overlapping controls.
- Unreadable tables.
- Incorrect dialog dimensions.
- Misaligned cards.
- Navigation failures.
- Hidden focus indicators.

## Accessibility tests

Review:

- Heading structure.
- Form labels.
- Keyboard focus.
- Dialog behavior.
- Contrast.
- Accessible status messages.
- Reduced-motion preferences.

Do not report a test as passed if it was not actually run.

Do not suppress TypeScript errors, disable lint rules globally, or remove useful checks simply to obtain a successful build.

---

# 19. Definition of Done

The frontend is ready for review only when:

1. The application runs from the specified web directory.
2. The Next.js App Router is configured correctly.
3. All implemented pages have a consistent design.
4. All required routes open the correct screens.
5. Shared components are extracted appropriately.
6. TypeScript is strict and uses no explicit `any`.
7. Interactive forms use React Hook Form and Zod where appropriate.
8. All functions have meaningful JSDoc documentation according to this project's standards.
9. Real error-prone operations have appropriate error handling.
10. Data-driven pages have suitable loading, empty, and error states.
11. Animations are smooth, restrained, and respect reduced-motion preferences.
12. Responsive layouts work at mobile, tablet, and desktop sizes.
13. Important interactions work without requiring a backend.
14. Mock financial data is consistent and clearly identified.
15. No real payments or financial integrations are falsely represented.
16. No production `console.log` statements remain.
17. Accessibility requirements are addressed.
18. Available type checks, linting, tests, and builds have been run.
19. Known limitations are documented honestly.

---

# 20. Implementation Workflow

Implement the project in phases.

## Phase 1: Foundation

- Inspect the repository.
- Establish the design system.
- Configure or verify Tailwind CSS.
- Configure fonts and global styles.
- Build shared layout components.
- Build core UI components.
- Establish domain types.
- Create mock-data modules.
- Verify that the application starts and builds.

## Phase 2: Core user experience

- Landing page.
- Sign-in.
- Demo verification.
- Dashboard.
- Wallet and exchange.
- Transaction list.
- Transaction details.

## Phase 3: Services

- ATM & Cash.
- Mobile Money.
- Pay & Tip.
- eSIM and mobile data.
- Immigration & Stay.
- Cards.
- Refund Guide.
- Analytics.

## Phase 4: Account and support

- Profile.
- Notifications.
- Verification.
- Payment Methods.
- Change PIN.
- Upgrade to Premium.
- Help Centre.
- Contact Support.
- Report a Problem.
- Terms of Service.
- Privacy Policy.
- About.

## Phase 5: Polish and verification

- Responsive refinement.
- Animation refinement.
- Accessibility checks.
- Loading and empty states.
- Error handling.
- Integration between mock-data modules.
- TypeScript checks.
- Linting.
- Tests.
- Production build.
- Documentation.

Do not create dozens of unfinished placeholder pages just to claim progress.

Implement coherent, working vertical slices.

If the work cannot be completed in one session, complete the current phase, verify it, document the state, and continue in subsequent sessions without losing the established architecture.

---

# 21. Final Implementation Report

After implementation, provide a structured report containing:

1. Project structure created or updated.
2. Dependencies installed or reused.
3. Design system and component architecture.
4. Routes implemented.
5. Features implemented.
6. Mock-data and state-management approach.
7. Form validation approach.
8. Accessibility and responsive-design work.
9. Loading, empty, and error states.
10. TypeScript, lint, test, and build results.
11. Remaining incomplete features.
12. Known limitations.
13. Exact commands to run the application.
14. The next recommended implementation steps.

Clearly distinguish completed work from planned work.

Do not claim that all pages are finished if some are still placeholders.

**Begin by inspecting the existing repository. Then implement Phase 1 and continue through the remaining phases as the available time and execution environment permit.**
