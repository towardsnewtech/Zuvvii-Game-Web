import * as React from 'react'
import Image from 'next/image'
import { DetailedHTMLProps, VideoHTMLAttributes } from 'react'
import Loader from 'react-loading'
import Icon from './Icon'
import tagStyled from 'styled-components'
import ReactPlayer from "react-player";
import { StyledButton } from 'shared/styled'
import { captureVideoFrame } from 'shared/helper/clip'

interface IMedia {
  isRemoveable?: boolean
  isProcessing?: boolean
  showCapture: boolean
  onRemove?: () => void
  captureFrame? : (file: File) => void
  // size: cover will take full width and auto height
  // size: tile will take 48x48 size
//   size: 'tile' | 'cover' | 'icon'
  type: 'video' | 'image'
  link?: string
  containerClasses?: string
  className?: string
  videoProps?: DetailedHTMLProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >
}

function Media({
  type,
  link,
  isRemoveable,
  isProcessing,
  onRemove,
  captureFrame,
  videoProps,
  showCapture
}: IMedia) {
  let player: null | ReactPlayer;

  const [thumbnailUri, setThumbnailUri] = React.useState<string | null>(null);
  const [thumbnail, setThumbnail] = React.useState<File | null>(null);

  const onCapture = async () => {
    if (!player) return;

    const internalPlayer = player.getInternalPlayer();

    const frame = captureVideoFrame(internalPlayer);

    if (!frame) return;

    const { dataUri, file: thumbnailFile } = frame;

    if (!thumbnailFile) return;

    setThumbnailUri(dataUri);
    setThumbnail(thumbnailFile);

    if(captureFrame) {
      console.log('here')
      captureFrame(thumbnailFile)
    }
  };

  return (
    <MediaLayout>
      {isProcessing && (
        <Loading>
          <Loader type='spin' color='white' width={35} height={35} />
          <LoadingText>. . . Uploading</LoadingText>
        </Loading>
      )}
      {isRemoveable && (
        <RemoveButton>
          <Icon name='close' bgColor='rgba(101,98,98,0.46)' rounded onClick={onRemove} size={20} color='#e57676' />
        </RemoveButton>
      )}
      {type === 'video' && link && (
        showCapture ? <ReactPlayer
          ref={(p) => {
            player = p;
          }}
          url={link}
          controls
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous",
              },
            },
          }}
        /> : <video
          muted
          controls

          {...videoProps}
        >
          <source src={link}></source>
        </video>
      )}
      {type === 'video' && link && showCapture && (
        <Capture>
          {thumbnailUri && (
            <Thumbnail>
              <Image
                src={thumbnailUri}
                fill
                alt="thumbnail"
                style={{ marginBottom: "40px" }}
              />
            </Thumbnail>
          )}
          {!thumbnailUri && <StyledButton 
            startIcon={<Icon name='capture' color='black' size={30} raw/>}
            sx={{
              pt: 0.5,
              pb: 0.5,
              pl: 2,
              pr: 2
            }}
            onClick={onCapture}
          >
            Capture
          </StyledButton>}
        </Capture>
      )}
      
      {/* {type === 'image' && link && (
        <div >
          <Image
            src={link}
            fill
            alt='media file'
          />
        </div>
      )} */}
    </MediaLayout>
  )
}

Media.defaultProps = {
  isRemoveable: false,
  size: 'cover',
  showCapture: false
}

export default Media

const Thumbnail = tagStyled.div`
  border-radius: 1rem;
  border: 2px solid #65C5BA;
  overflow: hidden;
  position: relative;
  width: 5rem;
  height: 5rem;
`

const Capture = tagStyled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 1rem;
`

const MediaLayout = tagStyled.div`
  position: relative;

  video::-webkit-media-controls-timeline {
    background-color: #76CCB7;
    padding-bottom: 0px;
    margin-bottom: 10px;
  }

  video::-webkit-media-controls-volume-slider {
    background-color: #76CCB7;
    padding-top: 0;
    margin-top: 20px;
    padding-bottom: 0;
  }
`

const RemoveButton = tagStyled.div`
    width: fit-content;
    position: absolute;

    right: -15px;
    top: -15px;

    z-index: 10;
`
const Loading = tagStyled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background: #00000094;
    backdrop-filter: blur(2px);
    z-index: 10;
`

const LoadingText = tagStyled.p`
    color: #65C5BA;
`