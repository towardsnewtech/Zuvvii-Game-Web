import Loading from 'react-loading'

import { Box } from '@mui/material'

interface IProps {
    type: "spin" | "balls" | "bubbles" | "cubes" | "cylon" | "spinningBubbles" | "blank" | "spokes" | "bars"
    size: number
}
const SingleLoading = ({
    type,
    size
}: IProps) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 3,
                pb: 3
            }}
        >
            <Loading type={type} width={size} height={size}/>
        </Box>
    )
}

export default SingleLoading