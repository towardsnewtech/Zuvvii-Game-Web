import React, { ChangeEvent, useState } from "react";

import Image from "next/image";
import sendCommentImage from "../../public/assets/ic_right_arrrow.png";

import { Box, InputAdornment } from "@mui/material";

import { useAppSelector } from "store/hooks";
import { getSession } from "store/slices/app.slice";

import { useMutation, useQueryClient } from 'react-query'
import http from "services/http-common";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import { StyledTextField } from "../../shared/styled";
import { selectUser, setSelectedAccount } from "store/slices/auth.slice";

interface CommentEntryProps {
  videoId: string;
}

export default function CommentEntry({
  videoId,
}: CommentEntryProps) {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient()

  const session = useAppSelector((state) => getSession(state))
  const account = useAppSelector((state) => selectUser(state))

  const onType = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const addComment = useMutation({
    mutationFn: async ({
      id,
      itemId,
      userId,
      userName,
      text
    }: {
      id: string;
      itemId: string;
      userId: number;
      userName: string;
      text: string;
    }) => {
        const res: any = await http.post(`/items/comments/new`, {
          id,
          itemId,
          userId,
          userName,
          text
        })

        if(res.err) {
            throw (res.err.response.data)
        }

        queryClient.invalidateQueries('getSingleVideo')

        setComment("")

        return 
    }
  })

  const onSubmit = async () => {
    if(session?.userId) {

      const id = uuidv4()

      addComment.mutate({
        id,
        itemId: videoId,
        userId: session.userId,
        userName: account?.userName || "",
        text: comment
      })

      return
    }

    toast.info("Plese, login first!")
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingRight:3
      }}
    >
      <StyledTextField
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => onType(e)}
        multiline
        fullWidth
        sx={{ width: "100%", borderRadius: "0px", marginTop:'1.5rem', border:'1px solid white' }}
        InputProps={{
          endAdornment: <InputAdornment position="end" sx={{cursor : 'pointer'}} onClick={onSubmit}>
              <Image
                width={42}
                height={42}
                src={sendCommentImage.src}
                alt="send comment"
              />
          </InputAdornment>,
        }}
      />
    </Box>
  );
}