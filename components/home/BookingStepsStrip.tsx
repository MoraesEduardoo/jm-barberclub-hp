'use client';

import React from 'react';
import { CalendarCheck2, Scissors, UserCheck, ArrowRight } from 'lucide-react';
import { buildAgendarUrl } from '../../lib/barberCatalog';

export const BookingStepsStrip: React.FC = () => {
  const bookingUrl = buildAgendarUrl();

  const steps = [
    {
      step: '01',
      title: 'Escolha o serviço',
      desc: 'Corte, barba ou combo com preço e duração transparentes.',
      icon: Scissors,
      accent: 'text-red-500',
    },
    {
      step: '02',
      title: 'Defina o especialista',
      desc: 'Selecione Matheus ou William e veja as vagas em tempo real.',
      icon: UserCheck,
      accent: 'text-blue-500',
    },
    {
      step: '03',
      title: 'Chegue e sente na cadeira',
      desc: 'Confirmação instantânea em 30 segundos, sem fila de espera.',
      icon: CalendarCheck2,
      accent: 'text-red-500',
    },
  ];

  return (
    <section
      aria-label="Como funciona o agendamento rápido"
      data-testid="booking-steps-strip"
      className="py-10 sm:py-12 bg-black border-b border-zinc-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <p className="text-xs font-mono text-blue-500 uppercase tracking-wider mb-1">
              Sem Cadastro Complicado
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Agendamento confirmado em 3 toques
            </h2>
          </div>

          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 transition-colors whitespace-nowrap"
          >
            <span>Abrir Assistente Agora</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${item.accent}`} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    Passo {item.step}
                  </span>
                  <h3 className="font-display text-sm sm:text-base font-bold text-white mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs font-light text-zinc-400 tracking-wide leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookingStepsStrip;
