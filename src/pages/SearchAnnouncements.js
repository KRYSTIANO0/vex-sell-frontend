import React, { useState, useEffect } from 'react'
//components
import Card from '../components/UI-elements/Card'
import AnnouncementsList from '../components/home/announcements/AnnouncementsList'

//hooks
import useQuery from '../hooks/useQuery'
import useHttp from '../hooks/useHttp'
const SearchAnnouncements = () => {
	const { sendRequest, isLoading, error, clearError } = useHttp()
	let query = useQuery()

	const [searchedAnnouncements, setSearchedAnnouncements] = useState()

	useEffect(() => {
		const getSearchedAnnouncements = async () => {
			try {
				const responseData = await sendRequest(`/api/announcement/search?title=${query.get('title')}`)
				setSearchedAnnouncements(responseData.announcements)
			} catch (error) {
				console.log(error)
			}
		}
		getSearchedAnnouncements()
	}, [])

	return (
		<Card>
			<h1 className='title-text'>
				found <p style={{ color: '#bb86fc', display: 'inline-block' }}>{searchedAnnouncements?.length}</p> announcements
			</h1>
			<AnnouncementsList
				announcements={searchedAnnouncements}
				isLoading={isLoading}
				error={error}
				clearError={clearError}
			/>
		</Card>
	)
}

export default SearchAnnouncements
