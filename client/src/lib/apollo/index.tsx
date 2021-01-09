import { useMemo } from 'react'
import merge from 'deepmerge'

import { NextPageContext } from 'next'
import { AppContext } from 'next/app'
import isEqual from 'lodash/isEqual'

import type { NormalizedCacheObject } from '@apollo/client'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

// import cookie from 'cookie'
// import type { IncomingMessage } from 'http'
// import type { GetServerSidePropsContext } from 'next'
// import { setContext } from '@apollo/client/link/context'

interface PageProps {
  props?: Record<string, any>
}

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__'
// export const COOKIES_TOKEN_NAME = 'jwt'

// const getToken = (req?: IncomingMessage) => {
//   const parsedCookie = cookie.parse(
//     req ? req.headers.cookie ?? '' : document.cookie
//   )

//   return parsedCookie[COOKIES_TOKEN_NAME]
// }

type IApolloClient = ApolloClient<NormalizedCacheObject> | null

interface NextPageContextWithApollo extends NextPageContext {
  apolloClient: IApolloClient
  apolloState: NormalizedCacheObject
  ctx: NextPageContextApp
}

type NextPageContextApp = NextPageContextWithApollo & AppContext

let apolloClient: IApolloClient = null

const isDev = process.env.NODE_ENV === 'development'

const createApolloClient = () => {
  // const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const httpLink = new HttpLink({
    uri: isDev
      ? process.env.NEXT_PUBLIC_GRAPHQL_DEV_URI
      : process.env.NEXT_PUBLIC_GRAPHQL_PROD_URI,
    credentials: 'same-origin',
  })

  // const authLink = setContext((_, { headers }) => {
  //   // Get the authentication token from cookies
  //   const token = getToken(ctx?.req)

  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : '',
  //     },
  //   }
  // })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: authLink.concat(httpLink),
    link: httpLink,
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const client = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract()

    // Merge the existing cache into data passed from
    // getStaticProps/getServerSideProps
    // const data = merge(initialState, existingCache)
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    client.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client
  }

  // Then create or reuse the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client
  }

  return client
}
/**
 * The addApolloState function should be used inside
 * getStaticProps method. Example below:
 */
// export async function getStaticProps() {
//   const apolloClient = initializeApollo()

//   await apolloClient.query({
//     query: ALL_POSTS_QUERY,
//     variables: allPostsQueryVars,
//   })

//   return addApolloState(apolloClient, {
//     props: {},
//     revalidate: 1,
//   })
// }
export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: PageProps
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract()
  }

  return pageProps
}

type PagePropsWithApolloState = PageProps & {
  [APOLLO_STATE_PROPERTY_NAME]?: NormalizedCacheObject | null
}

export function useApollo(pageProps: PagePropsWithApolloState) {
  const state = pageProps[APOLLO_STATE_PROPERTY_NAME]
  const store = useMemo(() => initializeApollo(state), [state])

  return store
}
