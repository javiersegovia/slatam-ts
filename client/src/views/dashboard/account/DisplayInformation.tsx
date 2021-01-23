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

type IFormValues = UpdateUserInput & {
  avatar?: File
}

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
  const { isSubmitting, submitCount } = formState

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
              <div className="mt-2 flex justify-center mx-10 px-6 pt-10 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-center text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative w-full cursor-pointer bg-white rounded-md font-medium text-blue-700 hover:text-blue-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload your avatar</span>
                      <input
                        id="file-upload"
                        ref={register}
                        name="avatar"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    {/* <p className="pl-1">or drag and drop</p> */}
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
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
                  isSubmitClicked={Boolean(submitCount)}
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
