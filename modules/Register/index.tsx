import * as React from "react";

import { useRouter } from "next/router";

import {
    Box,
    Checkbox,
    FormControlLabel,
    Typography,
    Link
} from "@mui/material";

import Form from 'shared/core/Form'
import Icon, { IconsType } from "shared/core/Icon";
import Input from "shared/core/Input";

import useRegisterForm from "./useRegisterForm";
import { registerValidation } from './validation'

import { LoadingButton } from "@mui/lab";
import SingleLoading from "components/common/SingleLoading";
import { toast } from 'react-toastify';

interface IRegisterForm {
  apiEndpoint: string
  initialValues?: any
  onAPICallSuccess: (data?: any) => any
}

function RegisterForm({
    apiEndpoint,
    initialValues,
    onAPICallSuccess,
}: IRegisterForm) {
    const {
        // for register
        create,
        isLoading,
        error,
    } = useRegisterForm({
        apiEndpoint,
        onAPICallSuccess
    })

    const loginOptions = [
        {
          iconName : 'twitter',
          color: '#55ACEE'
        },
        {
          iconName: 'instagram',
          color: 'purple'
        },
        {
          iconName: 'facebook',
          color: '#1877F2'
        }
    ]
    
    const router = useRouter();

    const onLogin = () => {
        router.push("/home");
    };

    React.useEffect(() => {
        if(error) {
            toast.error(error as string)
        }
    }, [error])

    return (
        <Form
            onSubmit={async values => {
                console.log(values)
                create({
                    ...values,
                })
            }}
            validationSchema={registerValidation}
            initialValues={initialValues}
            gap={'1rem'}
        >
            <Input
                placeholder="Username"
                name="userName"
                id="userName"
                label={"User Name"}
                hookToForm
            />
            <Input
                placeholder="First Name"
                id={"firstName"}
                name="firstName"
                label={"First Name"}
                hookToForm
            />
            <Input
                placeholder="Last Name"
                id={"lastName"}
                name="lastName"
                label={"Last Name"}
                hookToForm
            />
            <Input
                placeholder="Email"
                id={"emailAddress"}
                name="emailAddress"
                label={"Email"}
                hookToForm
            />
            <Input
                type="password"
                id={"passHash"}
                name={"passHash"}
                label={"Password"}
                placeholder="Password"
                hookToForm
            />
            <Input
                type="password"
                name="passHash2"
                label={"Re Password"}
                id="passHash2"
                placeholder="Re-Enter Password"
                hookToForm
            />
            <Typography 
                sx={{ 
                    color: "#76CCB7", 
                    cursor: "pointer",
                    ":hover": {
                    color: 'white'
                    }
                }}
                onClick={onLogin}
                >
                <span style={{color: "#C7B0B0"}}>Already a user?</span> &nbsp;Login
            </Typography>
            <Typography 
                sx={{ 
                    color: "#76CCB7", 
                }}
                >
                Register with social accounts
            </Typography>
            <Box
                sx={{
                display:'flex',
                gap: '1.5rem'
                }}
            >
                {
                loginOptions.map((option, index) => (
                    <Icon key={index} name={option.iconName as IconsType} color={option.color} bgColor="white" rounded={true}/>
                ))
                }
            </Box>
            <FormControlLabel
                control={
                <Checkbox
                    sx={{
                    color: "#76CCB7",
                    mt: "20px",
                    }}
                />
                }
                label={
                <Typography sx={{ color: "#76CCB7" }}>
                    By checking this box you agree to both the{" "} <br/>
                    <Link
                    href="https://www.zuvvii.com/terms-of-service"
                    color="rgb(255,255,255)"
                    sx={{ 
                        textDecorationColor: "#76CCB7",
                        color :"#76CCB7",
                        fontSize:'1.25rem',
                        ":hover" : {
                        color : 'white'
                        }
                    }}
                    >
                    TOS
                    </Link>{" "}
                    and our{" "}
                    <Link
                        href="https://www.zuvvii.com/privacy-policy"
                        color="rgb(255,255,255)"
                        sx={{ 
                            textDecorationColor: "#76CCB7", 
                            color :"#76CCB7" ,
                            fontSize:'1.25rem',
                            ":hover" : {
                            color : 'white'
                            }
                        }}
                    >
                    {" "}
                    Privacy Policy
                    </Link>
                </Typography>
                }
            />
            <LoadingButton
                type="submit"
                loading={isLoading}
                loadingIndicator={<SingleLoading type="spin" size={40} />}
                sx={{
                borderRadius: 20,
                backgroundColor: "#65C5BA",
                fontSize: 24,
                paddingLeft: 3,
                paddingRight : 3,
                marginBottom: 5,
                color: "black",
                ":hover": { backgroundColor: "#76D6CB" },
                }}
            >
                Submit
            </LoadingButton>
        </Form>
  )
}

export default RegisterForm
