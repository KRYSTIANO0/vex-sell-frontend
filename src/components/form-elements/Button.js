import React from 'react'
//styles
import styles from '../../styles/form-elements/Button.module.css'
const Button = props => {
	return (
		<button
			className={`${styles['button-ui']} ${props.className}`}
			type={props.type || 'button'}
			onClick={props.onClick}
			disabled={props.disabled}>
			<p className='title-text'>{props.children}</p>
		</button>
	)
}

export default Button
