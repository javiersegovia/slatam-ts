import React from 'react'
import _tw from 'twin.macro'
import Box from '@components/UI/Box'
import { Input } from '@components/FormFields'
import { FieldError, useFormContext } from 'react-hook-form'
import MultipleUpload from '@components/FormFields/Upload/MultipleUpload'
import Button from '@components/Button'
import { usePreviewURL } from '@lib/hooks/usePreviewURL'
import { HiOutlinePlus } from 'react-icons/hi'
import { FileData } from '@lib/utils/forms'
import { get } from 'lodash'

interface IGeneralMainProps {
  filesData: FileData[]
  handleFileChange: (e: React.FormEvent<HTMLInputElement>) => void
  handleFileDelete: (id: string) => void
}

const GeneralMain = ({
  filesData,
  handleFileChange,
  handleFileDelete,
}: IGeneralMainProps) => {
  const { register, errors } = useFormContext()

  const filesDataWithPreviews = usePreviewURL(filesData)

  // TODO: add drag n drop reordering for multiple images
  // TODO: add single image deletion when we have the Image Model

  return (
    <>
      <Box tw="p-5">
        <h3 tw="text-lg font-medium">Basic Information</h3>
        <div tw="mt-5 space-y-2">
          <Input
            name="name"
            type="text"
            label="Product name"
            placeholder="Your product name should contain between 5 and 50 characters"
            register={register}
            validations={{
              required: {
                value: true,
                message: 'Please, specify the product name',
              },
              minLength: {
                value: 5,
                message: 'Your product name must have at least 5 characters',
              },
              maxLength: {
                value: 50,
                message:
                  "Your product name shouldn't have more than 50 characters",
              },
            }}
            error={errors?.name}
          />
          <Input
            name="information.description"
            type="text"
            label="Short description"
            placeholder="Short description about your product"
            register={register}
            isTextArea
            validations={{
              minLength: {
                value: 10,
                message:
                  'The product description must have at least 10 characters',
              },
              maxLength: {
                value: 150,
                message:
                  "The product description shouldn't have more than 150 characters",
              },
            }}
            error={get(errors, 'information.description') as FieldError}
          />
          <div className="lg:grid gap-5 lg:grid-flow-col">
            {/* TODO: add currency formatting for the price */}
            <Input
              name="price"
              type="number"
              label="Price per unit"
              placeholder="Individual unit price"
              register={register}
              validations={{
                required: {
                  value: true,
                  message: 'Please, specify a price for your product',
                },
              }}
              error={errors?.price}
            />
          </div>
        </div>
      </Box>
      <Box tw="p-5 mt-10">
        <h3 tw="text-lg font-medium">Images</h3>
        <div tw="mt-5 space-y-2">
          <div tw="border border-gray-300 rounded-md flex flex-col overflow-hidden py-6">
            <MultipleUpload
              filesData={filesDataWithPreviews}
              handleFileDelete={handleFileDelete}
            />
            <label
              htmlFor="images"
              tw="inline-block mx-auto mt-2 cursor-pointer"
            >
              <Button
                tw="relative mt-3 p-3 inline-flex items-center rounded-full"
                size="SM"
              >
                <input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  tw="w-full h-full absolute opacity-0"
                />
                <HiOutlinePlus />
              </Button>
            </label>
          </div>
        </div>
      </Box>
    </>
  )
}

export default GeneralMain
