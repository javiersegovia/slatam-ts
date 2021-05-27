import React, { useState } from 'react'
import faker from 'faker'

export interface FileData {
  id: string
  file?: File
  url?: string
  urlPreview?: string
}

interface useFileDataOptions {
  isMultiple: boolean
}

export const useFilesData = (
  files: FileData[] = [],
  options: useFileDataOptions = {
    isMultiple: true,
  }
) => {
  const [filesData, setFilesData] = useState<FileData[]>(files)

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const currentFiles = e.currentTarget.files

    const files =
      (currentFiles?.length &&
        Array.from(currentFiles)?.map((file) => ({
          id: faker.random.uuid(),
          file: file,
        }))) ||
      []

    return setFilesData((existingState) =>
      options.isMultiple
        ? [...existingState, ...files]
        : files?.length
        ? [...files]
        : [...existingState]
    )
  }

  const handleFileDelete = (id: string) => {
    setFilesData(filesData.filter((fileData) => fileData.id !== id))
  }

  return {
    filesData,
    setFilesData,
    handleFileChange,
    handleFileDelete,
  }
}
