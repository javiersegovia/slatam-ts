export const API_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_GRAPHQL_DEV_URI
    : process.env.NEXT_PUBLIC_GRAPHQL_PROD_URI
