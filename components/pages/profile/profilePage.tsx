import * as React from 'react'
import { useAppSelector } from 'store/hooks'
import tagStyled from 'styled-components'
import Image from 'next/image'
import { StyledButton } from 'shared/styled'
import SwipeableViews from 'react-swipeable-views';

import {
    Tab,
    Tabs,
    Box
} from '@mui/material' ;
import AllClips from './allClips'

const avatarImage = require('public/assets/profile/avatar.png')

const ProfilePage = () => {
    const account = useAppSelector(
        state => state.auth.account
    )

    const [value, setValue] = React.useState(0)

    const handleChange = (_: any, newValue: number) => {
        setValue(newValue)
    }

    const handleChangeIndex = (index: number) => {
        setValue(index)
    };

    const a11yProps = (index: number) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        }
    }

    const TabPanel = (props: any) => {
        const { children, value, index, ...other } = props;
    
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
            {
                value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )
            }
            </div>
        )
    }

    return (
        <ProfileLayout>
            <BrandLayout>
                <UserName>{ account?.userName }</UserName>
                <Information>
                    <Unit>
                        <Value>
                            { account?.clipCount }
                        </Value>
                        <Label>
                            Clips
                        </Label>
                    </Unit>
                    <Unit>
                        <Value>
                            { account?.followers }
                        </Value>
                        <Label>
                            Followers
                        </Label>
                    </Unit>
                    <Unit>
                        <Image src={avatarImage} width={80} height={80} alt='not found image' style={{
                            borderRadius: '50%'
                        }} />
                    </Unit>
                    <Unit>
                        <Value>
                            { account?.following }
                        </Value>
                        <Label>
                            Followers
                        </Label>
                    </Unit>
                    <Unit>
                        <Value>
                            { account?.likes }
                        </Value>
                        <Label>
                            Likes
                        </Label>
                    </Unit>
                </Information>
                <StyledButton
                    sx={{
                        mt: 4,
                        pt: 1,
                        pb: 1,
                        pr: 2,
                        pl: 2
                    }}
                >
                    Edit Profile
                </StyledButton>
                <TabsHeader>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#76CCB7",
                                height: '0.3rem'
                            }
                        }}
                    >
                        <Tab label="Clips" {...a11yProps(0)} />
                        <Tab label="Tagged" {...a11yProps(1)} />
                        <Tab label="Likes" {...a11yProps(2)} />
                    </Tabs>
                </TabsHeader>
                <SwipeableViews
                    axis={'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
                        <AllClips />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AllClips />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <AllClips />
                    </TabPanel>
                </SwipeableViews>
            </BrandLayout>
        </ProfileLayout>
    )
}

export default ProfilePage

const ProfileLayout = tagStyled.div`

`
const BrandLayout = tagStyled.div`
    background: #1A1818;
    color: white;
    padding-top: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Information = tagStyled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 2rem;
    width: 960px;
`
const UserName = tagStyled.p`
    padding: 0px;
    margin: 0px;
    font-size: 2rem;
    font-weight: bold;
    font-family: poppins;
    width: 960px;
`

const Value = tagStyled.p`
    padding: 0px;
    margin: 0px;
    font-size: 1.5rem;
    font-family: poppins;
    font-weight: bold;
`

const Unit = tagStyled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
`

const Label = tagStyled.div`
    font-family: poppins;
`

const TabsHeader = tagStyled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 3rem;

    & .MuiTabs-root {
        width: 100%;
        & .MuiTabs-flexContainer {
            width: 100% !important;
            justify-content: space-between;

            & .MuiTab-root {
                font-size: 2rem;
                text-transform: capitalize;
                color: #D7D7D7;
                font-weight: bold;
                padding-bottom: 2rem !important;
            }

            & .Mui-selected {
                color: white !important;
                text-transform: capitalize;
            }
        }
    }
    
`