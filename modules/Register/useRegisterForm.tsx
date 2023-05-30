import { useState } from 'react'
import { useMutation } from 'react-query'
import http from '../../services/http-common'

interface ILoginForm {
  apiEndpoint: string
  onAPICallSuccess: (data?: any) => any
}

function useRegisterForm({ onAPICallSuccess, apiEndpoint }: ILoginForm) {
    const { mutate, error, isLoading } = useMutation({
        mutationFn: async ({
            userName,
            firstName,
            lastName,
            emailAddress,
            passHash,
            passhash2
        }: {
            userName: string,
            firstName: string,
            lastName: string,
            emailAddress: string,
            passHash: string,
            passhash2: string
        }) => {
            const res: any = await http.post(apiEndpoint, {
                userName,
                firstName,
                lastName,
                emailAddress,
                passHash,
                passhash2
            })

            if(res.err) {
                throw (res.err.response.data)
            }

            onAPICallSuccess()

            return 
        }
    })

    return {
        create: mutate,
        error: error ? (error as Error).message : null,
        isLoading: isLoading,
    }
}

export default useRegisterForm

