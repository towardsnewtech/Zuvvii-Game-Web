import React, { useMemo } from "react";

import { useRouter } from "next/router";
import { useQuery } from "react-query";

import http from "services/http-common";

import { Box } from "@mui/system";
import { IVideo } from "types/interfaces";
import Icon from "shared/core/Icon";
import SingleLoading from "components/common/SingleLoading";
import VideoViewer from "components/videoViewer";
import CommentsList from "components/comment/CommentList";

interface SingleClipProps {
  clipId: string;
  videoData: IVideo | null
}

function SingleClip({ clipId, videoData }: SingleClipProps) {
  const router = useRouter();

  const getVideoData: any = useQuery(
    ["getSingleVideo", clipId],
    () => {
      return http.get(`/items/${clipId}`)
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
    }
  );

  const video: IVideo | null = useMemo(() => {
    return  getVideoData.data ?
            getVideoData.data.data
            : videoData
  }, [getVideoData.data, videoData]);

  const goToHome = () => {
    router.push("/home");
  };

  if (!video && !clipId) {
    return <Box>Video not found</Box>;
  }

  return (
    <React.Fragment>
      <div style={{ minHeight: "60vh", width: "60%" }}>
        <Box
          sx={{
            display: "flex",
            mb: "40px",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Icon name="backarrow" color="white" onClick={goToHome} />
          <Box
            sx={{
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            Comments
          </Box>
        </Box>
        {video ? (
          <div>
            <VideoViewer 
              video={video}
            />
            <CommentsList
              comments={video.Comments}
              videoId={video.id}
            />
          </div>
        ) : (
          <SingleLoading 
            type="spin"
            size={60}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default SingleClip;
