import React from "react";
import { Box } from "@mui/material";

import { IVideo } from "types/interfaces";
import VideoViewer from "components/videoViewer";

interface HomeVideoCardProps {
  video: IVideo
  openActionPopup : (event: any, video_id: string) => void
  openSharePopup: (event: any, video_id: string, videoUrl: string) => void
}

const HomeVideoCard = ({ video, openActionPopup, openSharePopup }: HomeVideoCardProps) => {
  return (
    <Box sx={{ width: '60%', marginBottom: 8 }}>
      <VideoViewer 
        openActionPopup={openActionPopup}
        openSharePopup={openSharePopup}
        video={video}
        haveComments={true}
      />
    </Box>
  );
};

export default HomeVideoCard;
