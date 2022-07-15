import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
//components
import AnnouncementsList from '../components/home/announcements/AnnouncementsList'
import Card from '../components/UI-elements/Card'
//hooks
import useHttp from '../hooks/useHttp'
const CategoryAnnouncements = () => {
	const navigate = useNavigate()
	const category = useParams().category

	const { sendRequest, isLoading, error, clearError } = useHttp()

	const [categoryAnnouncements, setCategoryAnnouncements] = useState()

	useEffect(() => {
		const getCategoryAnnouncements = async () => {
			try {
				const responseData = await sendRequest(`/api/announcement/category/${category}`)
				setCategoryAnnouncements(responseData.announcements)
			} catch (error) {
				console.log(error)
			}
		}
		getCategoryAnnouncements()
	}, [])

	const onClickHandler = () => {
		clearError()
		navigate('/')
	}
	return (
		<Card>
			<h1 className='title-text'>{category} announcements</h1>
			<AnnouncementsList
				announcements={categoryAnnouncements}
				isLoading={isLoading}
				error={error}
				clearError={onClickHandler}
			/>
		</Card>
	)
}

export default CategoryAnnouncements
