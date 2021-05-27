import React from 'react'
import _tw from 'twin.macro'
import Box from '@components/UI/Box'
import Select, { TOption } from '@components/FormFields/Select'
import { FieldError, useFormContext } from 'react-hook-form'
import { useCategoriesQuery, useProductStatusesQuery } from '@graphql/hooks'
import { ProductStatus } from '@graphql/schema'
import { get } from 'lodash'

interface IGeneralAsideProps {
  defaultValues?: {
    status?: TOption
    information?: {
      category: TOption
    }
  }
}

const GeneralAside = ({ defaultValues }: IGeneralAsideProps) => {
  const { data: categoriesData } = useCategoriesQuery()
  const { data: productStatusesData } = useProductStatusesQuery()

  const {
    control,
    register,
    unregister,
    formState,
    setValue,
    errors,
  } = useFormContext()

  const { submitCount } = formState

  return (
    <Box tw="p-5 space-y-2">
      <Select
        name="status"
        label="Status"
        options={productStatusesData?.productStatuses}
        control={control}
        register={register}
        unregister={unregister}
        setFormValue={setValue}
        initialValue={defaultValues?.status || ProductStatus.Inactive}
        isSubmitClicked={Boolean(submitCount)}
        validations={{
          required: {
            value: true,
            message: "The status can't be empty",
          },
        }}
        error={errors?.status}
      />
      <Select
        name="information.category"
        label="Category"
        options={categoriesData?.categories}
        control={control}
        register={register}
        unregister={unregister}
        setFormValue={setValue}
        initialValue={defaultValues?.information?.category}
        isSubmitClicked={Boolean(submitCount)}
        validations={{
          required: {
            value: true,
            message: 'Please, specify one category',
          },
        }}
        error={get(errors, 'information.category') as FieldError}
      />
    </Box>
  )
}

export default GeneralAside
