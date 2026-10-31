import React, { useEffect, useState } from 'react';
import { HomePageView } from '../app/page';
import {
  BarberProduct,
  DEFAULT_TRUST_METRICS,
  ExecutiveBarber,
  fetchPublicBarbers,
  fetchPublicProducts,
  fetchPublicServices,
  fetchTrustMetrics,
  PublicServiceRecord,
  PublicTrustMetrics,
} from '../lib/barberCatalog';

export function App() {
  const [metrics, setMetrics] = useState<PublicTrustMetrics>(DEFAULT_TRUST_METRICS);
  const [services, setServices] = useState<PublicServiceRecord[]>([]);
  const [products, setProducts] = useState<BarberProduct[]>([]);
  const [barbers, setBarbers] = useState<ExecutiveBarber[]>([]);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchTrustMetrics(),
      fetchPublicServices(),
      fetchPublicProducts(),
      fetchPublicBarbers(),
    ]).then(([metricsData, serviceRows, productRows, barberRows]) => {
      if (!active) return;
      setMetrics(metricsData);
      setServices(serviceRows);
      setProducts(productRows);
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
      products={products}
      barbers={barbers}
    />
  );
}

export default App;
