import React from 'react'
import _tw from 'twin.macro'
import DashboardSideBar from '@components/Layout/SideBar/DashboardSideBar'
import { CompaniesDocument, useCompaniesQuery } from '@graphql/hooks'
import { GetServerSideProps } from 'next'
import { gqlFetcher, createQueryClient } from '@lib/react-query/client'
import { dehydrate } from 'react-query/hydration'
import { IsAuthenticated } from '@components/Auth'

const Title: React.FC = ({ children }) => (
  <div tw="prose mb-10 prose-xl">
    <h2 tw="ml-5">{children}</h2>
  </div>
)

const DashboardSettings = () => {
  const { data, isLoading, error } = useCompaniesQuery(undefined)

  return (
    <IsAuthenticated>
      <DashboardSideBar>
        <Title>User settings</Title>
        <div className="space-y-2">
          {isLoading ? (
            <h3>Loading...</h3> // TODO: add new loading placeholder
          ) : error ? (
            <h3>Something wrong happened.</h3> // TODO: add new default "Something wrong happened error"
          ) : (
            data?.companies?.map((company) => (
              <li key={company.id}>
                <h3>
                  <strong>{company.name}</strong>
                </h3>
                <p>
                  <strong>Members: </strong>
                </p>
                {company.members.map((companyMember) => (
                  <div key={companyMember.id}>
                    <p>
                      <strong>Roles: </strong>
                      {companyMember.roles}
                    </p>
                    <p>
                      <strong>User associated: </strong>
                      {companyMember.user.email}
                    </p>
                  </div>
                ))}
              </li>
            ))
          )}
        </div>
      </DashboardSideBar>
    </IsAuthenticated>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = createQueryClient()

  await queryClient.prefetchQuery(
    useCompaniesQuery.getKey(),
    gqlFetcher(CompaniesDocument, null, context)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default DashboardSettings
