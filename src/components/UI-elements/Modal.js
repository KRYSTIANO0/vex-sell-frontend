import React from 'react'
import ReactDOM from 'react-dom'
//styles
import styles from '../../styles/UI-elements/Modal.module.css'

const ModalContent = props => {
	return (
		<div className={styles['modal']}>
			<div>
				<header>
					<h1 className='title-text'>{props.header}</h1>
				</header>
				<div className={styles['content']}>{props.children}</div>
			</div>
		</div>
	)
}

const Modal = props => {
	return ReactDOM.createPortal(<ModalContent {...props} />, document.getElementById('modal-root'))
}

export default Modal
