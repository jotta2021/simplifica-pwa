'use client'
import React from "react";
import { Home, Inbox, Tag, Calendar, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Visão geral",
    url: "/painel",
    icon: Home,
  },
  {
    title: "Lançamentos",
    url: "/releases",
    icon: Inbox,
  },
  {
    title: "Categorias",
    url: "/categories",
    icon: Tag,
  },
  {
    title: "Planejamentos",
    url: "/planing",
    icon: Calendar,
  },
  {
    title: "Contas",
    url: "/accounts",
    icon: Wallet,
  },
];

const TabBarMobile: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-700 shadow-md h-16 md:hidden"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.url;
        return (
          <Link
            key={item.title}
            href={item.url}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default TabBarMobile;