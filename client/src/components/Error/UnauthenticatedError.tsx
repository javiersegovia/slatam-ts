import React, { useEffect } from 'react'
import _tw from 'twin.macro'
import routes from '@lib/utils/routes'
import Link from 'next/link'
import Router from 'next/router'

const Unauthenticated = () => {
  useEffect(() => {
    const redirect = setTimeout(() => Router.push(routes.session.signIn), 2500)
    return () => {
      clearTimeout(redirect)
    }
  }, [])

  return (
    <div tw="w-full mx-auto text-center lg:w-2/3">
      <br />
      <p tw="mb-3 text-xl font-medium text-gray-900 md:text-2xl">
        Sorry! You must be logged in to access this page.
      </p>
      <br />
      <p tw="mb-3 text-lg italic text-gray-900 md:text-xl">
        You will be redirected in a few seconds.
        <br />
        If not,{' '}
        <Link href={routes.session.signIn}>
          <a href={routes.session.signIn} tw="text-blue-600 underline">
            please click here
          </a>
        </Link>
      </p>
    </div>
  )
}

export default Unauthenticated
