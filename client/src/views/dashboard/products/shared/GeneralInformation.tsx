import React from 'react'
import _tw from 'twin.macro'
import ProductNavigation from './ProductNavigation'

import GeneralMain from './GeneralMain'
import GeneralAside from './GeneralAside'
import Title from '@components/UI/Title'
import Button from '@components/Button'
import { FileData } from '@lib/utils/forms'
import DashboardContainerProps from '@components/UI/Container'

interface GeneralInformationProps<TFormValues> {
  isSuccess: boolean
  isLoading: boolean
  title: string
  onSubmit: () => void
  defaultValues?: TFormValues
  filesData: FileData[]
  handleFileChange: (e: React.FormEvent<HTMLInputElement>) => void
  handleFileDelete: (id: string) => void
}

const GeneralInformation = <TFormValues,>({
  isSuccess,
  isLoading,
  title,
  handleFileChange,
  handleFileDelete,
  onSubmit,
  filesData,
  defaultValues,
}: GeneralInformationProps<TFormValues>) => {
  return (
    <>
      <form onSubmit={onSubmit} css={[isLoading && _tw`opacity-70`]}>
        <DashboardContainerProps>
          <div tw="flex justify-between mt-8 items-center">
            <Title>{title}</Title>
            <div tw="flex items-center">
              <button className="button w-24 justify-center block text-gray-700 mr-3">
                Preview
              </button>
              {/* <Button size="SM" type="submit" tw="w-20">
                Save
              </Button> */}
              <Button
                size="SM"
                type="submit"
                variant={isSuccess ? 'SUCCESS' : undefined}
                isLoading={isLoading}
                disabled={isLoading || isSuccess}
                tw="w-20"
                showCheckOnSuccess
              >
                Save
              </Button>
            </div>
          </div>

          <ProductNavigation />

          <div tw="grid grid-cols-12 gap-6">
            <section tw="col-span-12 lg:col-span-8 2xl:col-span-8">
              <GeneralMain
                filesData={filesData}
                handleFileChange={handleFileChange}
                handleFileDelete={handleFileDelete}
              />
            </section>

            <aside tw="col-span-12 lg:col-span-4 2xl:col-span-4 flex lg:block flex-col-reverse">
              <GeneralAside defaultValues={defaultValues} />
            </aside>
          </div>
        </DashboardContainerProps>
      </form>
    </>
  )
}

export default GeneralInformation
