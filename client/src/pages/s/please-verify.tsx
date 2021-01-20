import React from 'react'
import Link from 'next/link'
import _tw from 'twin.macro'
import routes from '@lib/utils/routes'
import { IsNotAuthenticated } from '@components/Auth'

const VerifyEmail = () => {
  return (
    <IsNotAuthenticated>
      <section className="bg-gray-100 min-h-screen">
        <div className="container px-0 py-20 mx-auto sm:px-4">
          <div className="w-full px-4 pt-10 pb-10 mx-auto mt-8 mb-6 bg-white rounded-none shadow-2xl sm:rounded-lg sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-4/12 sm:px-6">
            <p>
              <h1 className="mb-8 text-3xl font-semibold text-center text-gray-700">
                Check your email
              </h1>
              <p tw="text-center">
                Your registration is almost done. We sent an email to the
                address that you gave us. Please follow the instructions there
                to continue.
                <br />
                <br />
                <span tw="italic">
                  If you did not receive any email, please{' '}
                  <Link href={routes.session.requestConfirmationEmail}>
                    <a
                      href={routes.session.requestConfirmationEmail}
                      className="text-blue-600 underline"
                    >
                      click here
                    </a>
                  </Link>
                </span>
              </p>
            </p>
          </div>
        </div>
      </section>
    </IsNotAuthenticated>
  )
}

export default VerifyEmail
