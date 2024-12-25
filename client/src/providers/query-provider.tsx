"use client"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import AuthProvider from "@/providers/auth-provider";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

export default function QueryProvider({children}) {
    const queryClient = new QueryClient({
            defaultOptions:{
                queries:{
                    staleTime:6*1000,
                    refetchInterval:6*1000,
                },
            },
        })
    return (
        <AuthProvider >
            <QueryClientProvider client={queryClient}>
            {children}
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </AuthProvider>
    );
}