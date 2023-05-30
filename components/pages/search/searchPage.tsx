import * as React from 'react'
import { StyledTextField, useStyles } from 'shared/styled'
import { InputAdornment, MenuItem, Select } from '@mui/material'
import Icon from 'shared/core/Icon'
import tagStyled from 'styled-components'
import SearchGame from './searchGame'
import SearchFriend from './searchFriend'

const SearchPage  = () => {
    const classes = useStyles()

    const [searchTarget, setSearchTarget] = React.useState('game')
    const [searchKey, setSearchKey] = React.useState('')

    return (
        <SearchPageLayout>
            <SearchBar>
                <StyledTextField 
                    placeholder={`Search for ${searchTarget == 'game' ? "a game" : "a friend"}...`}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon name='search' color={"white"} size={40} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start">
                                <Select
                                    placeholder="Choose a game"
                                    sx={{
                                        color: "white",
                                        "& svg": {
                                            color: 'white'
                                        },
                                    }}
                                    MenuProps={{
                                        className : classes.selectPaper
                                    }}
                                    value={searchTarget}
                                    onChange={(event) => setSearchTarget(event.target.value)}
                                >
                                    <MenuItem value={'game'}>
                                        Game
                                    </MenuItem>
                                    <MenuItem value={'friend'}>
                                        Friend
                                    </MenuItem>
                                </Select>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: '70%',
                        border: '1px solid #313131',
                        borderRadius: '0.25rem'
                    }}
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
            </SearchBar>
            { searchTarget == 'game' && <SearchGame searchKey={searchKey} /> }
            { searchTarget == 'friend' && <SearchFriend searchKey={searchKey} /> }
        </SearchPageLayout>
    )
}

export default SearchPage

const SearchBar = tagStyled.div`
    display: flex;
    justify-content: center;
`

const SearchPageLayout = tagStyled.div`
    padding-top: 4rem;
`