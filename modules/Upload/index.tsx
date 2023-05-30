/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import Image from 'next/image'

import Form from 'shared/core/Form'
import Media from 'shared/core/Media'
import MediaPicker from 'shared/core/MediaPicker'

import useUploadForm from './useUploadForm'
import { uploadValidation } from './validation'
import { StyledButton } from 'shared/styled'
import galleryImage from 'public/assets/gallery.png'
import tagStyled from 'styled-components'
import { toast } from 'react-toastify'
import { useAppSelector } from 'store/hooks'
import { LoadingButton } from '@mui/lab'
import SingleLoading from 'components/common/SingleLoading'

interface IUploadForm {
  apiEndpoint: string
  initialValues?: any
  onAPICallSuccess: (data?: any) => any
}

function UploadForm({
  apiEndpoint,
  initialValues,
  onAPICallSuccess,
}: IUploadForm) {
  const {
    // for upload
    create,
    isLoading,
    error: uploadError
  } = useUploadForm({
    apiEndpoint,
    onAPICallSuccess
  })

  const account = useAppSelector(state => state.auth.account)

  const showAuthError = () => {
    toast.error('Please, login first')
  }

  React.useEffect(() => {
    if(uploadError) {
        toast.error(uploadError as string)
    }
  }, [uploadError])

  return (
    <Form
      onSubmit={async values => {
        create({
          ...values,
        })
      }}
      validationSchema={uploadValidation}
      initialValues={initialValues}
    >
      <MediaPicker
        hookToForm
        name='media'
        allowedMediaTypes={['video/*']}
      >
        {({
          error,
          openPicker,
          captureFrame,
          files,
          removeAllFiles,
          removeFileAtIndex,
        }) => (
          <MediaPickerLayout>
            {
                !files && <Picker
                    onClick={account ? openPicker : showAuthError}
                >
                    <Image src={galleryImage.src} width={70} height={70} alt='not found gallery image' />
                    <StyledButton
                        sx={{
                            textTransform: 'capitalize'
                        }}
                    >
                        Select clips from your computer
                    </StyledButton>
                </Picker>
            }
            {files && files.length ? (
                Array.from(files).map((x, index) => (
                <Media
                    size='cover'
                    isRemoveable={!isLoading}
                    onRemove={async () =>
                        await removeFileAtIndex(index)
                    }
                    isProcessing={isLoading}
                    key={x.name}
                    link={URL.createObjectURL(x)}
                    captureFrame={captureFrame}
                    type={
                        x.type.search('video') >= 0
                            ? 'video'
                            : 'image'
                    }
                    showCapture
                />
                ))
            ) : (
                <></>
            )}
            {files && files.length ? (
              <UploadButton>
                <LoadingButton
                    sx={{
                        width: '100px',
                        marginTop: '1.5rem',
                        backgroundColor: "#65C5BA",
                        textTransform: 'capitalize',
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                        ":hover": { backgroundColor: "#76D6CB" },
                    }}
                    type='submit'
                    loading={isLoading}
                    loadingIndicator={<SingleLoading type="spin" size={20} />}
                >
                  upload
                </LoadingButton>
              </UploadButton>
            ) : <></>}
            {(error ) && (
                <ErrorText>
                    {error}
                </ErrorText>
            )}
          </MediaPickerLayout>
        )}
      </MediaPicker>
    </Form>
  )
}

UploadForm.defaultProps = {
  row: true
}
export default UploadForm

const UploadButton = tagStyled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;
`
const ErrorText = tagStyled.p`
    color: #bd2121;
    margin: 0px;
    padding: 0px;
`
const Picker = tagStyled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
`

const MediaPickerLayout = tagStyled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    
    video {
      width: 100%;
    }
`
