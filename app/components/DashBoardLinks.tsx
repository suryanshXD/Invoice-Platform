"use client";
import { cn } from "@/lib/utils";
import { HomeIcon, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashBoardLinks = [
  {
    id: 0,
    name: "DashBoard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: User2,
  },
];

export function DashBoardLink() {
  const pathname = usePathname();
  return (
    <>
      {DashBoardLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}
          href={link.href}
          key={link.id}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
}
