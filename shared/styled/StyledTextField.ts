import {
    TextField,
    styled
} from '@mui/material';

export default styled(TextField)`
    & .MuiFormHelperText-root {
        font-size : 14px;
        font-weight : bold;
        text-align : left;
        width : 100%;
    }

    & .MuiFormControl-root  {
        background : #2a2d35;
        border-radius : 1rem;
    }

    & .MuiInputLabel-root {
        color: white !important;
        background: black !important;
        font-size: 1rem;
        margin-left: 1rem;
    }

    &.success {
        & .MuiFormHelperText-root {
            color : #bf1650;
        }
    }

    &.error {
        & .MuiFormHelperText-root {
            color: #bf1650;
        }
    }

    & .MuiOutlinedInput-root {
        svg {
            color : white;
        }
        
        & fieldset {
            border-color: none;
        }

        &:hover fieldset {
            border-color: none;
        }

        &.Mui-focused fieldset {
            border : none !important;
        }
    }

    & .MuiInputBase-input {
        color : white !important;
    }
`