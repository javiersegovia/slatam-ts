import '@styles/main.css'
import { createGlobalStyle } from 'styled-components'
import tw from 'twin.macro'

import type { FC } from 'react'
import type { AppProps } from 'next/app'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apollo'

const Noop: FC = ({ children }) => <>{children}</>

const AppGlobalStyles = createGlobalStyle`
  *:focus,
  button:focus {
    ${tw`outline-none`}
  }
`

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop

  const apolloClient = useApollo(pageProps)

  return (
    <div>
      <AppGlobalStyles />
      <ApolloProvider client={apolloClient}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </div>
  )
}

export default App
