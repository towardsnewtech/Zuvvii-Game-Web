import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import http from 'services/http-common';
import { RootState } from 'store'
import { IGame } from 'types/interfaces'

interface GamesState {
    games: IGame[] | null;
}
const initialState: GamesState = {
    games: null
}

export const fetchGames = createAsyncThunk("game/fetchGames", async () => {
    const res: any = (await http.get('/games'))
  
    return res.data;
});
  
export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchGames.pending, (state) => {
        state.games = null;
    });
    addCase(fetchGames.fulfilled, (state, { payload }) => {
      state.games = payload;
    });
    addCase(fetchGames.rejected, (state, { error }) => {
        state.games = null;
      });   
  },
})

// actions
export const {
} = gameSlice.actions

// selectors
export const selectGames = (state: RootState) => state.game.games

export default gameSlice.reducer
