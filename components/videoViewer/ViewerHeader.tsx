import React from "react";

import {
    Avatar,
    Typography,
    Box
} from "@mui/material";

import tagStyled from 'styled-components'

import Icon from "shared/core/Icon";
import { IVideo } from "types/interfaces";

interface Params {
  video: IVideo
  openActionPopup : (event: any, video_id: string) => void
}

export default function VideoHeader({ video, openActionPopup }: Params) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom : 4
      }}
    >
      <Box 
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'flex-end'
        }}
      >
        <AvatarDiv>
          <Avatar
            alt="user avatar" src={video.userProfileImagePath}
            sx={{
              width: '3.2rem',
              height: '3.2rem'
            }}
          />
          <PlusTick>
            <Icon name="plus" color="#76CCB7" size={15}/>
          </PlusTick>
        </AvatarDiv>
        <Box>
          <Typography sx={{ fontSize: "1rem", color: "white", fontWeight: 500 }}>
              {video.userName}
            </Typography>
            <Typography
              sx={{ fontSize: "0.8rem", color: "lightgray", alignSelf: "flex-end" }}
            >
              {video.gameName}
            </Typography>
        </Box>
      </Box>
      <Box
        onClick={(e: any) => openActionPopup(e, video.id)}
      >
        <Icon name="vThreeDot" color='white' />
      </Box>
    </Box>
  );
}

const AvatarDiv = tagStyled.div`
  position : relative;
`

const PlusTick = tagStyled.div`
  border-radius : 50%;
  background : black;
  width : 20px;
  height : 20px;
  position : absolute;

  right : 3px;
  bottom : -3px;

  display : flex;
  align-items: center;
  justify-content: center;
`
