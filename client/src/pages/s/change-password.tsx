import React, { useRef } from 'react'
import _tw from 'twin.macro'
// import Link from 'next/link'
import Input from '@components/FormFields/Input'
import Button from '@components/Button'
import { useForm } from 'react-hook-form'

type IFormValues = {
  password: string
  confirmPassword: string
}

// TODO: add validation of token query requirement
// TODO: handleSubmit data
// TODO: add Slatam Logo to top (with link to Home)

const ChangePassword = () => {
  const { register, handleSubmit, watch, errors } = useForm<IFormValues>()
  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = (data: IFormValues) => console.log(data)

  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <div className="container px-0 py-20 mx-auto sm:px-4">
          <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-4/12 sm:px-6">
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
                    value === password.current || 'The passwords do not match',
                }}
                error={errors?.confirmPassword}
              />

              <Button type="submit">Change password</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default ChangePassword
