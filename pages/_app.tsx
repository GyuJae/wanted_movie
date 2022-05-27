import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // retry: false,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        suspense: true,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default MyApp
