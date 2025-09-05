'use client';

import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import { QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

// Import the client from the dedicated subpath export (it is not re-exported in the root index)
import { authClient } from '@repo/auth/client';
import queryClient, { tsr } from '@/lib/query-client';

export function Providers({ children }: { children: ReactNode }) {
    const router = useRouter();

    return (
        <QueryClientProvider client={queryClient}>
            <tsr.ReactQueryProvider>
                <AuthUIProvider
                    authClient={authClient}
                    navigate={router.push}
                    baseURL={'http://localhost:3001'}
                    replace={router.replace}
                    onSessionChange={() => {
                        // Clear router cache (protected routes)
                        router.refresh();
                    }}
                    Link={Link}
                    social={{
                        providers: ['notion'],
                    }}
                    credentials={false}
                >
                    {children}
                </AuthUIProvider>
            </tsr.ReactQueryProvider>
        </QueryClientProvider>
    );
}
