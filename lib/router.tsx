import {
  Link as RouterLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { ComponentProps, ReactNode } from "react";
import { withBasePath } from "@/lib/paths";

export { Routes, Route, Navigate, useLocation, useParams };

export function Link({
  href,
  to,
  children,
  className,
  ...props
}: {
  href?: string;
  to?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href">) {
  const target = to ?? href ?? "/";

  if (target.startsWith("http") || target.startsWith("mailto:") || target.startsWith("#")) {
    return (
      <a href={target} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={target} className={className} {...props}>
      {children}
    </RouterLink>
  );
}

export function usePathname() {
  const { pathname } = useLocation();
  return pathname;
}
