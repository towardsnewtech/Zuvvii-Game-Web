import { Box } from "@mui/system";
import React, { ReactNode, useState } from "react";
import tagStyled from 'styled-components'
import Icon from "shared/core/Icon";
import { StyledTextField } from "shared/styled";
import { InputAdornment } from "@mui/material";

interface Props {
  children?: ReactNode;
}

const BaseHeader = ({ children }: Props) => {
  const [selectedOption, setSelectedOption] = useState(0)
  const [toggleSearchbar, setToggleSearchbar] = useState(false)

  return (
    <>
      {
        !toggleSearchbar ? <SelectOptions>
          <Option
            className={`${selectedOption == 0 && "active"}`}
            onClick={() => setSelectedOption(0)}
          >
            For You
          </Option>
          <Divider />
          <Option
            className={`${selectedOption == 1 && "active"}`}
            onClick={() => setSelectedOption(1)}
          >
            Following
          </Option>
          <Box
            sx={{
              position:'absolute',
              right: 30,
              top: 0
            }}
          >
            <Icon name='search' color={"rgba(217, 217, 217, 0.58)"} size={40}
              onClick={() => setToggleSearchbar(!toggleSearchbar)}
            />
          </Box>
        </SelectOptions> : <SearchBar>
          <StyledTextField 
            placeholder="Search for a friend or a game...."
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                      <Icon name='search' color={"rgba(217, 217, 217, 0.58)"} size={40} />
                  </InputAdornment>
              ),
              endAdornment: (
                  <InputAdornment position="end">
                      <Icon name='close' color={"rgba(217, 217, 217, 0.58)"} size={40} onClick={() => setToggleSearchbar(!toggleSearchbar)}/>
                  </InputAdornment>
              ),
            }}
            sx={{
              width: '70%'
            }}
          />
        </SearchBar>
      }
    </>
  );
};

export default BaseHeader;

const SelectOptions = tagStyled.div`
  width : 100%;
  min-width : calc(100vw - 260px);
  display : flex;
  position : relative;
  justify-content: center;
  gap : 20px;
  color : rgba(217, 217, 217, 0.58);
  margin-top : 5rem;
  margin-bottom : 5rem;

  & .active {
    color : white;

    :after {
      content : "";
      position : absolute;
      width : 100%;
      left : 0px;
      bottom : -5px;
      height : 4px;
      background : white;
    }
  }
`

const Option = tagStyled.div`
  cursor : pointer;
  display: inline;
  margin-left: 1rem;
  font-size: 1.5rem;
  position : relative;
  margin-right : 10px;
  transition : 0.2s;
`

const Divider = tagStyled.div`
  height : 40px;
  width : 3px;

  background : rgba(217, 217, 217, 0.58);
`

const SearchBar = tagStyled.div`
  margin-top : 5rem;
  margin-bottom : 5rem;
  display: flex;
  justify-content: center;
  width: 100%
`