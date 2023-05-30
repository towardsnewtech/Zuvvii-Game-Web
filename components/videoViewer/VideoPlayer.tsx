import React from "react";
import ReactPlayer from "react-player";
import { Box } from "@mui/material";
import tagStyled from 'styled-components'
import { IVideo } from "types/interfaces";

interface Params {
    type: "other" | "youtube"
    video: IVideo | undefined
}
export default function VideoPlayer({ 
    video,
    type
 }: Params) {
  return (
    <VideoPlayStyle>
      {video !== undefined ? (
        <ReactPlayer
          url={video.videoUrl}
          controls
          width="100%"
          height="100%"
        />
      ) : null}
    </VideoPlayStyle>
  );
}

VideoPlayer.defaultProps = {
    type: "other"
}

const VideoPlayStyle = tagStyled.div`
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
