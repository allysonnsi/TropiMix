import Link from "next/link";
import {
  ArrowRight,
  Search,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import clsx from "clsx";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet";
}) {
  return (
    <button
      className={clsx("ui-button", `ui-button--${variant}`, className)}
      {...props}
    />
  );
}
export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={clsx(
        "ui-button",
        secondary ? "ui-button--secondary" : "ui-button--primary",
      )}
      href={href}
    >
      {children}
      <span className="button-arrow">
        <ArrowRight size={17} aria-hidden="true" />
      </span>
    </Link>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children && <p className="section-description">{children}</p>}
      </div>
      {action}
    </div>
  );
}
export function SearchField({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="search-field">
      <span className="sr-only">{label}</span>
      <Search size={18} aria-hidden="true" />
      <input type="search" placeholder={label} {...props} />
    </label>
  );
}
export function EmptyState({
  title,
  description,
  children,
  icon: Icon = UtensilsCrossed,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">
        <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}
export function Skeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div
      className="skeleton-group"
      role="status"
      aria-label="Carregando conteúdo"
    >
      {Array.from({ length: rows }, (_, i) => (
        <div className="skeleton" key={i} />
      ))}
      <span className="sr-only">Carregando conteúdo</span>
    </div>
  );
}
