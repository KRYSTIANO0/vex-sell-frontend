import React from 'react'
//styles
import styles from '../../styles/UI-elements/Loading.module.css'
const Loading = () => {
	return (
		<div className={styles['lds-roller']}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Loading
