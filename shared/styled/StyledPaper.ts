import { Paper, styled } from '@mui/material'

export default styled(Paper)`
  border-radius: 5px;
  box-shadow: rgba(255, 255, 255, 0.1) -1px 0px 4px 4px;
  color: white;
  background: black;
  
  & .MuiDialogTitle-root {
  }

  & .MuiDialogContent-root {
    padding: 20px 20px 20px 20px !important;
  }

  & .MuiDialogTitle-root {
  }

  & .MuiDialogActions-root {
    padding: 10px;
  }

  svg {
    color: #76CCB7;
  }
`
