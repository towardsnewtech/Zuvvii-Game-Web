import * as React from 'react'
import { IVideo } from 'types/interfaces'

import ViewerHeader from './ViewerHeader'
import VideoPlayer from './VideoPlayer'
import ViewerFooter from './ViewerFooter'

interface IViewer {
    noHeader: boolean
    noFooter: boolean
    video: IVideo
    haveComments: boolean
    openActionPopup: (event: any, video_id: string) => void
    openSharePopup: (event: any, video_id: string, video_url: string) => void
}

const VideoViewer  = ({
    noHeader,
    noFooter,
    video,
    haveComments,
    openActionPopup,
    openSharePopup
}: IViewer) => {
    return (
        <React.Fragment>
            { !noHeader && <ViewerHeader
                video={video}
                openActionPopup={openActionPopup}
            /> }
            <VideoPlayer 
                video={video}
            />
            { !noFooter && <ViewerFooter 
                video={video}
                haveComments={haveComments}
                openSharePopup={openSharePopup}
            />}
        </React.Fragment>
    )
}

VideoViewer.defaultProps = {
    haveComments: false,
    noHeader: false,
    noFooter: false,
    openActionPopup : () => {},
    openSharePopup : () => {}
}

export default VideoViewer