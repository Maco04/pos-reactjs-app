// components/ProtectedRoute.js
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import Loading from '@/app/loading';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <Loading />; // or a loading spinner
  }
  if (user) {
    return router.push('/dashboard'); // or a loading spinner
  }
};

export default ProtectedRoute;
