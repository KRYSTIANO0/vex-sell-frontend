import React from 'react'
import styles from '../../styles/UI-elements/Error.module.css'
const Error = props => {
	return (
		<div className={styles['error-container']}>
			<p className={styles['error-text']}>{props.children}</p>
			<button className={styles['error-button']} onClick={props.onClose}>
				ok
			</button>
		</div>
	)
}

export default Error
