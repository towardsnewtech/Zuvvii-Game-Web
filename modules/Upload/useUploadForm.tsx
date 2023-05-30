import * as React from 'react'
import useFiles from 'shared/hooks/useFiles'
import { useMutation } from 'react-query'
import http from 'services/http-common'
import { useAppSelector } from 'store/hooks'
import { toast } from 'react-toastify'

interface IUploadForm {
  apiEndpoint: string
  onAPICallSuccess: (data?: any) => any
}

function useUploadForm({ onAPICallSuccess, apiEndpoint }: IUploadForm) {
  // this is just to get the auth user id (cross cutting concerns should
  // be in dedicated form composers)
  const { account } = useAppSelector(state => state.auth)

  // post actions
  const { mutate, error, isLoading } = useMutation({
    mutationFn: async ({
      media,
      media_thumbnail
    }: {
      media: FileList | null,
      media_thumbnail: File
    }) => {
      if(!media_thumbnail) {
        toast.error('Please, capture thumbnail first')
        return 
      }

      let fileUrls: any = media
        ? (await uploadFileList(media)).map(x => x.url)
        : []
      
      if(fileUrls && fileUrls.length) {
        let thmbnail_url = await uploadFile(media_thumbnail)

        const res: any = await http.post(`/items/uploadUrl`, {
          videoUrl: fileUrls[0],
          thumbnailUrl: thmbnail_url
        })
        
        if(res.err) throw(res.err.response.message)

        onAPICallSuccess(res.data)
      }

      
      // return payload
      return 
    }
  })

  const { uploadFileList, uploadFile, removeFile, fileUploadError } = useFiles()

  return {
    // for post creation
    create: mutate,
    error: ( error || fileUploadError ) as string || null,
    isLoading: isLoading,
    removeFile,
  }
}

export default useUploadForm
