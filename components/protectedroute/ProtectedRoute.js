// components/ProtectedRoute.js
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import Loading from '@/app/loading';

const ProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    if (!user === null) {
      return <Loading />;
    }

    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default ProtectedRoute;
