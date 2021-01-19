import React from 'react'
import _tw from 'twin.macro'
import Link from 'next/link'
import Input from '@components/FormFields/Input'
import Button from '@components/Button'
import { useForm } from 'react-hook-form'

type IFormValues = {
  email: string
}

// TODO: handleSubmit data
// TODO: add Slatam Logo to top (with link to Home)

const RequestPassword = () => {
  const { register, handleSubmit, errors } = useForm<IFormValues>()
  const onSubmit = (data: IFormValues) => console.log(data)

  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <div className="container px-0 py-20 mx-auto sm:px-4">
          <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-4/12 sm:px-6">
            <h1 className="mb-8 text-3xl font-semibold text-center text-gray-900">
              Forgot your password?
            </h1>
            <p tw="text-center">
              No problem. Enter your email below and we will send you a link to
              change it.
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

              <Button type="submit">Request password change</Button>
            </form>
          </div>
          <p className="mb-4 text-xs text-center text-gray-400">
            <Link href="/s/sign-up">
              <a
                href="/s/sign-up"
                className="text-blue-900 underline hover:text-black"
              >
                Sign up
              </a>
            </Link>
            <span className="mx-1">·</span>
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

export default RequestPassword
