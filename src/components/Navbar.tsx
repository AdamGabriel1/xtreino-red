'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Flame } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Início' },
    { href: '/classificacao', label: 'Classificação' },
    { href: '/elencos', label: 'Elencos' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-600" />
            <span className="font-black text-xl tracking-wider text-white">
              DEVILS <span className="text-red-600">MOBILE</span> LEAGUE
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-red-900/30">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm font-bold uppercase text-gray-400 hover:text-red-500 hover:bg-red-950/20 transition-colors border-b border-neutral-800"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}