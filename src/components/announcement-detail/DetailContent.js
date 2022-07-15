import React from 'react'
//styles
import styles from '../../styles/announcement-detail/DetailContent.module.css'
//components
import Creator from './Creator'

const DetailContent = ({ _id, image, title, description, address, price, creator }) => {
	return (
		<>
			<div className={styles['detail-container']}>
				<div className={styles['detail-image']}>
					<img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt={title} />
				</div>
				<div className={styles['about']}>
					<p className='grap-text'>{address}</p>
					<h2 className={styles['title']}>{title}</h2>
					<h1 className={styles['price-text']}>{price} zł</h1>

					<div className={styles['description']}>
						<h1 className='title-text'>description</h1>
						<p className='grap-text'>{description}</p>
					</div>
				</div>
			</div>
			<div className={styles['creator']}>
				<h1 className='title-text'>creator</h1>
				<Creator {...creator} />
			</div>
		</>
	)
}

export default DetailContent
