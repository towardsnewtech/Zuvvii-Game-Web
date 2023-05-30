import React from "react"

import { Popover, List, ListItem, styled } from "@mui/material"
import Icon from "shared/core/Icon"
import tagStyled from 'styled-components'
import { toast } from 'react-toastify'

import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton
} from 'react-share'

interface SharePopupProps {
  open: boolean;
  anchorEl: any;
  id: string | undefined;
  handleClose: () => void;
  url: string
}

type optionType = {
  label: string;
  action: () => void;
};

const SharePopup = ({ open, anchorEl, id, url, handleClose }: SharePopupProps) => {
  const optionList: Array<optionType> = [
    {
      label: "Share via",
      action: () => {}
    },
    {
      label: "Other options",
      action: () => {}
    },
  ];

  const onCopyClipboardListener = (url: string) => {
    navigator.clipboard.writeText(url ?? '')
    handleClose()

    toast.success('Link copied successfully!', {
      toastId: 'linkCopied'
    })
  }

  const onDownloadClipListener = async (url: string) => {
    let a: any = document.createElement('A');
    a.href = url;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    handleClose()
  }
  
  return (
    <Popover
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      PaperProps={{
        style: {
          background: "black",
          // border: "1px solid #C7B0B0",
          boxShadow: "rgba(255, 255, 255, 0.1) -1px 0px 4px 4px"
        },
      }}
    >
      <List>
        {optionList.map((option: optionType) => (
          <StyledListItem key={option.label} onClick={option.action}>
            <div>
              <Label>
                {option.label}
              </Label>
              <IconList>
                  {
                    option.label === 'Share via' && <>
                      <FacebookShareButton url={window.location.href}>
                        <FacebookIcon size={40} round />
                      </FacebookShareButton>
                      <LinkedinShareButton url={window.location.href}>
                        <LinkedinIcon size={40} round />
                      </LinkedinShareButton>
                      <TwitterShareButton url={window.location.href}>
                        <TwitterIcon size={40} round />
                      </TwitterShareButton>
                      <WhatsappShareButton url={window.location.href}>
                        <WhatsappIcon size={40} round />
                      </WhatsappShareButton>
                    </>
                  }
                  {
                    option.label === "Other options" && <>
                      <Icon name="ailink" rounded={true} bgColor="#76CCB7"
                        onClick={() => onCopyClipboardListener(url)}
                      />
                      <Icon name="download" rounded={true} bgColor="#76CCB7"
                        onClick={() => onDownloadClipListener(url)}
                      />
                    </>
                  }
              </IconList>
            </div>
          </StyledListItem>
        ))}
      </List>
    </Popover>
  );
};

export default SharePopup;

const StyledListItem = styled(ListItem)`
  color: white;
  cursor: pointer;
`;

const IconList = tagStyled.div`
  padding-top: 10px;
  display: flex;
  gap: 10px;
`

const Label = tagStyled.p`
  color: white;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
  font-size: 1.25rem;
`
