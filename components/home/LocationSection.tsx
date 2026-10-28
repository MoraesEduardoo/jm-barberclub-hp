import React from 'react';
import { MapPin, Clock, Navigation, MessageCircle } from 'lucide-react';
import {
  CAMPINA_GRANDE_SCHEDULE,
  MATHEUS_WHATSAPP_NUMBER,
  MATHEUS_WHATSAPP_URL,
  OFFICIAL_ADDRESS,
} from '../../lib/barberCatalog';

export const LocationSection: React.FC = () => {
  const encodedAddress = encodeURIComponent(
    'R. Diogo da Costa, 252 - Monte Santo, Campina Grande - PB, 58400-733'
  );
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;

  return (
    <section id="localizacao" className="scroll-mt-16 py-12 sm:py-16 bg-black border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-mono text-blue-500 uppercase tracking-wider mb-1">
            04. Onde Estamos & Contacto
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Localização & Horários
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Official Monte Santo Address & Direct Navigation Buttons */}
          <div className="lg:col-span-7 rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-5 sm:p-6 flex flex-col justify-between gap-5">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-red-500" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Monte Santo · Campina Grande, PB
                </h3>
                <p className="text-xs sm:text-sm text-zinc-200 mt-1 font-medium">
                  {OFFICIAL_ADDRESS}
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Ambiente 100% climatizado · Fácil estacionamento · Atendimento pontual
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-zinc-900">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors whitespace-nowrap"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Google Maps</span>
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-zinc-900 border border-zinc-800 hover:border-blue-500/60 transition-colors whitespace-nowrap"
              >
                <Navigation className="w-4 h-4 text-blue-500" aria-hidden="true" />
                <span>Abrir no Waze</span>
              </a>

              <a
                href={MATHEUS_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-zinc-900 border border-blue-900/60 hover:border-blue-500 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-blue-500" aria-hidden="true" />
                <span>WhatsApp Matheus</span>
              </a>
            </div>
          </div>

          {/* Official Real Operating Hours */}
          <div className="lg:col-span-5 rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-5 sm:p-6 flex flex-col justify-between">
            <div>
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
                    <span className="text-zinc-300 font-medium">{row.day}</span>
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

            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400">
              <span>Contacto da Gerência (Matheus)</span>
              <a
                href={MATHEUS_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-blue-400 hover:underline tabular-nums font-semibold"
              >
                {MATHEUS_WHATSAPP_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
