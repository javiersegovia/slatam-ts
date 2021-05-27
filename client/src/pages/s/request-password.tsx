import React, { useState } from 'react'
import _tw from 'twin.macro'
import Link from 'next/link'
import Input from '@components/FormFields/Input'
import Button from '@components/Button'
import { useForm } from 'react-hook-form'
import { useRequestPasswordMutation } from '@graphql/hooks'
import routes from '@lib/utils/routes'

type IFormValues = {
  email: string
}

// TODO: add Slatam Logo to top (with link to Home)

const RequestPassword = () => {
  const [success, setSuccess] = useState(false)
  const { mutate: requestReset, isLoading } = useRequestPasswordMutation()

  const { register, handleSubmit, formState, errors } = useForm<IFormValues>()

  const { isSubmitting } = formState
  const submitting = isLoading || isSubmitting

  const onSubmit = ({ email }: IFormValues) => {
    return requestReset(
      {
        email,
      },
      {
        onSettled: () => {
          setSuccess(true)
        },
      }
    )
  }

  return (
    <>
      <section tw="bg-gray-100 min-h-screen">
        <div tw="container px-0 py-20 mx-auto sm:px-4">
          <div tw="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-4/12 sm:px-6">
            <h1
              tw="mb-8 text-3xl font-semibold text-center"
              css={[success ? _tw`text-green-500` : _tw`text-gray-900`]}
            >
              {success ? 'Email sent' : 'Forgot your password?'}
            </h1>
            {success ? (
              <>
                <p tw="text-center">
                  We have sent an email to the address you specified. Please
                  follow the instructions there to change your password.
                </p>
                <br />
                <p tw="text-center italic pb-4">
                  If you did not receive any email, please{' '}
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-blue-600 underline italic"
                  >
                    click here
                  </button>{' '}
                  and try again.
                </p>
              </>
            ) : (
              <>
                <p tw="text-center">
                  No problem. Enter your email below and we will send you a link
                  to change it.
                </p>
                <br />
                <form onSubmit={handleSubmit(onSubmit)} tw="mb-8 space-y-2">
                  <Input
                    name="email"
                    type="email"
                    label="Email address"
                    placeholder="Ex. james@bond.com"
                    register={register}
                    validations={{
                      required: {
                        value: true,
                        message: 'Please specify your email address',
                      },
                    }}
                    error={errors?.email}
                  />

                  <Button
                    type="submit"
                    variant={success ? 'SUCCESS' : undefined}
                    isLoading={submitting}
                    disabled={submitting || success}
                    showCheckOnSuccess
                  >
                    Request password change
                  </Button>
                </form>
              </>
            )}
          </div>
          <p tw="mb-4 text-xs text-center text-gray-400">
            <Link href={routes.session.signUp}>
              <a
                href={routes.session.signUp}
                tw="text-blue-900 underline hover:text-black"
              >
                Sign up
              </a>
            </Link>
            <span tw="mx-1">·</span>
            <Link href={routes.session.signIn}>
              <a
                href={routes.session.signIn}
                tw="text-blue-900 underline hover:text-black"
              >
                Sign in
              </a>
            </Link>
            <span tw="mx-1">·</span>
            <Link href={routes.legal.privacyTerms}>
              <a
                href={routes.legal.privacyTerms}
                tw="text-blue-900 underline hover:text-black"
              >
                Privacy terms
              </a>
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default RequestPassword
