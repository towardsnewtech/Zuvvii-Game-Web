import React from "react";

import { Popover, List, ListItem, styled } from "@mui/material";
import ReportModal from "components/modal/reportModal";

interface ActionPopupProps {
  open: boolean;
  anchorEl: any;
  id: string | undefined;
  handleClose: () => void;
}

type actionType = {
  label: string;
  action: () => void;
};

const ActionPopup = ({ open, anchorEl, id, handleClose }: ActionPopupProps) => {
  const actionList = [
    {
      label: "Give feedback",
      action: () => {},
    },
    {
      label: "Report Clip",
      action: () => { 
        handleClose() 
        handleOpenReportModal() 
      },
    },
    {
      label: "Block clip",
      action: () => {},
    },
    {
      label: "Cancel",
      action: () => { handleClose() },
    },
  ];

  const [openReportModal, setOpenReportModal] = React.useState(false)
  
  const handleOpenReportModal = () => { setOpenReportModal(true) }
  const handleCloseReportModal = () => { setOpenReportModal(false) }

  return (
    <React.Fragment>
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
            boxShadow: "rgba(255, 255, 255, 0.1) -1px 0px 4px 4px"
          },
        }}
      >
        <List>
          {actionList.map((action: actionType) => (
            <StyledListItem key={action.label} onClick={action.action}>
              {action.label}
            </StyledListItem>
          ))}
        </List>
      </Popover>
      <ReportModal 
        open={openReportModal}
        handleClose={handleCloseReportModal}
      />
    </React.Fragment>
  );
};

export default ActionPopup;

const StyledListItem = styled(ListItem)`
  color: white;
  cursor: pointer;
`;
