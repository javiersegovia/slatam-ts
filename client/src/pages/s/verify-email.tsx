import React, { useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import _tw from 'twin.macro'
import { CurrentUserDocument, useVerifyEmailMutation } from '@graphql/hooks'
import { Spinner } from '@components/Loading'
import Router from 'next/router'
import routes from '@lib/utils/routes'
import { useQueryClient } from 'react-query'
import { gqlFetcher } from '@lib/react-query/client'
import { CurrentUserQuery, CurrentUserQueryVariables } from '@graphql/schema'
import { useCurrentUserQuery } from '../../graphql/hooks'

const VerifyEmail = ({ token }: { token: string | undefined }) => {
  const queryClient = useQueryClient()
  const [success, setSuccess] = useState(false)
  const { mutate, isLoading, error } = useVerifyEmailMutation()
  const redirectTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (token) {
      mutate(
        {
          token,
        },
        {
          onSuccess: async () => {
            setSuccess(true)

            await queryClient.prefetchQuery(
              useCurrentUserQuery.getKey(),
              gqlFetcher<CurrentUserQuery, CurrentUserQueryVariables>(
                CurrentUserDocument
              )
            )

            redirectTimeout.current = setTimeout(
              () => Router.push(routes.user.setup.profile),
              2000
            )
          },
        }
      )
    }

    return () => {
      if (redirectTimeout?.current) {
        clearInterval(redirectTimeout.current)
      }
    }
  }, [mutate, token, queryClient])

  useEffect(() => {
    Router.prefetch(routes.user.setup.profile)
  }, [])

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container px-0 py-20 mx-auto sm:px-4">
        <div className="w-full px-4 pt-10 pb-10 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-4/12 sm:px-6">
          <div>
            <>
              {isLoading ? (
                <div tw="grid justify-items-center">
                  <Spinner color="blue" size={8} />
                </div>
              ) : success ? (
                <>
                  <h1 className="mb-8 text-3xl font-semibold text-center text-green-500">
                    Your email has been verified!
                  </h1>
                  <div tw="border-t block border-gray-300 my-6 w-full" />
                  <p tw="text-center">
                    <strong tw="font-medium">
                      We are pleased to welcome you.
                    </strong>
                    <br />
                    <br />
                    In a few seconds, we will redirect you to another page so
                    you can start fullfiling your profile.
                    <br />
                    <br />
                    <div tw="border-t block border-gray-300 my-6 w-full" />
                    <span tw="italic ">
                      If the redirection does not work, please{' '}
                      <Link href={routes.user.setup.profile}>
                        <a
                          href={routes.user.setup.profile}
                          tw="text-blue-600 underline"
                        >
                          click here
                        </a>
                      </Link>
                    </span>
                  </p>
                </>
              ) : (
                (error || !token) && (
                  <>
                    <h1 className="mb-8 text-3xl font-semibold text-center text-red-500">
                      Something went wrong.
                    </h1>
                    <p tw="text-center">
                      Your verification link is either invalid or expired.{' '}
                      <br />
                      Please,{' '}
                      <Link href={routes.session.requestConfirmationEmail}>
                        <a
                          href={routes.session.requestConfirmationEmail}
                          tw="text-blue-600 underline"
                        >
                          follow this link
                        </a>
                      </Link>{' '}
                      to try again.
                    </p>
                  </>
                )
              )}
            </>
          </div>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token = '' } = context.query

  return {
    props: {
      token,
    },
  }
}

export default VerifyEmail
