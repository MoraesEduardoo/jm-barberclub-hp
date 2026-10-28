'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  buildAgendarUrl,
  filterGalleryItems,
  GALLERY_ITEMS,
  GalleryCategory,
} from '../../lib/barberCatalog';

const CATEGORIES: GalleryCategory[] = ['Todos', 'Fade', 'Barba', 'Social', 'Combos'];

export const GalleryGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('Todos');
  const filteredItems = filterGalleryItems(GALLERY_ITEMS, selectedCategory);

  return (
    <section id="galeria" className="scroll-mt-16 py-12 sm:py-16 bg-black border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-mono text-blue-500 uppercase tracking-wider mb-1">
              02. Estilos Reais
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Galeria de Cortes
            </h2>
          </div>

          {/* Compact Filter Bar */}
          <div
            role="group"
            aria-label="Filtrar galeria por categoria"
            className="flex overflow-x-auto items-center gap-1.5 p-1 rounded-xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Carousel on Mobile, Compact Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {filteredItems.map((item) => {
            const deepLinkHref = buildAgendarUrl({
              service: item.serviceSlug,
              barber: item.barberName.toLowerCase(),
              style: item.title,
            });

            return (
              <article
                key={item.id}
                className="group snap-start shrink-0 w-[250px] sm:w-auto rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden border-b border-zinc-900">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-1">
                      <span className="text-blue-400">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Por {item.barberName}</span>
                    </div>

                    <h3 className="font-display text-base font-bold text-white">
                      {item.title}
                    </h3>
                  </div>

                  <a
                    href={deepLinkHref}
                    aria-label={`Quero este estilo: ${item.title} com ${item.barberName}`}
                    className="inline-flex items-center justify-between pt-2.5 border-t border-zinc-900 text-xs font-semibold text-red-500 hover:text-red-400 transition-colors whitespace-nowrap"
                  >
                    <span>Quero Este Estilo</span>
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

export default GalleryGrid;
