import React from 'react'
//styles
import styles from '../../../styles/home/announcements/AnnouncementList.module.css'
//components
import AnnouncementItem from './AnnouncementItem'
import Loading from '../../UI-elements/Loading'
import Error from '../../UI-elements/Error'

const AnnouncementsList = ({ isLoading, error, clearError, announcements, openDeleteModal, type }) => {
	return (
		<ul className={styles['announcement-list']}>
			{isLoading && <Loading />}

			{error && <Error onClose={clearError}>{error}</Error>}

			{announcements &&
				!isLoading &&
				!error &&
				announcements.map(announcement => {
					return (
						<AnnouncementItem key={announcement._id} {...announcement} openDeleteModal={openDeleteModal} type={type} />
					)
				})}
		</ul>
	)
}

export default AnnouncementsList
