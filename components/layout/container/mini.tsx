import { Box } from "@mui/system";
import Head from "next/head";
import Image from "next/image";
import React, { ReactNode } from "react";
import logo from "public/assets/logo_dark.png";
import { ILayout } from "../types";

const MiniLayout = ({ children, pageTitle, showMeta }: ILayout) => {
  return (
    <React.Fragment>
        <Head>
        <title>{pageTitle}</title>
      </Head>
      <Box
        sx={{
            background:'black',
            minHeight : '100vh',
            width : '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems : 'center',
            overflow:'hidden'
        }}
        >
        <Box
            sx={{
            display: 'flex',
            justifyContent : 'flex-start',
            width: '100vw',
            paddingTop: '5rem',
            paddingBottom : '4rem',
            }}
        >
            <Image 
            style={{
                paddingLeft: '2rem'
            }}
            src={logo} alt="logo" 
            width={220}
            height={40}
            />
        </Box>
        {children}
        </Box>
    </React.Fragment>
  );
};

export default MiniLayout;
