'use client';

import React, { useEffect, useState } from 'react';
import {
  Star,
  ShieldCheck,
  Sparkles,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { GOOGLE_MAPS_REVIEWS_URL } from '../../lib/googleReviews.js';

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

function ReviewAvatar({ authorName, authorInitial, profilePhotoUrl }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (profilePhotoUrl && !imgFailed) {
    return (
      <img
        src={profilePhotoUrl}
        alt={`Foto de ${authorName}`}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className="w-9 h-9 rounded-full object-cover border border-zinc-800 shrink-0"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-mono font-bold text-white shrink-0"
    >
      {authorInitial || 'C'}
    </div>
  );
}

export const SocialProofSection = ({ initialData = null }) => {
  const [reviewsData, setReviewsData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) {
      setReviewsData(initialData);
      setIsLoading(false);
      return;
    }

    let active = true;
    fetch('/api/google-reviews')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!active) return;
        if (json) {
          setReviewsData(json);
        }
      })
      .catch(() => {
        // Fallback seguro sem quebrar a página
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [initialData]);

  const reviews = Array.isArray(reviewsData?.reviews) ? reviewsData.reviews : [];
  const ratingLabel =
    typeof reviewsData?.rating === 'number'
      ? `${reviewsData.rating.toFixed(1)} ★ no Google`
      : 'Avaliações no Google';
  const totalCount =
    typeof reviewsData?.userRatingsTotal === 'number' &&
    reviewsData.userRatingsTotal > 0
      ? reviewsData.userRatingsTotal
      : null;
  const googleUrl = reviewsData?.googleUrl || GOOGLE_MAPS_REVIEWS_URL;

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
              03. Prova Social · {ratingLabel}
              {totalCount !== null ? ` (${totalCount} avaliações)` : ''}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Quem corta no JM não troca
            </h2>
          </div>

          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="google-reviews-link"
            className="inline-flex items-center gap-1.5 text-xs font-light text-zinc-400 hover:text-white tracking-wide transition-colors whitespace-nowrap"
          >
            <span>Ver todas no Google</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
          </a>
        </div>

        {/* Estado de carregamento sutil */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((skeletonIdx) => (
              <div
                key={skeletonIdx}
                className="rounded-2xl bg-zinc-950/60 border border-zinc-900 p-6 h-44 animate-pulse"
              />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          /* Avaliações Reais da Google Places API (nota >= 4 e texto não vazio) */
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3">
            {reviews.slice(0, 3).map((item, idx) => (
              <article
                key={`${item.authorName}-${item.time || idx}`}
                className="snap-start shrink-0 w-[290px] md:w-auto rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-6 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`Avaliação ${item.rating} de 5 estrelas`}
                    >
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <Star
                          key={starValue}
                          className={`w-3.5 h-3.5 ${
                            starValue <= item.rating
                              ? 'text-red-500 fill-red-500'
                              : 'text-zinc-700'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    {item.relativeTimeDescription && (
                      <span className="text-[11px] font-mono text-zinc-400 tracking-wide">
                        {item.relativeTimeDescription}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-light text-zinc-300 tracking-wide leading-relaxed line-clamp-4">
                    “{item.text}”
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-900 flex items-center gap-3">
                  <ReviewAvatar
                    authorName={item.authorName}
                    authorInitial={item.authorInitial}
                    profilePhotoUrl={item.profilePhotoUrl}
                  />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-white truncate">
                      {item.authorName}
                    </p>
                    <p className="text-[11px] font-mono text-blue-400 tracking-wide mt-0.5">
                      Avaliação verificada · Google
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Fallback seguro: sem nomes fictícios inventados, convite limpo para conferir no Google */
          <div
            data-testid="google-reviews-fallback"
            className="rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className="w-3.5 h-3.5 text-red-500 fill-red-500"
                    aria-hidden="true"
                  />
                ))}
                <span className="text-xs font-mono text-zinc-300 ml-1">
                  Avaliações reais no Google Maps
                </span>
              </div>
              <p className="text-xs font-light text-zinc-400 tracking-wide leading-relaxed">
                Confira os comentários e avaliações verificadas dos clientes do JM Barberclub diretamente na nossa ficha oficial do Google.
              </p>
            </div>

            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Ver todas no Google</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
            </a>
          </div>
        )}

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
