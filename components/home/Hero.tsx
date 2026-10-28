import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import {
  buildAgendarUrl,
  MATHEUS_WHATSAPP_URL,
  OFFICIAL_LOGO_URL,
} from '../../lib/barberCatalog';

export const Hero: React.FC = () => {
  const bookingUrl = buildAgendarUrl();

  return (
    <section
      id="conceito"
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 bg-black border-b border-zinc-900 overflow-hidden"
    >
      {/* Subtle OLED Red & Deep Blue Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 25%, rgba(220, 38, 38, 0.18), transparent 45%), radial-gradient(circle at 80% 35%, rgba(29, 78, 216, 0.16), transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Official Brand Emblem (/logo-preta.png) First on Mobile */}
          <div className="lg:col-span-5 lg:order-2 flex justify-center">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-3xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-4 flex items-center justify-center shadow-2xl">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="Logótipo Oficial JM Barberclub Campina Grande"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* Minimalist Mobile-First Value Proposition */}
          <div className="lg:col-span-7 lg:order-1 text-center lg:text-left space-y-5">
            <p className="text-xs sm:text-sm font-mono text-zinc-300 tracking-wide">
              📍 Campina Grande, PB <span className="text-blue-500">·</span>{' '}
              <span className="text-red-500 font-semibold">Barbearia Premium</span>
            </p>

            <h1
              className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              O padrão que define o homem de{' '}
              <span className="text-red-500">Campina Grande</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Cortes executivos, degradê milimétrico e barboterapia na toalha quente com horário 100% pontual no bairro Monte Santo.
            </p>

            {/* Thumb-Friendly Mobile CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              <a
                href={bookingUrl}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-500 transition-colors whitespace-nowrap"
              >
                <span>Agendar Meu Atendimento</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={MATHEUS_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3.5 rounded-xl text-sm font-semibold text-zinc-100 backdrop-blur-md bg-zinc-950/60 border border-zinc-800 hover:border-blue-500/60 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-blue-500" aria-hidden="true" />
                <span>WhatsApp do Matheus</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
