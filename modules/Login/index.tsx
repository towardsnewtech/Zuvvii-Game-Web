import React, { useState } from 'react'

import { useRouter } from "next/router";

import Form from 'shared/core/Form'
import useLoginForm from './useLoginForm'
import { loginValidation } from './validation'

import { LoadingButton } from "@mui/lab";
import Input from 'shared/core/Input';

import { toast } from 'react-toastify';
import SingleLoading from 'components/common/SingleLoading';

interface ILoginForm {
  apiEndpoint: string
  initialValues?: any
  onAPICallSuccess: (data?: any) => any
}

function LoginForm({
    apiEndpoint,
    initialValues,
    onAPICallSuccess,
}: ILoginForm) {
    const {
        create,
        isLoading,
        error,
    } = useLoginForm({
        apiEndpoint,
        onAPICallSuccess
    })
    
    const router = useRouter();

    const [username, setUserName] = useState<string | undefined>()
    const [password, setPassword] = useState('')

    const handleChangeUserName = (e: any) => {
        setUserName(e.target.value)
    }
    const handleChangePassword = (e: any) => {
        setPassword(e.target.value)
    }

    React.useEffect(() => {
        if(error) {
            toast.error(error as string)
        }
    }, [error])

    return (
        <Form
            onSubmit={async values => {
                create({
                    ...values,
                })
            }}
            validationSchema={loginValidation}
            initialValues={initialValues}
            gap={'2rem'}
        >
            <Input
                id={'username'}
                name='username'
                label={'User Name'}
                placeholder="username"
                value={username}
                onChange={handleChangeUserName}
                hookToForm
            />
            <Input
                id={'password'}
                name='password'
                label={"Password"}
                placeholder="password"
                type="password"
                value={password}
                onChange={handleChangePassword}
                hookToForm
            />
            <LoadingButton
                type="submit"
                loading={isLoading}
                loadingIndicator={<SingleLoading type='spin' size={30} />}
                sx={{
                    borderRadius: 40,
                    backgroundColor: "#65C5BA",
                    fontSize: 24,
                    color: "black",
                    ":hover": { backgroundColor: "#76D6CB" },
                }}
                fullWidth
            >
                LOGIN
            </LoadingButton>
        </Form>
  )
}

export default LoginForm
