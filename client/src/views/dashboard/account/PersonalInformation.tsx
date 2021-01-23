import React, { useState } from 'react'
import _tw from 'twin.macro'
import Button from '@components/Button'
import Box from '@components/UI/Box'
import Input from '@components/FormFields/Input'
import { FieldError, get, useForm } from 'react-hook-form'
import { useUpdateCurrentUserMutation } from '@graphql/hooks'

import {
  Gender,
  UpdateUserInformationInput,
  CurrentUserProfileDataQuery,
} from '@graphql/schema'
import { Select } from '@components/FormFields'

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
  user: CurrentUserProfileDataQuery['currentUser']
  countries?: CurrentUserProfileDataQuery['getAllCountries']
}

type IFormValues = {
  information?:
    | null
    | (Omit<UpdateUserInformationInput, 'gender'> & {
        gender: {
          value?: Gender | null
        }
      })
}

const PersonalInformation = ({
  user,
  countries,
}: IPersonalInformationProps) => {
  const { information } = user

  const defaultValues: IFormValues = {
    information: {
      ...information,
      gender: {
        value: information?.gender,
      },
    },
  }

  const {
    register,
    unregister,
    handleSubmit,
    errors,
    control,
    setValue,
    formState,
  } = useForm<IFormValues>({
    defaultValues,
  })

  const [success, setSuccess] = useState(false)
  const { mutate: updateInfo, isLoading } = useUpdateCurrentUserMutation()

  const { isSubmitting } = formState
  const submitting = isSubmitting || isLoading

  const defaultGender = genderOptions.find(
    (option) => option.value === defaultValues.information?.gender.value
  )

  const onSubmit = async (formData: IFormValues) => {
    const { information } = formData

    await updateInfo(
      {
        data: {
          information: {
            ...information,
            gender: information?.gender?.value,
          },
        },
      },
      {
        onSuccess: () => {
          setSuccess(true)
          setTimeout(() => setSuccess(false), 3000)
        },
        onError: () => {
          //TODO: handle backend errors here //
        },
      }
    )
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
                options={countries}
                control={control}
                register={register}
                unregister={unregister}
                setFormValue={setValue}
                initialValue={defaultValues.information?.address?.country}
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
                  tw="text-white mt-3 w-full md:w-20"
                  showCheckOnSuccess
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
