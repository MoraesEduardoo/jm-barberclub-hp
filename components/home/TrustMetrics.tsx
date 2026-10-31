import React from 'react';
import { Users, Star, Clock, Award } from 'lucide-react';
import {
  DEFAULT_TRUST_METRICS,
  PublicTrustMetrics,
} from '../../lib/barberCatalog';

interface TrustMetricsProps {
  metrics?: PublicTrustMetrics;
}

export const TrustMetrics: React.FC<TrustMetricsProps> = ({
  metrics = DEFAULT_TRUST_METRICS,
}) => {
  const items = [
    {
      id: 'metric-clients',
      value: metrics.clientsDisplay,
      label: 'Clientes atendidos',
      icon: Users,
      iconColor: 'text-blue-500',
    },
    {
      id: 'metric-google',
      value: metrics.googleRating,
      label: 'Avaliação Google',
      icon: Star,
      iconColor: 'text-red-500',
    },
    {
      id: 'metric-punctual',
      value: metrics.punctualityDisplay,
      label: 'Pontualidade',
      icon: Clock,
      iconColor: 'text-blue-500',
    },
    {
      id: 'metric-specialists',
      value: String(metrics.specialistsCount),
      label: 'Especialistas',
      icon: Award,
      iconColor: 'text-red-500',
    },
  ];

  return (
    <section
      aria-label="Indicadores de Autoridade JM Barberclub"
      className="py-6 bg-black border-b border-zinc-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <IconComponent className={`w-4 h-4 ${item.iconColor}`} aria-hidden="true" />
                </div>
                <div>
                  <div
                    data-testid={item.id}
                    className="font-mono text-base sm:text-lg font-bold text-white tabular-nums leading-tight"
                  >
                    {item.value}
                  </div>
                  <p className="text-xs font-light text-zinc-400 tracking-wide mt-0.5">
                    {item.label}
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

export default TrustMetrics;
