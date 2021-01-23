import React, { useState } from 'react'
import Button from '@components/Button'
import Box from '@components/UI/Box'
import _tw from 'twin.macro'
import Input from '@components/FormFields/Input'
import { FieldError, get, useForm } from 'react-hook-form'
import { useUpdateCurrentUserMutation } from '@graphql/hooks'

import { CurrentUserProfileDataQuery, UpdateUserInput } from '@graphql/schema'
import { SelectMultiple } from '@components/FormFields/Select'

interface IDisplayInformationProps {
  user: CurrentUserProfileDataQuery['currentUser']
  countries?: CurrentUserProfileDataQuery['getAllCountries']
}

type IFormValues = UpdateUserInput

const DisplayInformation = ({
  user,
  countries = [],
}: IDisplayInformationProps) => {
  const { firstName, lastName, information } = user
  const defaultValues: IFormValues = {
    firstName,
    lastName,
    information,
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
  const { isSubmitting } = formState

  const { mutate: updateUser, isLoading } = useUpdateCurrentUserMutation()
  const [success, setSuccess] = useState(false)

  const onSubmit = async (formData: IFormValues) => {
    const { firstName, lastName, information } = formData

    await updateUser(
      {
        data: {
          firstName,
          lastName,
          information,
        },
      },
      {
        onSuccess: () => {
          setSuccess(true)
          setTimeout(() => setSuccess(false), 5000)
        },
        onError: () => {
          //TODO: handle backend errors here //
        },
      }
    )
  }

  const submitting = isSubmitting || isLoading

  return (
    <>
      {/* BEGIN: Display Information */}
      {/* xxx intro-y box */}
      <Box tw="lg:mt-5">
        <div tw="flex items-center p-5">
          <h2 tw="font-medium text-base mr-auto">Display Information</h2>
        </div>
        <div tw="p-5">
          <div tw="grid grid-cols-12 gap-5">
            <div tw="col-span-12 xl:col-span-5">
              {/*  <div tw="border border-gray-200  rounded-md p-5">
                <div
                  // image-fit // xxx zoom-in
                  tw="w-40 h-40 relative cursor-pointer mx-auto"
                >
                  <img
                    tw="rounded-md"
                    alt="Midone Tailwind HTML Admin Template"
                    src="dist/images/profile-7.jpg"
                  />
                  <div
                    title="Remove this profile photo?"
                    // xxx tooltip
                    tw="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-red-500 right-0 top-0 -mr-2 -mt-2"
                  >
                    {' '}
                    <i data-feather="x" tw="w-4 h-4" />{' '}
                  </div>
                </div>
                <div tw="w-40 mx-auto cursor-pointer relative mt-5">
                  <button
                    type="button"
                    // button
                    tw="w-full bg-blue-800 text-white"
                  >
                    Change Photo
                  </button>
                  <input
                    type="file"
                    tw="w-full h-full top-0 left-0 absolute opacity-0"
                  />
                </div>
              </div>*/}
            </div>

            <div tw="col-span-12 xl:col-span-7">
              <form onSubmit={handleSubmit(onSubmit)} tw="mb-8 space-y-2">
                <Input
                  name="firstName"
                  type="text"
                  label="First Name"
                  register={register}
                  validations={{
                    required: {
                      value: true,
                      message: 'Please, specify your first name',
                    },
                    minLength: {
                      value: 2,
                      message:
                        'Your first name must have at least 2 characters',
                    },
                  }}
                  error={errors?.firstName}
                />
                <Input
                  name="lastName"
                  type="text"
                  label="Last Name"
                  // placeholder="Ex. james@bond.com"
                  register={register}
                  validations={{
                    required: {
                      value: true,
                      message: 'Please, specify your last name',
                    },
                    minLength: {
                      value: 2,
                      message:
                        'Your first name must have at least 2 characters',
                    },
                  }}
                  error={errors?.lastName}
                />
                <Input
                  name="information.occupation"
                  type="text"
                  label="Occupation"
                  placeholder="What is your work position?"
                  register={register}
                  validations={{
                    required: {
                      value: true,
                      message: 'Please, specify your occupation',
                    },
                    minLength: {
                      value: 6,
                      message:
                        'Your occupation must have at least 6 characters',
                    },
                  }}
                  error={get(errors, 'information.occupation') as FieldError}
                />

                <SelectMultiple
                  name="information.nationality"
                  label="Nationalities"
                  placeholder="Tip: You can choose multiple countries"
                  options={countries}
                  control={control}
                  register={register}
                  unregister={unregister}
                  setFormValue={setValue}
                  initialValue={defaultValues.information?.nationality}
                  error={get(errors, 'information.nationality') as FieldError}
                  validations={{
                    required: {
                      value: true,
                      message: 'Please, specify your nationality',
                    },
                  }}
                />

                <div tw="flex justify-end">
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
        </div>
      </Box>
      {/* END: Display Information */}
    </>
  )
}

export default DisplayInformation
