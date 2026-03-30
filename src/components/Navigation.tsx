"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, DoorOpen, Map } from "lucide-react";
import { motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "プロローグ", icon: BookOpen },
    { href: "/projects", label: "企画一覧", icon: DoorOpen },
    { href: "/guide", label: "しおり", icon: Map },
  ];

  return (
    <>
      {/* デスクトップ用ヘッダーナビゲーション */}
      <header className="hidden md:flex fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b-[3px] border-fantasy-accent/30 px-8 py-4 justify-between items-center shadow-sm">
        <div className="font-serif font-bold text-xl text-fantasy-text tracking-widest flex items-center gap-2">
          <BookOpen size={24} className="text-fantasy-accent" />
          <span>コネクトワールド</span>
        </div>
        <nav className="flex gap-8">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} className="relative group flex items-center gap-2 text-fantasy-text font-bold">
                <Icon size={18} className={isActive ? "text-fantasy-accent" : "text-fantasy-text/50"} />
                <span className={isActive ? "text-fantasy-accent" : "text-fantasy-text/70 group-hover:text-fantasy-text transition-colors"}>
                  {label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="desktop-nav-indicator"
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-fantasy-accent" 
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* モバイル用ボトムナビゲーション */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/90 backdrop-blur-md border-t-[3px] border-fantasy-accent/40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <ul className="flex justify-around items-center p-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className="flex-1">
                <Link href={href} className="flex flex-col items-center justify-center py-2 relative">
                  <div className={`p-2 rounded-full transition-colors ${isActive ? "bg-fantasy-accent/10" : "bg-transparent"}`}>
                    <Icon size={24} className={isActive ? "text-fantasy-accent" : "text-fantasy-text/50"} />
                  </div>
                  <span className={`text-[10px] font-bold mt-1 tracking-widest ${isActive ? "text-fantasy-accent" : "text-fantasy-text/60"}`}>
                    {label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="mobile-nav-indicator"
                      className="absolute top-0 w-8 h-[3px] bg-fantasy-accent rounded-b-full" 
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
