import { useMutation } from 'react-query'
import http from 'services/http-common'

function useFiles() {
  const {
    mutate: uploadFile,
    mutateAsync: uploadFileAsync,
    error: fileUploadError,
    isLoading: isUploadingFile,
    data: uploadedFileUrl
  } = useMutation({
    mutationFn: async (file: File) => {
      const payload = new FormData()
      payload.append('formFile', file)

      // api call
      const res: any = await http.post(`/items/upload`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if(res.err) {
        throw (res.err.response.data)
      }

      const url: string = res.data

      return url
    }
  })

  const {
    mutateAsync: uploadFileList,
    error: fileListUploadError,
    isLoading: isUploadingFileList,
    data: uploadedFileListUrls
  } = useMutation({
    mutationFn: async (files: FileList) => {
      const uploadedFiles = await Promise.all(
        Array.from(files).map(async file => ({
          file,
          url: await uploadFileAsync(file)
        }))
      )

      return uploadedFiles
    }
  })

  // for removing single file by url
  const {
    mutate: removeFile,
    error: fileRemovalError,
    isLoading: isRemovingFile
  } = useMutation({
    mutationFn: async (url: string) => {
      const payload = { filename: url }
      return await http.post(`/removeFile`, payload)
    }
  })

  // for removing multiple files by list of urls
  const {
    mutate: removeFiles,
    error: filesRemovalError,
    isLoading: isRemovingFiles
  } = useMutation({
    mutationFn: async (urls: string[]) => {
      return await Promise.all(
        urls.map(async url => await removeFile(url))
      )
    }
  })

  return {
    // for single file upload
    fileUploadError,
    uploadedFileUrl,
    isUploadingFile,
    uploadFile: uploadFileAsync,
    // for file list upload
    uploadFileList,
    fileListUploadError,
    isUploadingFileList,
    uploadedFileListUrls,
    // for single file removal
    removeFile,
    isRemovingFile,
    fileRemovalError,
    // for multiple files removal
    removeFiles,
    isRemovingFiles,
    filesRemovalError
  }
}

export default useFiles
