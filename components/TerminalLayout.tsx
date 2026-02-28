"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TerminalSquare, Activity, Shield, Wifi } from 'lucide-react';

interface TerminalLayoutProps {
  children: React.ReactNode;
  activeRoute?: 'dashboard' | 'submit' | 'detail';
}

export function TerminalLayout({ children, activeRoute = 'dashboard' }: TerminalLayoutProps) {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-primary p-2 md:p-4 gap-4 max-w-7xl mx-auto font-mono">
      <aside className="w-full md:w-64 border border-primary/40 bg-black p-4 flex flex-col gap-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
        <div className="flex items-center gap-3 text-primary font-bold text-xl mb-2 pb-4 border-b border-primary/30">
          <TerminalSquare className="w-8 h-8 animate-pulse" />
          <span className="tracking-widest">SYS_ID8</span>
        </div>
        <nav className="flex flex-col gap-3">
          <Link
            href="/"
            className={`block p-3 border uppercase text-sm font-bold tracking-wider transition-all duration-300 ${
              activeRoute === 'dashboard'
                ? 'border-primary bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,255,0,0.3)]'
                : 'border-transparent text-primary/70 hover:text-primary hover:border-primary/50'
            }`}
          >
            {activeRoute === 'dashboard' ? '> DASHBOARD █' : '> DASHBOARD'}
          </Link>
          <Link
            href="/submit"
            className={`block p-3 border uppercase text-sm font-bold tracking-wider transition-all duration-300 ${
              activeRoute === 'submit'
                ? 'border-primary bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,255,0,0.3)]'
                : 'border-transparent text-primary/70 hover:text-primary hover:border-primary/50'
            }`}
          >
            {activeRoute === 'submit' ? '> NEW_REQUEST █' : '> NEW_REQUEST'}
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-primary/30 text-xs text-primary/70 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2"><Activity className="w-3 h-3" /> STATUS:</div>
            <span className="text-primary animate-pulse">ONLINE</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2"><Shield className="w-3 h-3" /> SEC_LVL:</div>
            <span>ALPHA</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2"><Wifi className="w-3 h-3" /> SYS_TIME:</div>
            <span>{time}</span>
          </div>
        </div>
      </aside>
      <main className="flex-1 border border-primary/40 bg-black p-4 md:p-6 lg:p-8 relative flex flex-col shadow-[0_0_20px_rgba(0,255,0,0.05)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
