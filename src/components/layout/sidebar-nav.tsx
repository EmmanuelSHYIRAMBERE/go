"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { APP_NAVIGATION, isActivePath } from "@/lib/config/navigation";
import { TRANSITION } from "@/lib/motion";

interface SidebarNavProps {
  unreadCount: number;
  /** Called after a link is chosen (closes the mobile drawer). */
  onNavigate?: () => void;
  /** Unique per rendered instance so the desktop and drawer indicators never animate into each other. */
  indicatorId: string;
}

/**
 * Grouped app navigation used by the desktop sidebar and the mobile drawer.
 * The active highlight slides to the selected item (shared layout); the
 * unread badge pops in and out. Compact spacing keeps every item visible at
 * ~900 px viewport heights.
 */
export function SidebarNav({ unreadCount, onNavigate, indicatorId }: SidebarNavProps) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="space-y-5">
      {APP_NAVIGATION.map((section) => (
        <div key={section.title}>
          <p className="type-overline mb-1.5 px-3 text-ink-subtle">{section.title}</p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active = isActivePath(item.href, pathname);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "focus-ring group relative flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                      active ? "text-brand-strong" : "text-ink-muted hover:bg-surface-muted hover:text-ink",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId={`${indicatorId}-active`}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-md bg-brand-soft"
                        transition={TRANSITION.indicator}
                      />
                    ) : null}
                    <Icon
                      className="relative size-[1.125rem] shrink-0 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    <span className="relative flex-1 truncate">{item.label}</span>
                    <AnimatePresence initial={false}>
                      {item.showUnread && unreadCount > 0 ? (
                        <motion.span
                          key="badge"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1, transition: TRANSITION.base }}
                          exit={{ scale: 0.6, opacity: 0, transition: TRANSITION.exit }}
                          className="relative rounded-full bg-brand px-2 py-0.5 text-[0.6875rem] font-semibold text-ink-inverse"
                        >
                          {unreadCount}
                          <span className="sr-only"> unread</span>
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
