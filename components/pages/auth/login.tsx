import React from "react";

import { useRouter } from "next/router";

import { Link, Typography, Box } from "@mui/material";
import LoginForm from "modules/Login";

import { useAppDispatch } from 'store/hooks';
import { setSession } from "store/slices/app.slice";
import { setSelectedAccount } from "store/slices/auth.slice";
import Icon, { IconsType } from "shared/core/Icon";
import tagStyled from 'styled-components'
import Twitter from "./twitterlogin";
import Instagram from "./instagramlogin";
import Facebook from "./facebooklogin";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()

  const onRegister = () => {
    router.push("/register");
  };

  const onSuccess = async (data: any) => {
    dispatch(setSession(data.session))
    dispatch(setSelectedAccount(data.user))
    router.push('/home')
  };

  return (
    <LoginLayout>
        <LoginForm 
            key={'login_form'}
            apiEndpoint={`/Users/weblogin`}
            onAPICallSuccess={onSuccess}
        />
        <Typography 
            sx={{ 
                color: "#76CCB7", 
                textDecoration: "underline", 
                cursor:'pointer' ,
                ":hover": { color: "white" },
            }}
        >
            Forgot Password?
        </Typography>
        <Typography 
            sx={{ 
                color: "#76CCB7", 
            }}
        >
            Or Login With
        </Typography>
        <Box
            sx={{
                display:'flex',
                gap: '1.5rem'
            }}
        >
            {/* <Twitter /> */}
            {/* <Instagram /> */}
            <Facebook />
        </Box>
        <Typography 
            sx={{ 
                fontSize:'12px',
                color: "#76CCB7", 
                textDecoration: "underline", 
                cursor:'pointer' ,
                ":hover": { color: "white" },
            }}
            onClick={onRegister}
        >
            Register here
        </Typography>
        <Typography sx={{ color: "#76CCB7", textAlign:'center', marginTop: '3rem' }}>
            By using Zuvvii, you agree to the{" "}
            <Link
                href="https://www.zuvvii.com/terms-of-service"
                color="rgb(255,255,255)"
                sx={{
                    textDecorationColor: "#76CCB7",
                    color: "#76CCB7",
                    ":hover": { color: "white" },
                }}
                >
                Zuvvii&apos;s Terms of Service
            </Link>{" "}
            <br />
            and the
            <Link
                href="https://www.zuvvii.com/privacy-policy"
                color="rgb(255,255,255)"
                sx={{
                    textDecorationColor: "#76CCB7",
                    color: "#76CCB7",
                    ":hover": { color: "white" },
                }}
            >
                {" "}
                Zuvvii&apos;s Privacy Policy
            </Link>
            .
        </Typography>
    </LoginLayout>
  );
};

export default LoginPage;

const LoginLayout = tagStyled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
`