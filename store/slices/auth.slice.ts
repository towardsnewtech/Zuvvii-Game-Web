import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { eraseCookie } from 'shared/helper/tokens'
import { RootState } from 'store'
import { IUser } from 'types/interfaces'

type AuthState = {
  account: IUser | null,
}

const initialState: AuthState = {
  account: null,
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedAccount: (state, action: PayloadAction<IUser>) => {
      const singleUser = action.payload
      state.account = singleUser
    },
    logout: state => {
      eraseCookie('session')
      state.account = null
    }
  }
})

// actions
export const {
  setSelectedAccount,
  logout
} = authSlice.actions

// selectors
export const selectUser = (state: RootState) => state.auth.account

export default authSlice.reducer
