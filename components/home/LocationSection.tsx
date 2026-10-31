import React from 'react';
import { Clock, MessageCircle, ArrowUpRight } from 'lucide-react';
import {
  CAMPINA_GRANDE_SCHEDULE,
  MATHEUS_WHATSAPP_NUMBER,
  MATHEUS_WHATSAPP_URL,
  OFFICIAL_ADDRESS,
  OFFICIAL_GOOGLE_MAPS_URL,
} from '../../lib/barberCatalog';

export const LocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="scroll-mt-16 py-12 sm:py-16 bg-black border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-mono text-blue-500 uppercase tracking-wider mb-1">
            04. Onde Estamos & Contato
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Localização & Horários
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Official Monte Santo Address & Direct Navigation Buttons (No Pin Icon) */}
          <div className="lg:col-span-7 rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-6 flex flex-col justify-between gap-5">
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-white">
                Monte Santo · Campina Grande, PB
              </h3>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium tracking-wide">
                {OFFICIAL_ADDRESS}
              </p>
              <p className="text-xs font-light text-zinc-400 tracking-wide leading-relaxed">
                Ambiente 100% climatizado · Fácil estacionamento · Atendimento pontual
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-zinc-900">
              <a
                href={OFFICIAL_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 whitespace-nowrap"
              >
                <span>Abrir no Google Maps</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={MATHEUS_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-zinc-900 border border-blue-900/60 hover:border-blue-500 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-blue-500" aria-hidden="true" />
                <span>WhatsApp {MATHEUS_WHATSAPP_NUMBER}</span>
              </a>
            </div>
          </div>

          {/* Official Real Operating Hours — Strictly Only Operating Hours */}
          <div className="lg:col-span-5 rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-blue-500" aria-hidden="true" />
              <h3 className="font-display text-base font-bold text-white">
                Horários de Funcionamento
              </h3>
            </div>

            <div className="divide-y divide-zinc-900 border-t border-b border-zinc-900">
              {CAMPINA_GRANDE_SCHEDULE.map((row) => (
                <div
                  key={row.day}
                  className="py-2.5 flex items-center justify-between text-xs sm:text-sm"
                >
                  <span className="text-zinc-300 font-medium tracking-wide">{row.day}</span>
                  <span
                    className={`font-mono tabular-nums ${
                      row.isOpen ? 'text-white font-semibold' : 'text-zinc-500'
                    }`}
                  >
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
