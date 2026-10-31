import React from 'react';
import {
  buildAgendarUrl,
  OFFICIAL_ADDRESS,
  OFFICIAL_LOGO_URL,
} from '../../lib/barberCatalog';

export const Footer: React.FC = () => {
  const bookingUrl = buildAgendarUrl();

  return (
    <footer className="bg-black py-8 text-xs text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="Logótipo JM Barberclub"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-zinc-800"
            />
            <div>
              <p className="text-white font-bold text-sm">JM Barberclub</p>
              <p className="text-zinc-500">{OFFICIAL_ADDRESS}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#servicos" className="hover:text-white transition-colors">
              Serviços
            </a>
            <a href="#produtos" className="hover:text-white transition-colors">
              Produtos
            </a>
            <a href="#equipe" className="hover:text-white transition-colors">
              Especialistas
            </a>
            <a href="#localizacao" className="hover:text-white transition-colors">
              Localização
            </a>
            <a
              href={bookingUrl}
              className="text-red-500 font-semibold hover:text-red-400 transition-colors"
            >
              Agendar Online
            </a>
          </div>

          <div className="font-mono text-zinc-500 tabular-nums text-center sm:text-right">
            © {new Date().getFullYear()} JM Barberclub.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
