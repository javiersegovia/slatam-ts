import React from 'react'
import _tw from 'twin.macro'
import Link from 'next/link'
import Input from '@components/Forms/Input'
import Button from '@components/Button'
import { useForm } from 'react-hook-form'

type IFormValues = {
  email: string
}

// TODO: handleSubmit data
// TODO: add Slatam Logo to top (with link to Home)

const RequestPassword = () => {
  const { register, handleSubmit, watch, errors } = useForm<IFormValues>()
  const onSubmit = (data: IFormValues) => console.log(data)

  return (
    <>
      <section className="bg-gray-100">
        <div className="container px-0 py-20 mx-auto sm:px-4">
          <div className="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6">
            <h1 className="mb-8 text-3xl font-semibold text-center text-gray-900">
              Cambio de contraseña
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} tw="mb-8 space-y-2">
              <Input
                id="email"
                type="email"
                label="Correo electrónico"
                placeholder="Ex. james@bond.com"
                register={register}
                validations={{
                  required: {
                    value: true,
                    message: 'Por favor, ingresa tu correo electrónico',
                  },
                }}
                error={errors?.email}
              />

              <Button type="submit">Solicitar cambio de contraseña</Button>
            </form>
          </div>
          <p className="mb-4 text-xs text-center text-gray-400">
            <Link href="/sign-up">
              <a className="text-blue-900 underline hover:text-black">
                Creación de cuenta
              </a>
            </Link>
            <span className="mx-1">·</span>
            <Link href="/sign-in">
              <a className="text-blue-900 underline hover:text-black">
                Inicio de sesión
              </a>
            </Link>
            <span className="mx-1">·</span>
            <Link href="/privacy-terms">
              <a className="text-blue-900 underline hover:text-black">
                Términos y condiciones
              </a>
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default RequestPassword
