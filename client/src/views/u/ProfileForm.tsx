import React, { useState } from 'react'
import _tw from 'twin.macro'
import Router from 'next/router'
import { useQueryClient } from 'react-query'
import { useForm, get, FieldError } from 'react-hook-form'

import Input from '@components/FormFields/Input'
import Select, { SelectMultiple } from '@components/FormFields/Select'
import Button from '@components/Button'
import { queries } from '@lib/react-query/keys'
import routes from '@lib/utils/routes'
import {
  useCurrentUserQuery,
  useUpdateCurrentUserMutation,
} from '@graphql/hooks'
import {
  CurrentUserProfileDataQuery,
  Gender,
  UpdateUserInformationInput,
  UpdateUserInput,
} from '@graphql/schema'

type IFormValues = Omit<UpdateUserInput, 'information'> & {
  information?:
    | null
    | (Omit<UpdateUserInformationInput, 'gender'> & {
        gender: {
          value?: Gender | null
        }
      })
}

interface IProfileFormProps {
  user: CurrentUserProfileDataQuery['currentUser']
  countries?: CurrentUserProfileDataQuery['countries']
}

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

const ProfileForm = ({ user, countries }: IProfileFormProps) => {
  const queryClient = useQueryClient()
  const { mutate: updateUser, isLoading } = useUpdateCurrentUserMutation()
  const [success, setSuccess] = useState(false)

  const { firstName, lastName, information } = user

  const defaultValues: IFormValues = {
    firstName,
    lastName,
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
  const { isSubmitting, submitCount } = formState
  const submitting = isSubmitting || isLoading

  const onSubmit = async (formData: IFormValues) => {
    const { firstName, lastName, information } = formData

    await updateUser(
      {
        data: {
          firstName,
          lastName,
          information: {
            ...information,
            gender: information?.gender?.value,
          },
        },
      },
      {
        onSuccess: async () => {
          setSuccess(true)
          await queryClient.refetchQueries(useCurrentUserQuery.getKey())
          Router.push(routes.user.setup.company)
        },
        onError: () => {
          //TODO: handle backend errors here //
        },
      }
    )
  }

  const defaultGender = genderOptions.find(
    (option) => option.value === defaultValues.information?.gender?.value
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font-bold">Display Information</div>
      <div className="grid grid-cols-12 gap-4 row-gap-5 mt-5">
        <div tw="col-span-12 sm:col-span-6">
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
                message: 'Your first name must have at least 2 characters',
              },
            }}
            error={errors?.firstName}
          />
        </div>
        <div tw="col-span-12 sm:col-span-6">
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
                message: 'Your first name must have at least 2 characters',
              },
            }}
            error={errors?.lastName}
          />
        </div>

        <div tw="col-span-12 sm:col-span-6">
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
                message: 'Your occupation must have at least 6 characters',
              },
            }}
            error={get(errors, 'information.occupation') as FieldError}
          />
        </div>
        <div tw="col-span-12 sm:col-span-6">
          <SelectMultiple
            name="information.nationality"
            label="Nationality"
            placeholder="Tip: You can choose multiple countries"
            options={countries}
            control={control}
            register={register}
            unregister={unregister}
            setFormValue={setValue}
            initialValue={defaultValues.information?.nationality}
            error={get(errors, 'information.nationality') as FieldError}
            isSubmitClicked={Boolean(submitCount)}
            validations={{
              required: {
                value: true,
                message: 'Please, specify your nationality',
              },
            }}
          />
        </div>
      </div>

      <div className="font-bold mt-4">Personal Information</div>
      <div className="grid grid-cols-12 gap-4 row-gap-5 mt-5">
        <div tw="col-span-12 sm:col-span-6">
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
            isSubmitClicked={Boolean(submitCount)}
            validations={{
              required: {
                value: true,
                message: 'Please, specify your gender',
              },
            }}
          />
        </div>

        <div className="intro-y col-span-12 sm:col-span-6">
          <Select
            name="information.address.country"
            label="Country of residence"
            options={countries}
            control={control}
            register={register}
            unregister={unregister}
            placeholder="Where do you live right now?"
            setFormValue={setValue}
            initialValue={defaultValues.information?.address?.country}
            error={get(errors, 'information.address.country') as FieldError}
            isSubmitClicked={Boolean(submitCount)}
            validations={{
              required: {
                value: true,
                message: 'Please, specify your country of residence',
              },
            }}
          />
        </div>

        <div className="intro-y col-span-12 sm:col-span-6">
          <Input
            name="information.address.description"
            type="text"
            label="Address"
            register={register}
            placeholder="Your home address"
            validations={{
              minLength: {
                value: 10,
                message: 'Your address must have at least 10 characters',
              },
            }}
            error={get(errors, 'information.address.description') as FieldError}
          />
        </div>
        <div className="intro-y col-span-12 sm:col-span-6">
          <Input
            name="information.address.postalCode"
            type="text"
            label="Postal code"
            register={register}
          />
        </div>

        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
          {/* <button className="button w-24 justify-center block text-gray-700 mr-3">
            Previous
          </button> */}
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

export default ProfileForm
