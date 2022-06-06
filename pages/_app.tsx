import type { AppProps } from 'next/app'
import Error from '@components/Error'
import { ErrorBoundary } from 'react-error-boundary'
import { RecoilRoot } from 'recoil'

import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from 'react-query'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 5,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        suspense: true,
        useErrorBoundary: true,
      },
    },
  })
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              // eslint-disable-next-line react/no-unstable-nested-components
              fallbackRender={({ resetErrorBoundary }) => <Error resetErrorBoundary={resetErrorBoundary} />}
            >
              <Component {...pageProps} />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
