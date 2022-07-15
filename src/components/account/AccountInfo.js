import React from 'react'
//styles
import styles from '../../styles/account/AccountInfo.module.css'
//redux
import { useSelector } from 'react-redux'
const AccountInfo = () => {
	const user = useSelector(state => state.user)
	return (
		<>
			{' '}
			<h1 className='title-text'>account</h1>
			<div className={styles['acc-info']}>
				<div className={styles['content']}>
					<div className={styles['about']}>
						<p className='grap-text'>name:</p>
						<h1 className='grap-text'>{user.name}</h1>
					</div>
					<div className={styles['about']}>
						<p className='grap-text'>emial:</p>
						<h1 className='grap-text'>{user.email}</h1>
					</div>
				</div>
			</div>
		</>
	)
}

export default AccountInfo
