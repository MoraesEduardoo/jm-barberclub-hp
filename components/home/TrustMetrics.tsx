import React from 'react';
import { Users, Star, Clock, Award } from 'lucide-react';

const METRICS = [
  {
    id: 'metric-clients',
    value: '+5.000',
    label: 'Clientes atendidos',
    icon: Users,
    iconColor: 'text-blue-500',
  },
  {
    id: 'metric-google',
    value: '4.9 ★',
    label: 'Avaliação Google',
    icon: Star,
    iconColor: 'text-red-500',
  },
  {
    id: 'metric-punctual',
    value: '100%',
    label: 'Pontualidade',
    icon: Clock,
    iconColor: 'text-blue-500',
  },
  {
    id: 'metric-specialists',
    value: '2',
    label: 'Especialistas',
    icon: Award,
    iconColor: 'text-red-500',
  },
];

export const TrustMetrics: React.FC = () => {
  return (
    <section
      aria-label="Indicadores de Autoridade JM BarberClub"
      className="py-6 bg-black border-b border-zinc-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {METRICS.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <IconComponent className={`w-4 h-4 ${item.iconColor}`} aria-hidden="true" />
                </div>
                <div>
                  <div className="font-mono text-base sm:text-lg font-bold text-white tabular-nums leading-tight">
                    {item.value}
                  </div>
                  <p className="text-xs text-zinc-400">{item.label}</p>
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
