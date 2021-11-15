import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ProductStatus, UpdateProductInput } from '@graphql/schema'
import { TOption } from '@components/FormFields/Select'
import GeneralInformation from '../shared/GeneralInformation'
import { useMyProductsQuery, useUpdateProductMutation } from '@graphql/hooks'
import { useFilesData, FileData } from '@lib/utils/forms'
import { ProductQuery } from '../../../../graphql/schema'
import { useQueryClient } from 'react-query'
import Router from 'next/router'
import routes from '@lib/utils/routes'
import { useProductQuery } from '../../../../graphql/hooks'

export type IUpdateProductFormValues = Omit<
  UpdateProductInput,
  'status' | 'newImages' | 'existingImages'
> & {
  status: TOption
}

interface UpdateProductProps {
  product: ProductQuery['product']
}

const UpdateProduct = ({ product }: UpdateProductProps) => {
  const queryClient = useQueryClient()

  const { images: productImages } = product

  const productImagesData: FileData[] =
    productImages?.map((pImage) => ({
      id: pImage.id,
      url: pImage.thumbnail.url,
    })) || []

  const { filesData, handleFileChange, handleFileDelete } = useFilesData([
    ...productImagesData,
  ])

  const { mutate: updateProduct, isLoading } = useUpdateProductMutation()
  const [success, setSuccess] = useState(false)

  const defaultValues: IUpdateProductFormValues = {
    ...product,
    information: {
      ...product.information,
    },
    status: {
      id: product.status,
    },
  }

  const formMethods = useForm<IUpdateProductFormValues>({
    defaultValues,
  })

  // TODO: handle null and server errors
  // TODO: add notification at the top for product created successfully after redirection

  const { handleSubmit, formState } = formMethods
  const { isSubmitting } = formState

  const onSubmit = async (formData: IUpdateProductFormValues) => {
    const { information, name, price, status } = formData
    const statusString = Object.values(status)[0]

    const newImages = filesData
      .filter((fileData) => !!fileData.file)
      .map((fileData) => fileData.file)

    const existingImages = filesData
      .filter((fileData) => !!fileData.url)
      .map((item) => item.id)

    await updateProduct(
      {
        data: {
          id: product.id,
          name,
          price,
          information:
            information && Object.keys(information).length
              ? {
                  ...information,
                }
              : undefined,
          newImages,
          existingImages,
          status: statusString as ProductStatus,
        },
      },
      {
        onSuccess: async () => {
          setSuccess(true)

          await queryClient.refetchQueries(useMyProductsQuery.getKey())
          await queryClient.refetchQueries(
            useProductQuery.getKey({ id: product.id })
          )
          Router.push(routes.dashboard.products.index)
        },
      }
    )
  }

  return (
    <FormProvider {...formMethods}>
      <GeneralInformation<IUpdateProductFormValues>
        isSuccess={success}
        isLoading={isLoading || isSubmitting}
        title="Update product"
        defaultValues={defaultValues}
        onSubmit={handleSubmit(onSubmit)}
        filesData={filesData}
        handleFileChange={handleFileChange}
        handleFileDelete={handleFileDelete}
      />
    </FormProvider>
  )
}

export default UpdateProduct
