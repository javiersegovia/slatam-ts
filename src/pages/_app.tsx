import '@styles/main.css'

import type { FC } from 'react'
import type { AppProps } from 'next/app'
import { GlobalStyles } from 'twin.macro'

const Noop: FC = ({ children }) => <>{children}</>

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop

  return (
    <div>
      <GlobalStyles />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default App
