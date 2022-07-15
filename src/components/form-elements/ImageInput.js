import React, { useEffect, useRef, useState } from 'react'
//styles
import styles from '../../styles/form-elements/ImageInput.module.css'
//components
import Button from '../form-elements/Button'
const ImageInput = props => {
	const [file, setFile] = useState()
	const [isValid, setIsValid] = useState(false)
	const [previewUrl, setPreviewUrl] = useState()

	const fileRef = useRef()
	const { id, onInput } = props
	useEffect(() => {
		onInput(id, file, isValid)
		if (!file) {
			return
		}
		const fileReader = new FileReader()
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result)
		}
		fileReader.readAsDataURL(file)
	}, [file])

	const pickedHandler = e => {
		let pickedFile
		let fileIsValid = isValid
		if (e.target.files && e.target.files.length === 1) {
			pickedFile = e.target.files[0]
			setFile(pickedFile)
			setIsValid(true)
			fileIsValid = true
		} else {
			setIsValid(false)
			fileIsValid = false
		}
		onInput(id, pickedFile, fileIsValid)
	}
	const pickImageHandler = () => {
		fileRef.current.click()
	}

	return (
		<div className={styles['img-form']}>
			<input
				id={props.id}
				type='file'
				accept='.jpg,.png,.jpeg'
				ref={fileRef}
				onChange={pickedHandler}
				style={{ display: 'none' }}
			/>

			<div className={styles['input-controller']}>
				<div className={styles['img-preview']}>
					{previewUrl ? <img src={previewUrl} alt='Preview' /> : <p className='title-text'>↓choose image↓</p>}
				</div>
				<Button onClick={pickImageHandler}>pick image</Button>
			</div>
		</div>
	)
}

export default ImageInput
