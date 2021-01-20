import React, { useState, useRef } from 'react'
import _tw from 'twin.macro'
// import Link from 'next/link'
import Input from '@components/FormFields/Input'
import Button, { ButtonColorVariants } from '@components/Button'
import { useForm } from 'react-hook-form'
import { useChangePasswordMutation } from '@graphql/hooks'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import routes from '@lib/utils/routes'
import { getExceptionErrors } from '@lib/utils/errors'
import Link from 'next/link'

type IFormValues = {
  password: string
  confirmPassword: string
}

// TODO: add validation of token query requirement
// TODO: handleSubmit data
// TODO: add Slatam Logo to top (with link to Home)

const ChangePassword = ({
  resetPasswordToken,
}: {
  resetPasswordToken?: string
}) => {
  const [success, setSuccess] = useState(false)
  const {
    mutate: changePassword,
    isLoading,
    error,
  } = useChangePasswordMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState,
    errors,
  } = useForm<IFormValues>()
  const { isSubmitting } = formState
  const submitting = isLoading || isSubmitting

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = async ({ password }: IFormValues) => {
    if (resetPasswordToken) {
      await changePassword(
        {
          data: {
            password,
            resetPasswordToken,
          },
        },
        {
          onSuccess: () => {
            setSuccess(true)
            setTimeout(() => Router.push(routes.dashboard.index), 4500)
          },
          onError: (e: any) => {
            const { info, message } = getExceptionErrors(e.response.errors)
            console.log({ info, message })
          },
        }
      )
    }
  }

  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <div className="container px-0 py-20 mx-auto sm:px-4">
          <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-4/12 sm:px-6">
            {!success && !error && resetPasswordToken ? (
              <>
                <h1 className="mb-8 text-3xl font-semibold text-center text-gray-900">
                  Change your password
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} tw="mb-8 space-y-2">
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    register={register}
                    validations={{
                      required: {
                        value: true,
                        message: 'Please specify a new password',
                      },
                      minLength: {
                        value: 8,
                        message:
                          'The new password should have at least 8 characters',
                      },
                    }}
                    error={errors?.password}
                  />
                  <Input
                    name="confirmPassword"
                    type="password"
                    label="Confirm your password"
                    register={register}
                    validations={{
                      required: {
                        value: true,
                        message: 'Please confirm your password',
                      },
                      validate: (value) =>
                        value === password.current ||
                        'The passwords do not match',
                    }}
                    error={errors?.confirmPassword}
                  />

                  <Button
                    type="submit"
                    variant={success ? ButtonColorVariants.SUCCESS : undefined}
                    isLoading={submitting}
                    disabled={submitting || success}
                    showCheckOnSuccess
                  >
                    Change password
                  </Button>
                </form>
              </>
            ) : success ? (
              <>
                <h1 className="mb-8 text-3xl font-semibold text-center text-green-500">
                  Password changed succesfully
                </h1>
                <div tw="border-t block border-gray-300 my-6 w-full" />
                <p tw="text-center">
                  You will be redirected in a few seconds.
                  <br />
                  <div tw="border-t block border-gray-300 my-6 w-full" />
                  <span tw="italic ">
                    If the redirection does not work, please{' '}
                    <Link href={routes.dashboard.index}>
                      <a
                        href={routes.dashboard.index}
                        tw="text-blue-600 underline"
                      >
                        click here
                      </a>
                    </Link>
                  </span>
                </p>
              </>
            ) : (
              <>
                <h1 className="mb-8 text-3xl font-semibold text-center text-red-500">
                  Something went wrong
                </h1>
                <p tw="text-center">
                  Your reset password link is either invalid or expired. <br />
                  Please,{' '}
                  <Link href={routes.session.requestPassword}>
                    <a
                      href={routes.session.requestPassword}
                      tw="text-blue-600 underline"
                    >
                      follow this link
                    </a>
                  </Link>{' '}
                  to try again.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resetPasswordToken = '' } = context.query

  return {
    props: {
      resetPasswordToken,
    },
  }
}

export default ChangePassword
