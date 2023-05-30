import { List, ListItem, Typography, styled, useRadioGroup } from "@mui/material";
import React, { useState } from "react";
import Icon, { IconsType } from "shared/core/Icon";
import Image from "next/image";
import logo from "public/assets/logo-transparent.svg";
import tagStyled from 'styled-components'
import { useRouter } from 'next/router'

interface SidebarItem {
    iconName : IconsType
    label : string,
    onClick : () => void
}

const Sidebar = () => {
    const router = useRouter()

    const sidebarList : Array<SidebarItem> = [
        {
            iconName : 'home',
            label : "Home",
            onClick : () => {
              router.push('/home')
            }
        },
        {
            iconName: "search",
            label : "Search",
            onClick : () => {
              router.push('/search')
            }
        },
        {
            iconName : "plus",
            label : "Add Clip",
            onClick : () => {
              router.push('/addclip')
            }
        },
        {
            iconName : "notify",
            label : "Notifications",
            onClick : () => {
                
            }
        },
        {
            iconName : "person",
            label : "Profile",
            onClick : () => {
              router.push('/profile')
            }
        },
        {
            iconName : "logout",
            label : "Logout", 
            onClick : () => {
                router.push("/login")
            }
        }
    ]

    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    const selectItem = (index: number) => {
        setSelectedIndex(index)
        sidebarList[index].onClick()
    }

  React.useEffect(() => {
    switch(router.pathname) {
      case '/home':
        setSelectedIndex(0)
        break
      case '/addclip': 
        setSelectedIndex(2)
        break
      case '/search': 
        setSelectedIndex(1)
        break
      case '/profile': 
        setSelectedIndex(4)
        break
      default:
        setSelectedIndex(0)
        break
    }
  }, [router.pathname])

  return (
      <StyledList
        sx={{
          background: "rgba(118, 204, 183, 0.08)",
        }}
      >
        <ListItem
          sx={{
            marginTop: 5,
          }}
        >
          <Image src={logo} alt="logo" />
        </ListItem>
        {sidebarList.map((item, index) => (
          <ListItem
            key={item.iconName}
            sx={{
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => selectItem(index)}
          >
            <Icon
              name={item.iconName}
              color={selectedIndex == index ? "#65C5BA" : "white"}
              size={35}
            />
            <Typography
              sx={{
                fontSize: "20px",
                cursor: "pointer",

                color: `${index == selectedIndex ? '#65C5BA' : 'white'}`
              }}
            >
              {item.label}
            </Typography>
          </ListItem>
        ))}
      </StyledList>
  );
};

export default Sidebar;

const StyledList = styled(List)`
  position: fixed;
  height: 100vh;
`;