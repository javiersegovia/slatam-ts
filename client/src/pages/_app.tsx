import '@styles/main.css'
import { createGlobalStyle } from 'styled-components'
import tw from 'twin.macro'

import type { FC } from 'react'
import type { AppProps } from 'next/app'

import { QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createQueryClient } from '@lib/react-query/client'

const queryClient = createQueryClient()

const Noop: FC = ({ children }) => <>{children}</>

const AppGlobalStyles = createGlobalStyle`
  *:focus,
  button:focus {
    ${tw`outline-none`}
  }
`

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppGlobalStyles />
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default App
