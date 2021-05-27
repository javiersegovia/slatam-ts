import React from 'react'
import _tw from 'twin.macro'
import { CgClose } from 'react-icons/cg'
import UploadPlaceholder from './UploadPlaceholder'
import { FileData } from '@lib/utils/forms'

interface MultipleUploadProps {
  filesData?: Pick<FileData, 'id' | 'url' | 'urlPreview'>[]
  handleFileDelete: (id: string) => void
}

const MultipleUpload = ({
  filesData,
  handleFileDelete,
}: MultipleUploadProps) => {
  return (
    <>
      <div tw="h-full relative overflow-x-auto">
        {filesData?.length ? (
          <>
            <div tw="h-full inline-flex items-center space-x-4 mt-2 px-5 overflow-x-visible">
              {filesData.map((fileData) => (
                <div tw="w-32 h-32 relative" key={fileData.id}>
                  <div
                    tw="h-full bg-center bg-gray-200 rounded-md border border-gray-300 bg-no-repeat bg-cover overflow-hidden"
                    style={{
                      backgroundImage: `url(${
                        fileData.url || fileData.urlPreview
                      })`,
                    }}
                  />
                  <button
                    type="button"
                    tw="z-10 absolute top-0 right-0 rounded-full w-5 h-5 -mr-2 -mt-2 bg-red-700 text-white flex justify-center items-center text-sm"
                    onClick={() => handleFileDelete(fileData.id)}
                  >
                    <CgClose />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div tw="mx-auto w-40">
            <UploadPlaceholder tw="h-40" />
          </div>
        )}
      </div>
    </>
  )
}

export default MultipleUpload
