import React from 'react'
import { Link } from 'react-router-dom'
//styles
import styles from '../../../styles/home/announcements/AnnouncementItem.module.css'
//redux
import { useSelector } from 'react-redux'

const AnnouncementItem = ({ _id: id, title, address, price, image, creator, openDeleteModal, type }) => {
	const userId = useSelector(state => state.user.userId)

	const isUserAnnouncement = creator === userId

	return (
		<li className={styles['announcement-list-item']}>
			<Link to={`/products/${id}`} className={styles['announcement-item']}>
				<img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt={title} />
				<div className={styles['about']}>
					<div className={styles['info']}>
						<h1 className='grap-text'>{title}</h1>
						<h2 className={styles['price-text']}>{price} zł</h2>
					</div>
					<div className={styles['info']} id={styles['address-info']}>
						<h2 className='grap-text'>{address}</h2>
					</div>
				</div>
			</Link>
			{isUserAnnouncement && type === 'userAnnouncements' && (
				<div className={styles['delete-btn-container']}>
					<button onClick={() => openDeleteModal(id)} className={styles['delete-btn']}>
						delete
					</button>
				</div>
			)}
		</li>
	)
}

export default AnnouncementItem
