import React, { useEffect, useState } from 'react';
import { HomePageView } from '../app/page';
import {
  DEFAULT_TRUST_METRICS,
  ExecutiveBarber,
  fetchPublicBarbers,
  fetchPublicServices,
  fetchTrustMetrics,
  PublicServiceRecord,
  PublicTrustMetrics,
} from '../lib/barberCatalog';

export function App() {
  const [metrics, setMetrics] = useState<PublicTrustMetrics>(DEFAULT_TRUST_METRICS);
  const [services, setServices] = useState<PublicServiceRecord[]>([]);
  const [barbers, setBarbers] = useState<ExecutiveBarber[]>([]);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchTrustMetrics(),
      fetchPublicServices(),
      fetchPublicBarbers(),
    ]).then(([metricsData, serviceRows, barberRows]) => {
      if (!active) return;
      setMetrics(metricsData);
      setServices(serviceRows);
      setBarbers(barberRows);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <HomePageView
      metrics={metrics}
      services={services}
      barbers={barbers}
    />
  );
}

export default App;
