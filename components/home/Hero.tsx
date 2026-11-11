'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import {
  buildAgendarUrl,
  MATHEUS_WHATSAPP_URL,
  OFFICIAL_LOGO_URL,
} from '../../lib/barberCatalog';

export const Hero: React.FC = () => {
  const bookingUrl = buildAgendarUrl();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScrollFade = () => {
      const scrollY = window.scrollY;
      // Smooth fade-out between 0px and 420px of scroll
      const progress = Math.min(Math.max(scrollY / 420, 0), 1);
      setScrollProgress(progress);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScrollFade);
      }
    };

    updateScrollFade();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Subtle base opacity (0.26 at top -> 0 on scroll) so OLED black and H1 legibility remain flawless
  const backdropOpacity = Math.max(0, Number((0.26 * (1 - scrollProgress)).toFixed(3)));
  const backdropTranslateY = Math.round(scrollProgress * 28);
  const backdropScale = Number((1 + scrollProgress * 0.05).toFixed(3));

  return (
    <section
      id="conceito"
      className="relative pt-32 pb-14 sm:pt-36 sm:pb-20 bg-black border-b border-zinc-900 overflow-hidden [clip-path:inset(0)]"
    >
      {/* Camada de Fundo Imersiva com o Emblema Oficial, Máscara de Degradê Vertical e Fade-out no Scroll */}
      <div
        data-testid="hero-bg-emblem"
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-14 h-[460px] sm:h-[540px] z-0 flex items-center justify-center overflow-hidden will-change-[opacity,transform]"
        style={{
          opacity: backdropOpacity,
          transform: `translate3d(0, ${backdropTranslateY}px, 0) scale(${backdropScale})`,
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 100%)',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 100%)',
        }}
      >
        <img
          src={OFFICIAL_LOGO_URL}
          alt=""
          referrerPolicy="no-referrer"
          className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] object-contain select-none will-change-transform"
        />
      </div>

      {/* Vinheta OLED & Luzes de Acento Subtis (Vermelho & Azul Profundo) fundindo-se em #000000 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 30%, rgba(220, 38, 38, 0.14), transparent 52%), radial-gradient(circle at 80% 35%, rgba(29, 78, 216, 0.12), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.72) 68%, #000000 100%)',
        }}
      />

      {/* Conteúdo Principal de Alta Legibilidade em Primeiro Plano */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 sm:space-y-6">
        <p className="text-xs font-light font-mono text-zinc-400 tracking-wide">
          Campina Grande, PB <span className="text-blue-500">·</span>{' '}
          <span className="text-red-500 font-semibold">Barbearia Premium</span>
        </p>

        <h1
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08]"
          style={{ textWrap: 'balance' }}
        >
          O padrão que define o homem de{' '}
          <span className="text-red-500">Campina Grande</span>
        </h1>

        <p className="text-xs sm:text-sm font-light text-zinc-400 tracking-wide max-w-xl mx-auto leading-relaxed">
          Cortes executivos, degradê milimétrico e barboterapia na toalha quente com horário 100% pontual no bairro Monte Santo.
        </p>

        {/* Thumb-Friendly Mobile CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 whitespace-nowrap"
          >
            <span>Agendar Horário Agora</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <a
            href={MATHEUS_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3.5 rounded-xl text-sm font-semibold text-zinc-100 backdrop-blur-md bg-zinc-950/70 border border-zinc-800 hover:border-blue-500/60 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <span>Falar com a Barbearia</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
