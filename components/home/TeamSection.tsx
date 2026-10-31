import React from 'react';
import { Calendar } from 'lucide-react';
import {
  buildAgendarUrl,
  createMinimalistBarberSvg,
  ExecutiveBarber,
} from '../../lib/barberCatalog';

interface TeamSectionProps {
  barbers: ExecutiveBarber[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ barbers }) => {
  const handleAvatarFallback = (
    e: React.SyntheticEvent<HTMLImageElement>,
    barber: ExecutiveBarber,
    idx: number
  ) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = createMinimalistBarberSvg(
      barber.name.toUpperCase(),
      `CADEIRA 0${idx + 1} · ESPECIALISTA`,
      idx % 2 === 0 ? '#DC2626' : '#1D4ED8',
      idx % 2 === 0 ? 'barber-m' : 'barber-w'
    );
  };

  return (
    <section id="equipe" className="scroll-mt-16 py-12 sm:py-16 bg-black border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-mono text-blue-500 uppercase tracking-wider mb-1">
            03. Equipe Executiva
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Especialistas JM Barberclub
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {barbers.map((barber, idx) => {
            const barberBookingUrl = buildAgendarUrl({
              barber: barber.id,
            });

            return (
              <article
                key={barber.id}
                className="rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-4 sm:p-5 flex flex-col justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={barber.image_url}
                    alt={`Barbeiro Executivo ${barber.name}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleAvatarFallback(e, barber, idx)}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover object-center rounded-xl border border-zinc-800 shrink-0"
                  />

                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-bold text-white">
                      {barber.name}
                    </h3>
                    <p className="text-xs font-medium text-blue-400">{barber.role}</p>
                    <p className="text-xs text-zinc-400 leading-snug">
                      {barber.specialty}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-900">
                  <a
                    href={barberBookingUrl}
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-500 transition-colors whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Agendar com {barber.name}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
