import React, { useEffect, useState, useCallback } from 'react'
//styles
import styles from '../../styles/account/UserAccouncements.module.css'
//components
import AnnouncementsList from '../home/announcements/AnnouncementsList'
import Card from '../UI-elements/Card'
import Modal from '../UI-elements/Modal'
import Button from '../form-elements/Button'
//hooks
import useHttp from '../../hooks/useHttp'
//redux
import { useSelector } from 'react-redux'

const UserAnnouncements = () => {
	const user = useSelector(state => state.user)

	const { sendRequest, isLoading, error, clearError } = useHttp()

	const [userAnnouncements, setUserAnnouncements] = useState()
	const [deleteModal, setIsDeleteModal] = useState(false)
	const [announcementId, setAnnouncementId] = useState()
	const [useEffectFlag, setUseEffectFlag] = useState(false)

	useEffect(() => {
		const getUserAnnouncements = async () => {
			try {
				const responseData = await sendRequest(`/api/announcement/user/${user.userId}`)
				setUserAnnouncements(responseData.announcements)
			} catch (error) {
				console.log(error)
			}
		}
		getUserAnnouncements()
	}, [sendRequest, useEffectFlag, user.userId])

	const openDeleteModal = id => {
		setIsDeleteModal(true)
		setAnnouncementId(id)
	}
	const closeDeleteModal = () => {
		setIsDeleteModal(false)
		setAnnouncementId(null)
	}
	const deleteAnnouncement = async () => {
		try {
			await sendRequest(`/api/announcement/delete/${announcementId}`, 'DELETE', {
				Authorization: 'Bearer ' + user.token,
			})
			setIsDeleteModal(false)
			setUseEffectFlag(prevS => !prevS)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			<h1 className='title-text'>user announcements</h1>
			<Card>
				<AnnouncementsList
					announcements={userAnnouncements}
					isLoading={isLoading}
					error={error}
					clearError={clearError}
					openDeleteModal={openDeleteModal}
					type='userAnnouncements'
				/>
			</Card>
			{deleteModal && (
				<Modal onClose={closeDeleteModal} header='confirm delete'>
					<h1 className='grap-text' style={{ fontSize: '1.7rem', marginBottom: '1rem' }}>
						Are you sure?
					</h1>
					<div className={styles['confirm-delete-buttons']}>
						<Button onClick={deleteAnnouncement}>yes</Button>
						<h1 />
						<Button onClick={closeDeleteModal}>no</Button>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default UserAnnouncements
