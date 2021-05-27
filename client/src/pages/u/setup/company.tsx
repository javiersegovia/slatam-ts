import React from 'react'
import _tw from 'twin.macro'
import { IsAuthenticated } from '@components/Auth'
import Wizard from '@views/u/Wizard'
import CompanyForm from '@views/u/CompanyForm'
import { useCategoriesQuery, useCountriesQuery } from '@graphql/hooks'

const SetupCompany = () => {
  const {
    data: countriesData,
    isLoading: isLoadingCountries,
  } = useCountriesQuery()

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
  } = useCategoriesQuery()

  const isLoading = isLoadingCountries || isLoadingCategories

  if (isLoading) {
    // TODO
    return <></>
  }

  return (
    <IsAuthenticated>
      <Wizard title="Profile information">
        <CompanyForm
          categories={categoriesData?.categories}
          countries={countriesData?.countries}
        />
      </Wizard>
    </IsAuthenticated>
  )
}

export default SetupCompany
