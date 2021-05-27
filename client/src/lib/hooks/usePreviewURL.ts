import { useEffect, useRef, useState } from 'react'
import { FileData } from '../utils/forms'

type usePreviewURLProps = (files?: FileData[]) => FileData[] | undefined

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export const usePreviewURL: usePreviewURLProps = (files) => {
  const [urlPreviews, setUrlPreviews] = useState<FileData[]>()
  const filesArray = useRef<FileData[]>([])

  useEffect(() => {
    if (!files || !files.length) {
      setUrlPreviews(undefined)
      return
    }

    filesArray.current = files || []

    const newPreviews: (FileData | null)[] = filesArray.current.map((item) => {
      if (item.url) return item

      return item.file
        ? {
            ...item,
            urlPreview: URL.createObjectURL(item.file),
          }
        : null
    })

    const notEmptyPreviews: FileData[] = newPreviews.filter(notEmpty)

    setUrlPreviews(notEmptyPreviews)

    // TODO: add a validation with the files extension

    return () =>
      urlPreviews?.forEach(
        (fileData) =>
          fileData.urlPreview && URL.revokeObjectURL(fileData.urlPreview)
      )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, files?.length])

  return urlPreviews
}
