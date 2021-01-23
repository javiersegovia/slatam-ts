import React from 'react'
import _tw from 'twin.macro'
import { useGetCurrentUserQuery } from '@graphql/hooks'
import Router from 'next/router'
import routes from '@lib/utils/routes'
/**
 * This component should be used to restrict access to pages intended for NOT authenticated users (signIn, signUp...)
 * place it on the top of component tree, preferably at page level
 */
const IsNotAuthenticated: React.FC = ({ children }) => {
  const { data, isLoading } = useGetCurrentUserQuery(undefined, {
    retry: false,
  })

  if (isLoading) {
    return null
  }

  if (data?.currentUser) {
    Router.push(routes.home)
    return null
  }

  return <>{children}</>
}

export default IsNotAuthenticated
