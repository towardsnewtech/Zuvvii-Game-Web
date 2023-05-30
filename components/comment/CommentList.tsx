import React, { useState } from "react"

import CommentHolder from "./CommentHolder"
import CommentEntry from "./CommentEntry"
import { Box, Typography, List } from "@mui/material"

import { IComment } from "types/interfaces"

export default function CommentsList(props: {
  comments: IComment[] | undefined;
  videoId: string;
  onlyList: boolean
}) {
  const [newComments, setNewComments] = useState<IComment[]>([]);

  function addComment(comment: IComment) {
    setNewComments([...newComments, comment]);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingTop: "2rem",
        paddingBottom: "2rem"
      }}
    >
      { !props.onlyList && <Typography
        sx={{
          color: "white",
          fontSize: "1.25rem",
          paddingBottom: 2,
        }}
      >
        Comments
      </Typography> }
      <List sx={{ width: "100%", minWidth: 360 }}>
        {props.comments &&
          props.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <CommentHolder comment={comment} />
              </div>
            );
          })}
        {newComments.map((comment) => {
          return (
            <div key={comment.id}>
              <CommentHolder comment={comment} />
            </div>
          );
        })}
      </List>
      { !props.onlyList && <CommentEntry videoId={props.videoId} /> }
    </Box>
  );
}

CommentsList.defaultProps = {
    onlyList: false
}