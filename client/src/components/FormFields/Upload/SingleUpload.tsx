import React from 'react'
import _tw from 'twin.macro'
import { CgClose } from 'react-icons/cg'
import UploadPlaceholder from './UploadPlaceholder'
import { FileData } from '../../../lib/utils/forms'

export interface SingleUploadProps {
  fileData?: Pick<FileData, 'id' | 'url' | 'urlPreview'>
  handleFileDelete: (id: string) => void
}

const SingleUpload = ({ fileData, handleFileDelete }: SingleUploadProps) => {
  return (
    <>
      <div tw="h-40 relative">
        {fileData ? (
          <>
            <div
              tw="w-full h-full bg-center bg-gray-200 rounded-md border border-gray-300 bg-no-repeat bg-cover overflow-hidden"
              style={{
                backgroundImage: `url(${fileData.url || fileData.urlPreview})`,
              }}
            />
            <button
              type="button"
              tw="z-10 absolute top-0 right-0 rounded-full w-5 h-5 -mr-2 -mt-2 bg-red-700 text-white flex justify-center items-center text-sm"
              onClick={() => handleFileDelete(fileData.id)}
            >
              <CgClose />
            </button>
          </>
        ) : (
          <UploadPlaceholder />
        )}
      </div>
    </>
  )
}

export default SingleUpload
