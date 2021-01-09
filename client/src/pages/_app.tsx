import '@styles/main.css'

import type { FC } from 'react'
import type { AppProps } from 'next/app'
import tw from 'twin.macro'

import { createGlobalStyle } from 'styled-components'

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
    <div>
      <AppGlobalStyles />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default App
