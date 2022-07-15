import { userAction } from '../store/slices/userSlice'
//redux
import { useDispatch, useSelector } from 'react-redux'
const useAuth = () => {
	const dispatch = useDispatch()

	const user = useSelector(state => state.user)
	const { token, expirationDate } = user
	let logOutTimer

	const autoLogin = () => {
		const storedData = JSON.parse(localStorage.getItem('userData'))
		if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
			dispatch(
				userAction.login({
					userId: storedData.userId,
					token: storedData.token,
					email: storedData.email,
					name: storedData.name,
					expirationDate: new Date(storedData.expiration),
				})
			)
		}
	}
	const autoLogout = () => {
		if (token && expirationDate) {
			const remainingTime = new Date(expirationDate).getTime() - new Date().getTime()
			logOutTimer = setTimeout(dispatch(userAction.logout), remainingTime)
		} else {
			clearTimeout(logOutTimer)
		}
	}

	return { autoLogin, autoLogout }
}

export default useAuth
