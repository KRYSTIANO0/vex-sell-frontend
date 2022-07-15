import { createSlice } from '@reduxjs/toolkit'

const initialUserState = {
	token: '',
	name: '',
	email: '',
	userId: '',
	expirationDate: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {
		login(state, action) {
			const tokenExpirationDate = action.payload.expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
			state.name = action.payload.name
			state.email = action.payload.email
			state.token = action.payload.token
			state.userId = action.payload.userId
			state.expirationDate = tokenExpirationDate.toISOString()
			localStorage.setItem(
				'userData',
				JSON.stringify({
					userId: action.payload.userId,
					token: action.payload.token,
					name: action.payload.name,
					email: action.payload.email,
					expiration: tokenExpirationDate.toISOString(),
				})
			)
		},
		logout(state) {
			state.name = null
			state.token = null
			state.email = null
			state.expirationDate = null
			localStorage.removeItem('userData')
		},
	},
})

export const userAction = userSlice.actions
