import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
//components
import Loading from '../components/UI-elements/Loading'
import Error from '../components/UI-elements/Error'
import DetailContent from '../components/announcement-detail/DetailContent'
//hooks
import useHttp from '../hooks/useHttp'

const AnnouncementDetail = () => {
	const { sendRequest, isLoading, error, clearError } = useHttp()

	const navigate = useNavigate()
	const announcementId = useParams().aid
	const [announcement, setAnnouncement] = useState()

	useEffect(() => {
		const getAnnouncementById = async () => {
			try {
				const responseData = await sendRequest(`/api/announcement/${announcementId}`)
				setAnnouncement(responseData.announcement)
			} catch (error) {
				console.log(error)
			}
		}
		getAnnouncementById()
	}, [])
	const onClickHandler = () => {
		clearError()
		navigate('/')
	}
	return (
		<div>
			{isLoading && <Loading />}
			{error && <Error onClose={onClickHandler}>{error}</Error>}
			{!isLoading && !error && announcement && <DetailContent {...announcement} />}
		</div>
	)
}

export default AnnouncementDetail
