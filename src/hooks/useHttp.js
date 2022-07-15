import { useCallback, useState } from 'react'

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setIsError] = useState(false)

	const sendRequest = useCallback(async (uri, method = 'GET', headers = {}, body = null) => {
		setIsLoading(true)
		try {
			const response = await fetch(process.env.REACT_APP_BACKEND_URL + uri, {
				method,
				headers,
				body,
			})
			const responseData = await response.json()
			if (!response.ok) {
				throw new Error(responseData.message)
			}
			setIsLoading(false)
			return responseData
		} catch (error) {
			setIsLoading(false)
			setIsError(error.message || 'Something goes wrong, try later.')
			throw error
		}
	}, [])
	const clearError = () => {
		setIsError(null)
	}
	return { sendRequest, isLoading, error, clearError }
}

export default useHttp
