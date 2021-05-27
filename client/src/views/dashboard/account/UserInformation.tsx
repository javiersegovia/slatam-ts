import { useCurrentUserProfileDataQuery } from '@graphql/hooks'
import React from 'react'
import _tw from 'twin.macro'
import DisplayInformation from './DisplayInformation'
import Navigation from './Navigation'
import PersonalInformation from './PersonalInformation'
import Router from 'next/router'
import routes from '@lib/utils/routes'

const UserInformation = () => {
  const { data, isLoading } = useCurrentUserProfileDataQuery()

  if (isLoading) {
    // TODO
    return <></>
  }

  if (!data?.currentUser) {
    Router.push(routes.session.signIn)

    return <></>
  }

  return (
    <>
      <section tw="px-2 sm:px-10 pb-10 max-w-screen-lg mx-auto w-full">
        {/* intro-y */}
        <div tw="flex items-center mt-8">
          <h2 tw="text-lg font-medium mr-auto">Update Profile</h2>
        </div>
        <div tw="grid grid-cols-12 gap-6">
          {/* BEGIN: Profile Menu */}
          <Navigation user={data.currentUser} />
          {/* END: Profile Menu */}

          <div tw="col-span-12 lg:col-span-8 2xl:col-span-9">
            <DisplayInformation
              user={data.currentUser}
              countries={data.countries || []}
            />

            <PersonalInformation
              user={data.currentUser}
              countries={data.countries || []}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default UserInformation
