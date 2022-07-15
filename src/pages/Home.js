import React, { useEffect, useState } from 'react'
//styles

//components
import SearchBar from '../components/home/search-bar/SearchBar'
import MainCategoriesBar from '../components/home/categories/MainCategoriesBar'
import Card from '../components/UI-elements/Card'
import AnnouncementsList from '../components/home/announcements/AnnouncementsList'
//hooks
import useHttp from '../hooks/useHttp'
const Home = () => {
	const { isLoading, sendRequest, error, clearError } = useHttp()
	const [announcements, setAnnuncements] = useState()

	useEffect(() => {
		const getAnnouncements = async () => {
			try {
				const responseData = await sendRequest('/api/announcement/20-announcements')
				setAnnuncements(responseData.announcements)
			} catch (error) {}
		}
		getAnnouncements()
	}, [])
	return (
		<div>
			<SearchBar />
			<MainCategoriesBar />
			<Card>
				<h1 className='title-text'>announcements</h1>
				<AnnouncementsList isLoading={isLoading} announcements={announcements} error={error} clearError={clearError} />
			</Card>
		</div>
	)
}

export default Home
