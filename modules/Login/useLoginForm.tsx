import { useMutation } from 'react-query'
import http from '../../services/http-common'
import { setCookie } from 'shared/helper/tokens'

interface ILoginForm {
  apiEndpoint: string
  onAPICallSuccess: (data?: any) => any
}

function useLoginForm({ onAPICallSuccess, apiEndpoint }: ILoginForm) {
    const { mutate, isLoading, error } = useMutation({
        mutationFn: async ({
            username,
            password
        }: {
            username: string
            password: string
        }) => {
            
            let res: any = await http.post(apiEndpoint, {
                username,
                password
            })

            if(res.err) {
                throw (res.err.response.data)
            }

            const session = res.data

            res = await http.get(`/Users/${res.data.userId}`)
            const user = res.data

            setCookie("session_id", session.sessionId)
            
            onAPICallSuccess({
                session,
                user
            })

            return
        }
    })

    return {
        create: mutate,
        error: error || null,
        isLoading: isLoading
    }
}

export default useLoginForm

