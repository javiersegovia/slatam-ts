import React from 'react'
import _tw from 'twin.macro'
import { Spinner } from '@components/Loading'
import { UnauthenticatedError } from '@components/Error'
import { useGetCurrentUserQuery } from '@graphql/hooks'
import { FullScreen } from '@components/UI'
/**
 * This component should be used to restrict access to authenticated users
 * place it on the top of component tree, preferably at page level
 */
const IsAuthenticated: React.FC = ({ children }) => {
  const { data, isLoading, error } = useGetCurrentUserQuery()

  if (isLoading) {
    return (
      <FullScreen isCentered>
        <Spinner color="blue" size={10} />
      </FullScreen>
    )
  }

  if (error || (!isLoading && !data)) {
    return (
      <FullScreen isCentered>
        <UnauthenticatedError />
      </FullScreen>
    )
  }

  return <>{children}</>
}

export default IsAuthenticated
