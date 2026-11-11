'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { buildAgendarUrl, OFFICIAL_LOGO_URL } from '../../lib/barberCatalog';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const bookingHref = buildAgendarUrl();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const quickNavLinks = [
    { href: '#servicos', label: 'Serviços' },
    { href: '#produtos', label: 'Produtos' },
    { href: '#equipe', label: 'Equipa' },
    { href: '#localizacao', label: 'Horários' },
  ];

  return (
    <header
      data-testid="site-header"
      data-scrolled={isScrolled ? 'true' : 'false'}
      className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900 transition-colors duration-300 will-change-transform"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* 1 & 2. Logótipo/Emblema Compacto + Nome da Barbearia ("JM Barberclub") */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white font-semibold tracking-tight whitespace-nowrap shrink-0"
        >
          <img
            src={OFFICIAL_LOGO_URL}
            alt="Logótipo Oficial JM Barberclub"
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover border border-zinc-800"
          />
          <span className="text-base sm:text-lg font-bold tracking-tight">
            JM Barberclub
          </span>
        </a>

        {/* Navegação Desktop — Visível no topo, oculta suavemente no scroll (> 20px) */}
        <nav
          aria-label="Navegação Principal Desktop"
          aria-hidden={isScrolled}
          className={`hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400 transition-all duration-300 ${
            isScrolled
              ? 'opacity-0 -translate-y-2 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          {quickNavLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={isScrolled ? -1 : 0}
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 3. Botão de Conversão Principal ("Agendar Horário") */}
        <div className="flex items-center shrink-0">
          <a
            href={bookingHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Agendar Horário</span>
          </a>
        </div>
      </div>

      {/* Barra de Atalhos Rápidos Mobile (< 768px) — Desaparece suavemente quando scroll > 20px */}
      <nav
        aria-label="Atalhos Rápidos Mobile"
        aria-hidden={isScrolled}
        data-testid="mobile-quick-nav"
        className={`md:hidden overflow-x-auto bg-black/90 transition-all duration-300 ease-out will-change-[max-height,opacity,transform] ${
          isScrolled
            ? 'max-h-0 opacity-0 -translate-y-2 pointer-events-none border-t border-transparent'
            : 'max-h-11 opacity-100 translate-y-0 border-t border-zinc-900/90'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-10 flex items-center justify-between gap-2 min-w-max">
          {quickNavLinks.map((item, idx) => (
            <React.Fragment key={item.href}>
              <a
                href={item.href}
                tabIndex={isScrolled ? -1 : 0}
                className="px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
              {idx < quickNavLinks.length - 1 && (
                <span
                  className="text-zinc-700 text-xs select-none"
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
