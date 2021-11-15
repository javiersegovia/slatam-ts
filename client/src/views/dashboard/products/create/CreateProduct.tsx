import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CreateProductInput } from '@graphql/schema'
import { useCreateProductMutation, useMyProductsQuery } from '@graphql/hooks'
import { TOption } from '@components/FormFields/Select'
import { ProductStatus } from '../../../../graphql/schema'
import GeneralInformation from '../shared/GeneralInformation'
import { useFilesData } from '@lib/utils/forms'
import { useQueryClient } from 'react-query'
import Router from 'next/router'
import routes from '@lib/utils/routes'

export type IProductFormValues = Omit<CreateProductInput, 'status'> & {
  status: TOption
}

const CreateProduct = () => {
  const queryClient = useQueryClient()

  const { mutate: createProduct, isLoading } = useCreateProductMutation()
  const formMethods = useForm<IProductFormValues>()
  const [success, setSuccess] = useState(false)

  // TODO: handle null and server errors
  // TODO: add redirection and UI updates for saving
  // TODO: add notification at the top for product created successfully after redirection

  const { filesData, handleFileChange, handleFileDelete } = useFilesData([])

  const { handleSubmit, formState } = formMethods
  const { isSubmitting } = formState

  const onSubmit = async (formData: IProductFormValues) => {
    const { information, name, price, status } = formData

    const statusString = Object.values(status)[0]
    const images = filesData?.map((fileData) => fileData.file).filter(Boolean)

    await createProduct(
      {
        data: {
          name,
          price,
          information:
            information && Object.keys(information).length
              ? {
                  ...information,
                }
              : undefined,
          images,
          status: statusString as ProductStatus,
        },
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries(useMyProductsQuery.getKey())
          Router.push(routes.dashboard.products.index)
        },
      }
    )
  }

  return (
    <FormProvider {...formMethods}>
      <GeneralInformation<IProductFormValues>
        isSuccess={success}
        isLoading={isLoading || isSubmitting}
        title="Create product"
        onSubmit={handleSubmit(onSubmit)}
        filesData={filesData}
        handleFileChange={handleFileChange}
        handleFileDelete={handleFileDelete}
      />
    </FormProvider>
  )
}

export default CreateProduct
