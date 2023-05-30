import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch } from 'store/hooks'
import {
  logout,
} from 'store/slices/auth.slice'
import {
  setSessionExpired,
} from 'store/slices/app.slice'
import { getCookie } from 'shared/helper/tokens'

interface IWrapper {
  children: React.ReactNode
}

function Wrapper({ children }: IWrapper) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const checkIfSessionExpired = () => {
    const pathname = router.pathname

    if(!getCookie('session_id')) {
      dispatch(setSessionExpired())
      dispatch(logout())
      router.push('/login')
    } else {
      if(pathname == '/login' || pathname == '/register') {
        router.push('/home')
      }
    }
  }

  //update user on refresh
  useEffect(() => {
    checkIfSessionExpired()
  }, [dispatch])

  return <React.Fragment>{children}</React.Fragment>
}

export default Wrapper
