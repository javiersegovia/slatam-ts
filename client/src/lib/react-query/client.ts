import { GetServerSidePropsContext } from 'next'
import { QueryClient } from 'react-query'
import { API_ENDPOINT } from '../utils/constants'
import Router from 'next/router'
import { GraphQLClient } from 'graphql-request'

const createGqlClient = (context?: GetServerSidePropsContext) => {
  const cookie = context?.req?.headers?.cookie
  return new GraphQLClient(API_ENDPOINT as string, {
    // mode: 'cors', // TODO: check how to implement cors for Security
    credentials: 'include',
    headers: {
      ...(cookie ? { Cookie: cookie } : {}),
    },
  })
}

const gqlClient = createGqlClient()

export function gqlFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  context?: GetServerSidePropsContext
) {
  if (context) {
    return async (): Promise<TData> => {
      const client = createGqlClient(context)
      const res = await client.request<TData, TVariables>(query, variables)
      return res
    }
  }

  return async (): Promise<TData> => {
    const res = await gqlClient.request<TData, TVariables>(query, variables)
    return res
  }
}

/**
 * This fetcher should be used only inside custom hooks. Normally, it is imported automatically
 * by the generated hooks file.
 * @param query Should be imported from Schema generated file when using custom Hooks
 * @param variables Optional variables value, if they exist, you should pass them inside the query key too
 *
 * Usage inside customHooks:
 * () => fetcher<MyCustomQuery, MyCustomQueryVariables>(MyCustomQueryDocument, myVariables)
 */
export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  context?: GetServerSidePropsContext
) {
  return async (): Promise<TData> => {
    const res = await fetch(API_ENDPOINT as string, {
      method: 'POST',
      credentials: 'include',
      // mode: 'cors', // TODO: check how to implement cors for Security
      headers: {
        'Content-Type': 'application/json',
        Cookie: context?.req?.headers?.cookie || '',
      },
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const error = json.errors[0]
      throw new Error(error.message)
    }

    return json.data
  }
}

type TRedirect = (route: string) => void

export const createQueryClient = () => {
  const redirect: TRedirect = (route) => {
    if (typeof window !== 'undefined') {
      Router.push(route)
    }
  }

  return createClient(redirect)
}

enum Errors {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

const createClient = (redirect?: TRedirect) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 5, // Time that the inactive queries data remains in the cache
        staleTime: 1000 * 60 * 2, // Time that the active queries remains as "valid",
        onError: (err) => handleRedirect(err, redirect),
      },
    },
  })
}

const handleRedirect = (err: any, redirect?: TRedirect) => {
  if (!redirect) return

  switch (err?.message) {
    case Errors.UNAUTHENTICATED:
      redirect(redirectRoutes[Errors.UNAUTHENTICATED])
      break
  }
}

const redirectRoutes = {
  UNAUTHENTICATED: '/sign-in?unauthenticated=true',
}
