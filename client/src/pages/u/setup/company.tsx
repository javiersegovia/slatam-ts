import React from 'react'
import _tw from 'twin.macro'
import { IsAuthenticated } from '@components/Auth'
import Wizard from '@views/u/Wizard'
import CompanyForm from '@views/u/CompanyForm'
import {
  useGetAllCategoriesQuery,
  useGetAllCountriesQuery,
} from '@graphql/hooks'

const SetupCompany = () => {
  const {
    data: countriesData,
    isLoading: isLoadingCountries,
  } = useGetAllCountriesQuery()

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
  } = useGetAllCategoriesQuery()

  const isLoading = isLoadingCountries || isLoadingCategories

  if (isLoading) {
    // TODO
    return <></>
  }

  return (
    <IsAuthenticated>
      <Wizard title="Profile information">
        <CompanyForm
          categories={categoriesData?.getAllCategories}
          countries={countriesData?.getAllCountries}
        />
      </Wizard>
    </IsAuthenticated>
  )
}

export default SetupCompany
