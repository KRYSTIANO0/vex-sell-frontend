import React from 'react'
import { useNavigate } from 'react-router-dom'
//validators
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../utils/validators'
//styles
import styles from '../styles/pages/NewAnnouncement.module.css'
//components
import Input from '../components/form-elements/Input'
import Button from '../components/form-elements/Button'
import ImageInput from '../components/form-elements/ImageInput'
import Loading from '../components/UI-elements/Loading'
import Error from '../components/UI-elements/Error'
//hooks
import useForm from '../hooks/useForm'
import useHttp from '../hooks/useHttp'
//data
import data from '../data/categories.json'
//redux
import { useSelector } from 'react-redux'

const NewAnnouncement = () => {
	const navigate = useNavigate()
	const user = useSelector(state => state.user)

	const { isLoading, sendRequest, error, clearError } = useHttp()
	const { formState, inputHandler } = useForm(
		{
			title: {
				value: '',
				isValid: false,
			},
			address: {
				value: '',
				isValid: false,
			},
			price: {
				value: 0,
				isValid: false,
			},
			category: {
				value: '',
				isValid: false,
			},
			image: {
				value: null,
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
		},
		false
	)

	const onAddAnnouncementHandler = async e => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('title', formState.inputs.title.value)
		formData.append('description', formState.inputs.description.value)
		formData.append('address', formState.inputs.address.value)
		formData.append('category', formState.inputs.category.value)
		formData.append('price', formState.inputs.price.value)
		formData.append('image', formState.inputs.image.value)
		formData.append('creator', user.userId)

		try {
			await sendRequest(
				'/api/announcement/new-announcement',
				'POST',
				{ Authorization: 'Bearer ' + user.token },
				formData
			)
			navigate('/account')
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className={styles['new-announcement-container']}>
			<h1 className='title-text'>add announcement</h1>
			<div className={styles['form-container']}>
				<form onSubmit={onAddAnnouncementHandler}>
					<Input
						id='title'
						element='input'
						type='text'
						label='Title'
						errorText='Please enter a valid title.'
						onInput={inputHandler}
						validators={[VALIDATOR_REQUIRE()]}
					/>
					<Input
						id='address'
						element='input'
						type='text'
						label='Address'
						errorText='Please enter a valid address.'
						onInput={inputHandler}
						validators={[VALIDATOR_REQUIRE()]}
					/>
					<Input
						id='price'
						element='input'
						type='number'
						label='Price [zł]'
						errorText='Please enter a valid price.'
						onInput={inputHandler}
						validators={[VALIDATOR_REQUIRE()]}
					/>
					<Input
						id='category'
						element='select'
						onInput={inputHandler}
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid categpry.'
						label='Category'>
						{data.categories.map(option => (
							<option key={option.id} value={option.name}>
								{option.name}
							</option>
						))}
					</Input>
					<ImageInput id='image' onInput={inputHandler} />
					<Input
						id='description'
						element='textarea'
						type='text'
						label='Description'
						errorText='Please enter a valid description. (10 characters required)'
						onInput={inputHandler}
						validators={[VALIDATOR_MINLENGTH(10)]}
					/>
					{error && <Error clearError={clearError} />}
					<Button disabled={!formState.isValid} type='submit'>
						{isLoading ? <Loading /> : 'add'}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default NewAnnouncement
