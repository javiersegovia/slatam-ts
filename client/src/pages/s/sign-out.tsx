import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { SignOutDocument } from '@graphql/hooks'
import { gqlFetcher } from '@lib/react-query/client'
import { SignOutMutation, SignOutMutationVariables } from '@graphql/schema'
import Router from 'next/router'
import routes from '@lib/utils/routes'
import { useQueryClient } from 'react-query'

const VerifyEmail = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const clearCache = async () => {
      await queryClient.clear()
      await queryClient.resetQueries()

      Router.push(routes.home)
    }
    clearCache()
  }, [queryClient])

  return null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await gqlFetcher<SignOutMutation, SignOutMutationVariables>(
    SignOutDocument,
    undefined,
    context
  )()

  return {
    props: {},
  }
}

export default VerifyEmail
