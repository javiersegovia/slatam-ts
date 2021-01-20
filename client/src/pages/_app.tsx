import '@styles/main.css'
import '@styles/nprogress.css'
import { createGlobalStyle } from 'styled-components'

import type { FC } from 'react'
import tw from 'twin.macro'
import { QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createQueryClient } from '@lib/react-query/client'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

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
