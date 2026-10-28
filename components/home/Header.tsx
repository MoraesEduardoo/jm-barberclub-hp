import React from 'react';
import { Calendar } from 'lucide-react';
import { buildAgendarUrl, OFFICIAL_LOGO_URL } from '../../lib/barberCatalog';

export const Header: React.FC = () => {
  const bookingHref = buildAgendarUrl();

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
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

        <nav
          aria-label="Navegação Principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
        >
          <a
            href="#servicos"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Serviços
          </a>
          <a
            href="#equipe"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Especialistas
          </a>
          <a
            href="#localizacao"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Localização
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <a
            href={bookingHref}
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Agendar Horário</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
