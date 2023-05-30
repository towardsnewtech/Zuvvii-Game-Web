import React from "react";

import { IVideo } from "types/interfaces";

import HomeVideoCard from "./VideoCard";
import ActionPopup from "./popup/ActionPopup";
import dynamic from "next/dynamic";

const SharePopup = dynamic(() => import('./popup/SharePopup'), {
  ssr: false
})

interface HomeVideoListProps {
  videos: IVideo[];
}

const HomeVideoList = ({ videos }: HomeVideoListProps) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorShare, setAnchorShare] = React.useState(null)
  const [selectedVideoUrl, setSelectedVideoUrl] = React.useState<string>("")

  const open = Boolean(anchorEl);
  const openShare = Boolean(anchorShare)

  const id = open ? "simple-popover" : undefined;
  const share_pop_up_id = openShare ? "share-popover" : undefined;

  const openActionPopup = (event: any, video_id: string) => {
    setAnchorEl(event.currentTarget);
  };

  const closeActionPopup = () => {
    setAnchorEl(null);
  };

  const openSharePopup = (event: any, video_id: string, video_url: string) => {
    setAnchorShare(event?.currentTarget)
    setSelectedVideoUrl(video_url)
  }

  const closeSharePopup = () => {
    setAnchorShare(null)
  }

  return (
    <React.Fragment>
      {videos.map((video) => (
        <HomeVideoCard
          key={video.id} 
          video={video} 
          openActionPopup={openActionPopup} 
          openSharePopup={openSharePopup}
        />
      ))}
     
      <ActionPopup
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={closeActionPopup}
      />
      <SharePopup 
        id={share_pop_up_id}
        open={openShare}
        anchorEl={anchorShare}
        handleClose={closeSharePopup}
        url={selectedVideoUrl}
      />
    </React.Fragment>
  );
};

export default HomeVideoList;

