import React from 'react';
import { MessageCircle } from 'lucide-react';
import {
  buildAgendarUrl,
  MATHEUS_WHATSAPP_NUMBER,
  MATHEUS_WHATSAPP_URL,
  OFFICIAL_ADDRESS,
  OFFICIAL_LOGO_URL,
} from '../../lib/barberCatalog';

export const Footer: React.FC = () => {
  const bookingUrl = buildAgendarUrl({ service: 'combo-jm' });

  return (
    <footer className="bg-black py-10 text-xs text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Direct WhatsApp Management Banner */}
        <div className="p-4 sm:p-5 rounded-2xl backdrop-blur-md bg-zinc-950/70 border border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-white">
              Suporte Direto & Gerência (Matheus)
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              WhatsApp Oficial: <span className="font-mono text-zinc-200">{MATHEUS_WHATSAPP_NUMBER}</span> · {OFFICIAL_ADDRESS}
            </p>
          </div>
          <a
            href={MATHEUS_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar diretamente com Matheus no WhatsApp"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-zinc-900 border border-blue-500/50 hover:border-blue-400 transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <span>WhatsApp {MATHEUS_WHATSAPP_NUMBER}</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-zinc-900">
          <div className="flex items-center gap-3">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="Logótipo JM BarberClub"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-zinc-800"
            />
            <div>
              <p className="text-white font-bold text-sm">JM BarberClub</p>
              <p className="text-zinc-500">R. Diogo da Costa, 252 - Monte Santo · Campina Grande, PB</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#servicos" className="hover:text-white transition-colors">
              Serviços
            </a>
            <a href="#galeria" className="hover:text-white transition-colors">
              Galeria
            </a>
            <a href="#equipe" className="hover:text-white transition-colors">
              Equipe
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
            © {new Date().getFullYear()} JM BarberClub.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
