import { useCurrentUserProfileDataQuery } from '@graphql/hooks'
import React from 'react'
import _tw from 'twin.macro'
import DisplayInformation from './DisplayInformation'
import Navigation from './Navigation'
import PersonalInformation from './PersonalInformation'
import Router from 'next/router'
import routes from '@lib/utils/routes'

const Information = () => {
  const { data, isLoading } = useCurrentUserProfileDataQuery()

  if (isLoading) {
    return <>Should render a Big Skeleton Here</>
  }

  if (!data?.currentUser) {
    Router.push(routes.session.signIn)

    return <></>
  }

  console.log({ ureloserInfoData: data })

  return (
    <>
      <div tw="px-2 sm:px-10 pb-10">
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
              countries={data.getAllCountries || []}
            />

            <PersonalInformation
              user={data.currentUser}
              countries={data.getAllCountries || []}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Information

// DROPDOWN
// {
//                   {/* dropdown */}
//                   <div>
//                   {/* dropdown-toggle */}
//                   <a tw="w-5 h-5 block">
//                     {' '}
//                     <i
//                       data-feather="more-horizontal"
//                       tw="w-5 h-5 text-gray-700"
//                     />{' '}
//                   </a>
//                   dropdown-box
//                   <div tw=" w-56">
//                     {/* dropdown-box__content box */}
//                     <div>
//                       <div tw="p-4 border-b border-gray-200 font-medium">
//                         Export Options
//                       </div>
//                       <div tw="p-2">
//                         <a tw="flex items-center block p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md">
//                           <i
//                             data-feather="activity"
//                             tw="w-4 h-4 text-gray-700 mr-2"
//                           />{' '}
//                           English{' '}
//                         </a>
//                         <a tw="flex items-center block p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200  rounded-md">
//                           <i
//                             data-feather="box"
//                             tw="w-4 h-4 text-gray-700 mr-2"
//                           />{' '}
//                           Indonesia
//                           <div tw="text-xs text-white px-1 rounded-full bg-red-500 ml-auto">
//                             10
//                           </div>
//                         </a>
//                         <a tw="flex items-center block p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md">
//                           {' '}
//                           <i
//                             data-feather="layout"
//                             tw="w-4 h-4 text-gray-700 mr-2"
//                           />{' '}
//                           English{' '}
//                         </a>
//                         <a tw="flex items-center block p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md">
//                           {' '}
//                           <i
//                             data-feather="sidebar"
//                             tw="w-4 h-4 text-gray-700 mr-2"
//                           />{' '}
//                           Indonesia{' '}
//                         </a>
//                       </div>
//                       <div tw="px-3 py-3 border-t border-gray-200  font-medium flex">
//                         <button
//                           type="button"
//                           // button button--sm
//                           tw="bg-blue-800 text-white"
//                         >
//                           Settings
//                         </button>
//                         <button
//                           type="button"
//                           // button button--sm
//                           tw="bg-gray-200 text-gray-600  ml-auto"
//                         >
//                           View Profile
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                 </div>

// }
