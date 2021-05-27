import React, { useState } from 'react'
import Button from '@components/Button'
import Box from '@components/UI/Box'
import _tw from 'twin.macro'
import Input from '@components/FormFields/Input'
import { SingleUpload } from '@components/FormFields/Upload'
import { SelectMultiple } from '@components/FormFields/Select'
import { FieldError, get, useForm } from 'react-hook-form'
import {
  useCurrentUserProfileDataQuery,
  useUpdateCurrentUserMutation,
} from '@graphql/hooks'
import { CurrentUserProfileDataQuery, UpdateUserInput } from '@graphql/schema'
import { usePreviewURL } from '@lib/hooks/usePreviewURL'
import { FileData, useFilesData } from '@lib/utils/forms'
import { useQueryClient } from 'react-query'
import { queries } from '../../../lib/react-query/keys'
import { useCurrentUserQuery } from '../../../graphql/hooks'

interface IDisplayInformationProps {
  user: CurrentUserProfileDataQuery['currentUser']
  countries?: CurrentUserProfileDataQuery['countries']
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
  const queryClient = useQueryClient()

  const { mutate: updateUser, isLoading } = useUpdateCurrentUserMutation()

  const { isSubmitting, submitCount } = formState
  const submitting = isSubmitting || isLoading

  const [success, setSuccess] = useState(false)

  const avatarData: FileData[] = user.avatar?.url
    ? [
        {
          id: user.avatar.id,
          url: user.avatar.url,
        },
      ]
    : []

  const { filesData, handleFileChange, handleFileDelete } = useFilesData(
    avatarData,
    {
      isMultiple: false,
    }
  )

  const urlPreview = usePreviewURL(filesData)?.[0]

  const onSubmit = async (formData: IFormValues) => {
    const { firstName, lastName, information } = formData

    // TODO: save avatar in DB (use FileData)
    // TODO: add functionality to delete and update avatar

    await updateUser(
      {
        data: {
          firstName,
          lastName,
          avatar: filesData?.[0]?.file || undefined,
          information,
        },
      },
      {
        onSuccess: async () => {
          setSuccess(true)
          // TODO: add toast notifications

          await queryClient.refetchQueries(useCurrentUserQuery.getKey(), {
            active: true,
            inactive: true,
            stale: true,
          })
          await queryClient.refetchQueries(
            useCurrentUserProfileDataQuery.getKey(),
            {
              active: true,
              inactive: true,
              stale: true,
            }
          )

          setTimeout(() => setSuccess(false), 4000)
        },
        onError: () => {
          //TODO: handle backend errors here //
        },
      }
    )
  }

  return (
    <>
      <Box tw="lg:mt-5">
        <div tw="flex items-center p-5">
          <h2 tw="text-base mr-auto font-medium">Display Information</h2>
        </div>
        <div tw="p-5">
          <div tw="grid grid-cols-12 gap-5">
            <div tw="col-span-12 xl:col-span-5">
              <div tw="border border-gray-300 rounded-md overflow-hidden py-6">
                <label htmlFor="avatar" tw="w-40 block mx-auto cursor-pointer">
                  <SingleUpload
                    fileData={urlPreview}
                    handleFileDelete={handleFileDelete}
                  />
                  <Button tw="relative mt-3" size="SM">
                    <input
                      id="avatar"
                      name="avatar"
                      onChange={handleFileChange}
                      type="file"
                      tw="w-full h-full absolute opacity-0 cursor-pointer"
                    />
                    Change avatar
                  </Button>
                </label>
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
                  isSubmitClicked={!!submitCount}
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
    </>
  )
}

export default DisplayInformation
