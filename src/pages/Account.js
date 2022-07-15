import React from 'react'
//styles
import styles from '../styles/pages/Account.module.css'
//components
import AccountInfo from '../components/account/AccountInfo'
import UserAnnouncements from '../components/account/UserAnnouncements'
const Account = () => {
	return (
		<div className={styles['acc-container']}>
			<AccountInfo />
			<UserAnnouncements />
		</div>
	)
}

export default Account
