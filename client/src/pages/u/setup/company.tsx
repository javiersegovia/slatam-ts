import React from 'react'
import _tw from 'twin.macro'
import { IsAuthenticated } from '@components/Auth'
import Wizard from '@views/u/Wizard'
// import ProfileForm from '@root/src/views/u/ProfileForm'
import Router from 'next/router'
import routes from '@lib/utils/routes'
import { useCurrentUserProfileDataQuery } from '@graphql/hooks'

const SetupCompany = () => {
  const { data, isLoading: isLoadingData } = useCurrentUserProfileDataQuery()

  if (isLoadingData) {
    // TODO
    return <>Should render a Big Skeleton Here</>
  }

  if (!data?.currentUser) {
    Router.push(routes.session.signIn)

    return <></>
  }

  return (
    <IsAuthenticated>
      <Wizard title="Profile information">
        {/* <ProfileForm user={data.currentUser} countries={data.getAllCountries} /> */}
      </Wizard>
    </IsAuthenticated>
  )
}

export default SetupCompany
