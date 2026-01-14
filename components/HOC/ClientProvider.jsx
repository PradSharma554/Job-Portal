"use client"

import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const ClientProvider = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <NuqsAdapter>
                    {children}
                </NuqsAdapter>
            </SessionProvider>
        </QueryClientProvider>
    )
}

export default ClientProvider
