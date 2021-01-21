import React, { useState } from 'react'
import _tw from 'twin.macro'
import Button from '@components/Button'
import Box from '@components/UI/Box'
import Input from '@components/FormFields/Input'
import { FieldError, get, useForm } from 'react-hook-form'
import { useUpdateCurrentUserMutation } from '@graphql/hooks'

// import { getExceptionErrors } from '@lib/utils/errors'

import { User, Gender, UserInformation, Country } from '@graphql/schema'
import { Select } from '@components/FormFields'
import { NestedPartial } from '@lib/utils/types'

const genderOptions = [
  {
    value: Gender.Male,
    label: 'Male',
  },
  {
    value: Gender.Female,
    label: 'Female',
  },
  {
    value: Gender.NonBinary,
    label: 'Non-binary',
  },
]

interface IPersonalInformationProps {
  user: NestedPartial<User>
  countries?: Partial<Country>[]
}

type IFormValues = {
  information: NestedPartial<UserInformation>
}

const PersonalInformation = ({
  user,
  countries,
}: IPersonalInformationProps) => {
  const { information } = user

  const defaultValues: IFormValues = {
    information: {
      ...information,
    },
  }

  const {
    register,
    unregister,
    handleSubmit,
    errors,
    control,
    setValue,
    setError,
    formState,
    getValues,
  } = useForm<IFormValues>({
    defaultValues,
  })

  const [success, setSuccess] = useState(false)
  const { mutate: signUp, isLoading } = useUpdateCurrentUserMutation()

  const { isSubmitting } = formState
  const submitting = isSubmitting || isLoading

  const defaultGender = genderOptions.find(
    (option) => option.value === defaultValues.information?.gender
  )

  const countryOptions = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }))

  const defaultCountry = countryOptions.find(
    (option) => option.value === defaultValues.information?.address?.country?.id
  )

  const onSubmit = async (formData: IFormValues) => {
    console.log(formData)
  }

  return (
    <>
      {/* BEGIN: Personal Information */}
      {/* intro-y box */}
      <Box tw="lg:mt-5">
        <div tw="flex items-center p-5">
          <h2 tw="font-medium text-base mr-auto">Personal Information</h2>
        </div>
        <div tw="p-5">
          <div tw="grid grid-cols-12 gap-5">
            <form tw="col-span-12" onSubmit={handleSubmit(onSubmit)}>
              <Select
                name="information.gender"
                label="Gender"
                options={genderOptions}
                control={control}
                register={register}
                unregister={unregister}
                setFormValue={setValue}
                initialValue={defaultGender}
                error={get(errors, 'information.gender') as FieldError}
                validations={{
                  required: {
                    value: true,
                    message: 'Please, specify your gender',
                  },
                }}
              />

              <Select
                name="information.address.country"
                label="Country of residence"
                options={countryOptions}
                control={control}
                register={register}
                unregister={unregister}
                setFormValue={setValue}
                initialValue={defaultCountry}
                error={get(errors, 'information.address.country') as FieldError}
                validations={{
                  required: {
                    value: true,
                    message: 'Please, specify your country of residence',
                  },
                }}
              />

              <Input
                name="information.address.description"
                type="text"
                label="Address"
                register={register}
                validations={{
                  minLength: {
                    value: 10,
                    message: 'Your address must have at least 10 characters',
                  },
                }}
                error={
                  get(errors, 'information.address.description') as FieldError
                }
              />

              <Input
                name="information.address.postalCode"
                type="text"
                label="Postal code"
                register={register}
              />
              <div tw="flex justify-end mt-4">
                <Button
                  size="SM"
                  type="submit"
                  variant={success ? 'SUCCESS' : undefined}
                  isLoading={submitting}
                  disabled={submitting || success}
                  tw="bg-blue-800 text-white mt-3 w-full md:w-20"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
      {/* END: Personal Information */}
    </>
  )
}

export default PersonalInformation
