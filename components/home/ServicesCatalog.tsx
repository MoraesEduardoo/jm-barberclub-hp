import React from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import {
  buildAgendarUrl,
  createMinimalistBarberSvg,
  PublicServiceRecord,
} from '../../lib/barberCatalog';

interface ServicesCatalogProps {
  services: PublicServiceRecord[];
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ services }) => {
  const handleImageFallback = (
    e: React.SyntheticEvent<HTMLImageElement>,
    service: PublicServiceRecord,
    idx: number
  ) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = createMinimalistBarberSvg(
      service.name.toUpperCase().slice(0, 22),
      `${service.duration_minutes} MIN · ${service.price_formatted}`,
      idx % 2 === 0 ? '#DC2626' : '#1D4ED8',
      service.category === 'Combo' ? 'combo' : service.category === 'Barba' ? 'beard' : 'fade'
    );
  };

  return (
    <section id="servicos" className="scroll-mt-16 py-12 sm:py-16 bg-black border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-mono text-blue-500 uppercase tracking-wider mb-1">
              01. Catálogo Oficial
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Serviços & Preços
            </h2>
          </div>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            Toque para agendar no Chatbot Oficial
          </span>
        </div>

        {/* Dynamic Services from public.services: Horizontal Carousel on Mobile, Responsive Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, idx) => {
            const serviceHref = buildAgendarUrl({ service: service.id });
            return (
              <article
                key={service.id}
                className="snap-start shrink-0 w-[272px] md:w-auto rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-4 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={service.image_url}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageFallback(e, service, idx)}
                    className="w-full h-44 object-cover object-center rounded-xl border border-zinc-900 mb-3.5"
                  />

                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-1.5 tabular-nums">
                    <span className="text-blue-400">{service.category}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
                      {service.duration_minutes} min
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white mb-1">
                    {service.name}
                  </h3>

                  {service.description && (
                    <p className="text-xs text-zinc-400 line-clamp-2 mb-4">
                      {service.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 mt-2 border-t border-zinc-900 flex items-center justify-between gap-2">
                  <span className="font-mono text-lg font-bold text-white tabular-nums">
                    {service.price_formatted}
                  </span>

                  <a
                    href={serviceHref}
                    aria-label={`Agendar este serviço: ${service.name}`}
                    className="inline-flex items-center justify-center gap-1 min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Agendar este</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
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

export default ServicesCatalog;
