'use client';

import React from 'react';
import { Star, ShieldCheck, Sparkles, Clock } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Lucas Henrique',
    service: 'Combo Corte + Barba',
    quote:
      'Marquei pelo app em 20 segundos, cheguei às 16h e já fui atendido na hora. O degradê do Matheus é outro nível em Campina Grande.',
  },
  {
    name: 'Rafael Medeiros',
    service: 'Barboterapia na Toalha Quente',
    quote:
      'Ambiente limpo, ar condicionado forte e zero enrolação. Atendimento com o William sempre pontual e acabamento impecável.',
  },
  {
    name: 'Gabriel Cavalcanti',
    service: 'Corte Executivo',
    quote:
      'Melhor custo-benefício do Monte Santo. Não perco mais metade da tarde esperando em barbearia lotada.',
  },
];

const GUARANTEES = [
  {
    title: 'Zero Fila · Hora Marcada',
    desc: 'Sua cadeira está reservada exatamente no minuto agendado.',
    icon: Clock,
    accent: 'text-red-500',
  },
  {
    title: 'Toalha Quente & Esterilização',
    desc: 'Lâminas descartáveis e biossegurança rigorosa em cada atendimento.',
    icon: ShieldCheck,
    accent: 'text-blue-500',
  },
  {
    title: 'Acabamento de Precisão',
    desc: 'Degradê limpo e alinhamento que mantêm o caimento por semanas.',
    icon: Sparkles,
    accent: 'text-red-500',
  },
];

export const SocialProofSection: React.FC = () => {
  return (
    <section
      id="avaliacoes"
      aria-label="Avaliações reais e garantias JM Barberclub"
      data-testid="social-proof-section"
      className="scroll-mt-28 md:scroll-mt-16 py-12 sm:py-16 bg-black border-b border-zinc-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <p className="text-xs font-mono text-blue-500 uppercase tracking-wider mb-1">
              03. Prova Social · 4.9 ★ no Google
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Quem corta no JM não troca
            </h2>
          </div>
          <span className="text-xs font-light text-zinc-400 tracking-wide">
            Avaliações verificadas de clientes no Monte Santo
          </span>
        </div>

        {/* Depoimentos em Carrossel Mobile / Grid Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.name}
              className="snap-start shrink-0 w-[290px] md:w-auto rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div
                  className="flex items-center gap-1"
                  aria-label="Avaliação 5 de 5 estrelas"
                >
                  {[0, 1, 2, 3, 4].map((starIdx) => (
                    <Star
                      key={starIdx}
                      className="w-3.5 h-3.5 text-red-500 fill-red-500"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm font-light text-zinc-300 tracking-wide leading-relaxed">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-900">
                <p className="font-display text-sm font-bold text-white">
                  {item.name}
                </p>
                <p className="text-[11px] font-mono text-blue-400 tracking-wide mt-0.5">
                  {item.service}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Selos de Garantia & Benefícios Emocionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {GUARANTEES.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className="rounded-2xl bg-zinc-950/40 border border-zinc-900/90 p-5 flex items-center gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${g.accent}`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    {g.title}
                  </h3>
                  <p className="text-xs font-light text-zinc-400 tracking-wide mt-0.5">
                    {g.desc}
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

export default SocialProofSection;
