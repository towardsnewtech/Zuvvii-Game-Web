import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { LikeType } from "types/interfaces";
import Icon from "shared/core/Icon";
import tagStyled from "styled-components";
import { IComment, IVideo } from "types/interfaces";
import CommentsList from "components/comment/CommentList";
import http from "services/http-common";
import { toast } from "react-toastify";

import { getSession } from "store/slices/app.slice";
import { useAppSelector } from "store/hooks";

import { useMutation } from "react-query";

interface Props {
  video: IVideo
  haveComments: boolean;
  openSharePopup: (event: any, video_id: string, video_url: string) => void | undefined;
}

export default function ViewerFooter({
  video,
  haveComments,
  openSharePopup
}: Props) {

  const [modifiedLike, setModifiedLike] = useState(video.liked);
  const [modifiedLikeCount, setModifiedLikeCount] = useState(video.likes);

  const session = useAppSelector((state) => getSession(state));

  const clickLike = useMutation({
    mutationFn: async ({
      itemId,
      likeType,
      userId,
      type
    }: {
        itemId: string,
        likeType: LikeType,
        userId: number,
        type: string
    }) => {
        const res: any = await http.post(`/items/${type}`, {
            itemId,
            likeType,
            userId
        })

        if(res.err) {
            throw (res.err.response.data)
        }

        return res.data
    }
  })

  const onLike = async () => {
    if(session?.userId) {
      if(!modifiedLike) {
        await clickLike.mutateAsync({
          itemId: video.id,
          likeType: LikeType.Item,
          userId: session.userId,
          type: 'likes'
        })
        setModifiedLikeCount(modifiedLikeCount+1)
        
      } else {
        await clickLike.mutateAsync({
          itemId: video.id,
          likeType: LikeType.Item,
          userId: session.userId,
          type: 'unlikes'
        })
        setModifiedLikeCount(modifiedLikeCount-1)
      }

      setModifiedLike(!modifiedLike)
      return
    }

    toast.info("You need to be logged in to like a video")
  };

  return (
    <FooterLayout>
      <Footer>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
          }}
        >
          <IconGroup>
            <Icon
              size={25}
              color={modifiedLikeCount ? "#76CCB7" : "white"}
              name="fillHeart"
              onClick={() => onLike()}
            />
            <Typography sx={{ fontSize: "1rem", color: "white" }}>
              {modifiedLikeCount}
            </Typography>
          </IconGroup>

          <IconGroup>
            <Link
              href={{
                pathname: "/[username]/clip/[clipId]",
                query: { username: video.userName, clipId: video.id },
              }}
              passHref
            >
              <Icon
                size={25}
                name={"comment"}
                color={video.Comments.length ? "#76CCB7" : "white"}
              />
            </Link>
            <Typography sx={{ fontSize: "1rem", color: "white" }}>
              {video.Comments.length}
            </Typography>
          </IconGroup>
        </Box>

        <IconGroup>
          <Box
            onClick={(e: any) => openSharePopup(e, video.id, video.videoUrl)}
          >
            <Icon size={25} name="share" color="white" />
          </Box>
          <Typography sx={{ fontSize: "1rem", color: "white" }}>
            {modifiedLikeCount}
          </Typography>
        </IconGroup>
      </Footer>
      {video.description && (
        <Description>
            <span style={{ fontWeight: 600 }}>{video.userName}</span> : <div dangerouslySetInnerHTML={{ __html: video.description }} />
        </Description>
      )}

      {window.location.href.includes("clip") && (
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
          }}
        >
          <Link
            href={{
              pathname: "/[username]/clip/[clipId]",
              query: { username: video.userName, clipId: video.id },
            }}
            passHref
          >
            {video.Comments.length > 2 && (
              <Box>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    float: "left",
                    paddingTop: "20px",
                  }}
                >
                  View all {video.Comments.length} Comments
                </Typography>
              </Box>
            )}
          </Link>
        </Box>
      )}
      {haveComments && (
        <CommentsList
          comments={video.Comments.length > 2 ? video.Comments.slice(0, 2) : video.Comments}
          videoId={video.id}
          onlyList
        />
      )}
    </FooterLayout>
  );
}

ViewerFooter.defaultProps = {
  haveComments: false,
  openSharePopup: undefined
};

const FooterLayout = tagStyled.div`
`;

const Description = tagStyled.div`
  text-overflow: ellipsis;
  
  margin: 0px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;

  color: white;

  font-family: poppins;
`;
const Footer = tagStyled.div`
  display : flex;
  justify-content : space-between;
  align-items : center;
  padding-right : 10px;
  padding-bottom : 1.5rem;
  padding-top : 1rem;
`;
const IconGroup = tagStyled.div`
  display : flex;
  flex-column : center;
  align-items : center;
`;
