'use client';

import React, { useState } from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import {
  buildAgendarUrl,
  createMinimalistBarberSvg,
  filterServicesByCategory,
  PublicServiceRecord,
  SERVICE_CATEGORY_FILTERS,
  ServiceCategoryFilter,
} from '../../lib/barberCatalog';

interface ServicesCatalogProps {
  services: PublicServiceRecord[];
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ services }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategoryFilter>('Todos');

  const filteredServices = filterServicesByCategory(services, selectedCategory);

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
    <section
      id="servicos"
      className="scroll-mt-28 md:scroll-mt-16 py-12 sm:py-16 bg-black border-b border-zinc-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <p className="text-xs font-mono text-blue-500 uppercase tracking-wider mb-1">
              01. Catálogo Oficial
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Serviços & Preços
            </h2>
          </div>
          <span className="text-xs font-light text-zinc-400 tracking-wide">
            Agendamento online em menos de 1 minuto
          </span>
        </div>

        {/* Filtros Rápidos por Categoria (Todos, Cortes, Barba, Combos) */}
        <div
          role="tablist"
          aria-label="Filtrar serviços por categoria"
          data-testid="service-category-filters"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {SERVICE_CATEGORY_FILTERS.map((category) => {
            const isActive = selectedCategory === category;
            const count = filterServicesByCategory(services, category).length;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center gap-2 min-h-[38px] px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`font-mono text-[11px] px-1.5 py-0.5 rounded tabular-nums ${
                    isActive
                      ? 'bg-black/30 text-white'
                      : 'bg-zinc-900 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Services from public.services: Horizontal Carousel on Mobile, Responsive Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.map((service, idx) => {
            const serviceHref = buildAgendarUrl({ service: service.id });
            return (
              <article
                key={service.id}
                className="snap-start shrink-0 w-[280px] md:w-auto rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-6 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={service.image_url}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageFallback(e, service, idx)}
                    className="w-full h-44 object-cover object-center rounded-xl border border-zinc-900 mb-4"
                  />

                  <div className="flex items-center justify-between text-xs font-light text-zinc-400 tracking-wide font-mono mb-2 tabular-nums">
                    <span className="text-blue-400">{service.category}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
                      {service.duration_minutes} min
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white mb-1.5">
                    {service.name}
                  </h3>

                  {service.description && (
                    <p className="text-xs font-light text-zinc-400 tracking-wide line-clamp-2 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-2 border-t border-zinc-900 flex items-center justify-between gap-2">
                  <span className="font-mono text-lg font-bold text-white tabular-nums">
                    {service.price_formatted}
                  </span>

                  <a
                    href={serviceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Reservar serviço: ${service.name}`}
                    className="inline-flex items-center justify-center gap-1 min-h-[40px] px-4 py-2 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 whitespace-nowrap shrink-0"
                  >
                    <span>Reservar</span>
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
