'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const handleLogin = (user: any) => {
    console.log(`User ${user.id} logged in!`);
  };

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      onSuccess={handleLogin}
      config={{
        loginMethodsAndOrder: {
            primary: ['email', 'privy:cmd8euall0037le0my79qpz42'],
        },
        appearance: {
          theme: 'light',
          accentColor: '#6A44BC',
          logo: 'https://i.postimg.cc/sD7df07H/Royal-Mystery.jpg',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
