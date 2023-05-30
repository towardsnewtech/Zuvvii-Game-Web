import React from "react";

import { IComment } from "types/interfaces";

import { Box, Typography, Avatar, styled } from "@mui/material";
import Icon from "shared/core/Icon";

import tagStyled from 'styled-components'
import { getInterval } from "shared/helper/time";

export default function CommentHolder(props: { comment: IComment }) {
  const {
    days,
    hours,
    minutes,
    seconds
  } = getInterval(props.comment.dtPosted)

  return (
    <CommentHolderList>
      <Box
        sx={{
          display:'flex',
          gap:2
        }}
      >
        <Avatar
          alt="Avatar"
          src={props.comment.profilePic}
        />
        <Box>
          <UpperLine>
            <UserName>
              {props.comment.user?.userName}
            </UserName>
            <CommentText>
              {props.comment.text}
            </CommentText>
          </UpperLine>
          <UnderLine>
            <ReplyInfo>
              {days > 0 && `${days}D`} &nbsp;
              {hours > 0 && `${hours}H`} &nbsp;
              {minutes > 0 && `${minutes}M`} &nbsp;
              {seconds > 0 && `${seconds}S`} &nbsp;
            </ReplyInfo>
            <ReplyInfo>
              Reply
            </ReplyInfo>
          </UnderLine>
        </Box>
      </Box>
      <Vote>
      <Icon name="fillHeart" color="#76CCB7" size={35}/>
      <Typography
        sx={{
          color:'white',
        }}
      >
        0
      </Typography>
      </Vote>
    </CommentHolderList>
  );
}

const CommentHolderList = tagStyled.div`
    display : flex;
    justify-content : space-between;
    gap : 20px;

    padding-bottom : 20px;
`
const UpperLine = tagStyled.div`
    display : flex;
    gap: 10px;
`
const UnderLine = tagStyled.div`
    display: flex;
    gap: 10px;
`
const UserName = styled(Typography)`
    color: white ;
    font-size: 18px ;
    justify-self: flex-start ;
`
const CommentText = styled(Typography)`
    color: white;
    justify-content: flex-start;
`
const ReplyInfo = styled(Typography)`
    color: #C7B0B0;
    font-size: 1rem;
`
const Vote = tagStyled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`