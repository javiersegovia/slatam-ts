import React from 'react'
import _tw from 'twin.macro'
import { IsAuthenticated } from '@components/Auth'
import { useCurrentUserProfileDataQuery } from '@graphql/hooks'
import Wizard from '@root/src/views/u/Wizard'
import ProfileForm from '@root/src/views/u/ProfileForm'
import Router from 'next/router'
import routes from '@lib/utils/routes'

const SetupVerification = () => {
  const { data, isLoading: isLoadingData } = useCurrentUserProfileDataQuery()

  if (isLoadingData) {
    // TODO
    return <></>
  }

  if (!data?.currentUser) {
    Router.push(routes.session.signIn)

    return <></>
  }

  return (
    <IsAuthenticated>
      <Wizard title="Profile information">
        <ProfileForm user={data.currentUser} countries={data.getAllCountries} />
      </Wizard>
    </IsAuthenticated>
  )
}

export default SetupVerification
