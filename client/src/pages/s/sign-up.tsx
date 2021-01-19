import React, { useRef, useState } from 'react'
import _tw from 'twin.macro'
import Link from 'next/link'
import Input from '@components/FormFields/Input'
import Button, { ButtonColorVariants } from '@components/Button'
import { useForm } from 'react-hook-form'
import { useSignUpMutation } from '@graphql/hooks'
import { GraphQLError } from 'graphql'
import Router from 'next/router'
import { HiCheck } from 'react-icons/hi'
import { Spinner } from '@components/Loading'

type IFormValues = {
  email: string
  password: string
  confirmPassword: string
}

// TODO: handleSubmit data
// TODO: handle defaultValues of form
// TODO: add Slatam Logo to top (with link to Home)
// TODO: replace svg google icon

const getExceptionErrors = (errors: readonly GraphQLError[]) => {
  const exceptionErrors = errors.map(({ message, extensions }) => {
    return {
      message,
      info: extensions?.exception?.response?.data,
    }
  })

  return exceptionErrors[0]
}

const FIELD_NAMES: (keyof IFormValues)[] = ['email', 'password']

const SignUp = () => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
    watch,
  } = useForm<IFormValues>()
  const { isSubmitting } = formState

  const password = useRef({})
  password.current = watch('password', '')

  const { mutate, isLoading } = useSignUpMutation()
  const [success, setSuccess] = useState(false)

  const onSubmit = async (formData: IFormValues) => {
    const { email, password } = formData

    await mutate(
      {
        data: {
          email,
          password,
        },
      },
      {
        onSuccess: () => {
          setSuccess(true)
          Router.push('/please-verify')
        },
        onError: (e: any) => {
          // TODO: move this logic to a reusable function across forms
          const { info /* message */ } = getExceptionErrors(e.response.errors)

          // TODO: use the "message" on an alert pop-up

          if (info) {
            Object.keys(info).forEach((errorKey: any, index: number) => {
              if (FIELD_NAMES.includes(errorKey)) {
                setError(errorKey, {
                  message: info[errorKey],
                  shouldFocus: index === 0,
                })
              }
            })
          }
        },
      }
    )
  }

  const submitting = isSubmitting || isLoading

  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <div className="container px-0 py-20 mx-auto sm:px-4">
          <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-4/12 sm:px-6">
            <h1 className="mb-8 text-3xl font-semibold text-center text-gray-900">
              Welcome!
            </h1>
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
                    message: 'Please, enter your email address',
                  },
                }}
                error={errors?.email}
              />
              <Input
                name="password"
                type="password"
                label="Password"
                // placeholder="Escribe tu contraseña aquí"
                register={register}
                validations={{
                  required: {
                    value: true,
                    message: 'Please, enter your password',
                  },
                  minLength: {
                    value: 8,
                    message: 'The password should have at least 8 digits',
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
                    message: 'Please, confirm your password',
                  },
                  validate: (value) =>
                    value === password.current || 'The passwords do not match',
                }}
                error={errors?.confirmPassword}
              />

              <Button
                type="submit"
                variant={success ? ButtonColorVariants.SUCCESS : undefined}
                disabled={submitting || success}
              >
                {submitting ? (
                  <Spinner />
                ) : success ? (
                  <HiCheck tw="text-2xl" />
                ) : (
                  'Sign up'
                )}
              </Button>
            </form>
            <div className="space-y-8">
              <div
                className="text-center border-b border-gray-200"
                style={{ lineHeight: 0 }}
              >
                <span
                  className="p-2 text-xs font-semibold tracking-wide text-gray-600 uppercase bg-white"
                  style={{ lineHeight: 0 }}
                >
                  OR
                </span>
              </div>
              <div className="w-full">
                <Button variant={ButtonColorVariants.GOOGLE} disabled>
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-1"
                    >
                      <path d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28	c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233	c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934	C20.485,11.453,20.404,10.884,20.283,10.356z" />
                    </svg>
                    Continue with Google
                  </>
                </Button>
              </div>
            </div>
          </div>
          <p className="mb-4 text-xs text-center text-gray-400">
            <Link href="/s/sign-in">
              <a
                href="/s/sign-in"
                className="text-blue-900 underline hover:text-black"
              >
                Sign in
              </a>
            </Link>
            <span className="mx-1">·</span>
            <Link href="/s/privacy-terms">
              <a
                href="/s/privacy-terms"
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

export default SignUp
