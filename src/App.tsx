import React, { useEffect, useState } from 'react';
import { HomePageView } from '../app/page';
import {
  EXECUTIVE_BARBERS,
  ExecutiveBarber,
  fetchPublicBarbers,
  fetchPublicServices,
  PublicServiceRecord,
  SEED_PUBLIC_SERVICES,
} from '../lib/barberCatalog';

export function App() {
  const [services, setServices] = useState<PublicServiceRecord[]>(SEED_PUBLIC_SERVICES);
  const [barbers, setBarbers] = useState<ExecutiveBarber[]>(EXECUTIVE_BARBERS);

  useEffect(() => {
    let active = true;
    Promise.all([fetchPublicServices(), fetchPublicBarbers()]).then(
      ([serviceRows, barberRows]) => {
        if (!active) return;
        if (serviceRows.length > 0) setServices(serviceRows);
        if (barberRows.length > 0) setBarbers(barberRows);
      }
    );
    return () => {
      active = false;
    };
  }, []);

  return <HomePageView services={services} barbers={barbers} />;
}

export default App;
