import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
    selectPaper : {
        "& .MuiPaper-root" : {
            borderRadius : '5px !important',
            "&::-webkit-scrollbar-track" : {
                marginTop : '5px',
                marginBottom : '5px'
            },
        },
        "& .MuiList-root" : {
            backgroundColor : '#313131 !important',
            padding : '0px !important',
        },
        "& .MuiMenuItem-root" : {
            borderBottom : '1px solid #3A3A3A !important',
            "&:last-child" : {
                borderBottom : 'none !important',
            },
            paddingTop : '10px !important',
            paddingBottom : '10px !important',
            background : "#313131 !important",
            color : "white !important",
            fontSize : 18,
        },
       "& .MuiBackdrop-root" : {
           background : 'transparent !important'
       }
    }
}));