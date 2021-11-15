import React, { useState } from 'react'
import _tw from 'twin.macro'
import Router from 'next/router'
import routes from '@lib/utils/routes'
import {
  useCreateCompanyMutation,
  useCurrentUserQuery,
} from '../../graphql/hooks'
import { CreateCompanyInput, CategoriesQuery } from '../../graphql/schema'
import { useForm, get, FieldError } from 'react-hook-form'
import Input from '@components/FormFields/Input'
import Select, { SelectMultiple } from '@components/FormFields/Select'
import Button from '@components/Button'
import { CountriesQuery } from '@graphql/schema'
import Link from 'next/link'
import { useQueryClient } from 'react-query'

type IFormValues = CreateCompanyInput

interface ICompanyFormProps {
  categories?: CategoriesQuery['categories']
  countries?: CountriesQuery['countries']
}

const CompanyForm = ({ categories, countries }: ICompanyFormProps) => {
  const queryClient = useQueryClient()
  const { mutate: createCompany, isLoading } = useCreateCompanyMutation()
  const [success, setSuccess] = useState(false)

  // TODO: add defaultValues to this form
  // const defaultValues: IFormValues = {}

  const {
    register,
    unregister,
    handleSubmit,
    errors,
    control,
    setValue,
    formState,
  } = useForm<IFormValues>()

  const { isSubmitting, submitCount } = formState
  const submitting = isSubmitting || isLoading

  const onSubmit = async (formData: IFormValues) => {
    const { name, information } = formData

    await createCompany(
      {
        data: {
          name,
          information,
        },
      },
      {
        onSuccess: async () => {
          setSuccess(true)
          await queryClient.refetchQueries(useCurrentUserQuery.getKey())
          Router.push({
            pathname: routes.dashboard.index,
            query: {
              congratulations: true,
              withCompany: true,
            },
          })
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font-bold">Basic Information</div>
      <div className="grid grid-cols-12 gap-4 row-gap-5 mt-5">
        <div tw="col-span-12 sm:col-span-6">
          <Input
            name="name"
            type="text"
            label="Company Name"
            register={register}
            validations={{
              required: {
                value: true,
                message: 'Please, specify the name of the company',
              },
              minLength: {
                value: 4,
                message: 'The company name must have at least 4 characters',
              },
            }}
            error={errors?.name}
          />
        </div>
        <div tw="col-span-12 sm:col-span-6">
          <SelectMultiple
            name="information.categories"
            label="Categories"
            placeholder="What industries is your company in?"
            options={categories}
            control={control}
            register={register}
            unregister={unregister}
            setFormValue={setValue}
            // initialValue={defaultValues.information?.nationality}
            error={get(errors, 'information.categories') as FieldError}
            isSubmitClicked={Boolean(submitCount)}
            validations={{
              required: {
                value: true,
                message: 'Please, specify at least one category',
              },
            }}
          />
        </div>

        <div tw="col-span-12">
          <Input
            name="information.description"
            type="text"
            label="Description"
            placeholder="Tell us about your company. What do you do?"
            isTextArea
            register={register}
            validations={{
              minLength: {
                value: 20,
                message:
                  'The company description must have at least 20 characters',
              },
            }}
            error={get(errors, 'information.description') as FieldError}
          />
        </div>
      </div>

      <div className="font-bold mt-4">About your location</div>
      <div className="grid grid-cols-12 gap-4 row-gap-5 mt-5">
        <div tw="col-span-12 sm:col-span-6">
          <Select
            name="information.address.country"
            label="Country"
            options={countries}
            control={control}
            register={register}
            unregister={unregister}
            setFormValue={setValue}
            placeholder="Where it is your company located?"
            // initialValue={defaultValues.information?.address?.country}
            isSubmitClicked={Boolean(submitCount)}
            error={get(errors, 'information.address.country') as FieldError}
            validations={{
              required: {
                value: true,
                message:
                  'Please, specify the country where the company is based',
              },
            }}
          />
        </div>

        <div className="col-span-12 sm:col-span-6">
          <Input
            name="information.address.description"
            type="text"
            label="Address"
            register={register}
            placeholder="The location of your main office"
            validations={{
              minLength: {
                value: 10,
                message:
                  'Your company address must have at least 10 characters',
              },
            }}
            error={get(errors, 'information.address.description') as FieldError}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <Input
            name="information.address.postalCode"
            type="text"
            label="Postal code"
            register={register}
          />
        </div>

        <div className="col-span-12 flex items-center justify-center sm:justify-end mt-5">
          <Link href={routes.dashboard.index}>
            <a tw="justify-center block text-gray-700 mr-8 cursor-pointer">
              Skip
            </a>
          </Link>
          <Button
            size="SM"
            type="submit"
            variant={success ? 'SUCCESS' : undefined}
            isLoading={submitting}
            disabled={submitting || success}
            tw="w-full md:w-24"
            showCheckOnSuccess
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CompanyForm
