import React, { useEffect, useState } from 'react'
import _tw from 'twin.macro'
import Link from 'next/link'
import Input from '@components/FormFields/Input'
import Button, { ButtonColorVariants } from '@components/Button'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import routes from '@lib/utils/routes'
import { useRequestConfirmationEmailMutation } from '@graphql/hooks'

type IFormValues = {
  email: string
}

// TODO: add Slatam Logo to top (with link to Home)

const RequestConfirmationEmail = () => {
  const [success, setSuccess] = useState(false)
  const {
    mutate: requestEmail,
    isLoading,
  } = useRequestConfirmationEmailMutation()

  const { register, handleSubmit, formState, errors } = useForm<IFormValues>()

  const { isSubmitting } = formState
  const submitting = isLoading || isSubmitting

  const onSubmit = ({ email }: IFormValues) => {
    return requestEmail(
      {
        email,
      },
      {
        onSettled: () => {
          setSuccess(true)
          Router.push(routes.session.pleaseVerify)
        },
      }
    )
  }

  useEffect(() => {
    Router.prefetch(routes.session.pleaseVerify)
  }, [])

  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <div className="container px-0 py-20 mx-auto sm:px-4">
          <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-4/12 sm:px-6">
            <h1 className="mb-8 text-3xl font-semibold text-center text-gray-900">
              Email confirmation
            </h1>
            <p tw="text-center">
              Specify your email below and we will send you a new confirmation
              link.
            </p>
            <br />
            <form onSubmit={handleSubmit(onSubmit)} tw="mb-8 space-y-2">
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="Ex. james@bond.com"
                register={register}
                validations={{
                  required: {
                    value: true,
                    message: 'Please, specify your email address',
                  },
                }}
                error={errors?.email}
              />

              <Button
                type="submit"
                variant={success ? ButtonColorVariants.SUCCESS : undefined}
                isLoading={submitting}
                disabled={submitting || success}
                showCheckOnSuccess
              >
                Send confirmation email
              </Button>
            </form>
          </div>
          <p className="mb-4 text-xs text-center text-gray-400">
            <Link href={routes.session.signUp}>
              <a
                href={routes.session.signUp}
                className="text-blue-900 underline hover:text-black"
              >
                Sign up
              </a>
            </Link>
            <span className="mx-1">·</span>
            <Link href={routes.session.signIn}>
              <a
                href={routes.session.signIn}
                className="text-blue-900 underline hover:text-black"
              >
                Sign in
              </a>
            </Link>
            <span className="mx-1">·</span>
            <Link href={routes.legal.privacyTerms}>
              <a
                href={routes.legal.privacyTerms}
                className="text-blue-900 underline hover:text-black"
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

export default RequestConfirmationEmail
