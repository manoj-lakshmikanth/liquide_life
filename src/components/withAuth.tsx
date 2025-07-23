'use client';

import { useEffect, useState, ComponentType, JSX } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../lib/auth';

export default function withAuth<T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) {
  return function AuthWrapper(props: T) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace('/login');
      } else {
        setChecked(true);
      }
    }, []);

    if (!checked) return <p>Loading...</p>;

    return <Component {...props} />;
  };
}
