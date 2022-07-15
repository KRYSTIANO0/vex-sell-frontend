import React from 'react'
import { useNavigate } from 'react-router-dom'
//styles
import styles from '../../styles/announcement-detail/Creator.module.css'
//components
import Card from '../UI-elements/Card'
import Button from '../form-elements/Button'
//redux
import { useSelector } from 'react-redux'
const Creator = ({ name, id: creatodId }) => {
	const user = useSelector(state => state.user)
	const navigate = useNavigate()

	const creatorIsUser = creatodId === user.userId

	const messageClickHandler = () => {
		if (user.token) {
			navigate('/messages')
		} else {
			navigate('/login')
		}
	}

	return (
		<Card>
			<div className={styles['creator-container']}>
				{creatorIsUser ? (
					<>
						<div className='title-text'>this is your announcement!</div>
					</>
				) : (
					<>
						<div className={styles['creator-info']}>
							<img src='https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg' alt='user' />
							<h1>{name}</h1>
						</div>
						<div className={styles['creator-action']}>
							<Button onClick={messageClickHandler}>message</Button>
							<h1 />
							<Button>phone</Button>
						</div>
					</>
				)}
			</div>
		</Card>
	)
}

export default Creator
