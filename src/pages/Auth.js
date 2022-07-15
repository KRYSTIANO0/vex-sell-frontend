import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//validators
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../utils/validators'
//styles
import styles from '../styles/pages/Auth.module.css'
//components
import Input from '../components/form-elements/Input'
import Button from '../components/form-elements/Button'
import Loading from '../components/UI-elements/Loading'
import Error from '../components/UI-elements/Error'
//redux
import { useDispatch } from 'react-redux'
import { userAction } from '../store/slices/userSlice'
//hooks
import useForm from '../hooks/useForm'
import useHttp from '../hooks/useHttp'

const Auth = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { sendRequest, isLoading, error, clearError } = useHttp()
	const { formState, inputHandler, setFormData } = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	)

	const [isLoginMode, setIsLoginMode] = useState(true)

	const toggleMode = () => {
		clearError()
		if (!isLoginMode) {
			setFormData(
				{ ...formState.inputs, name: undefined },
				formState.inputs.email.isValid && formState.inputs.password.isValid
			)
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
				},
				false
			)
		}
		setIsLoginMode(prevState => !prevState)
	}

	const onSubmitHandler = async e => {
		e.preventDefault()
		if (isLoginMode) {
			try {
				const responseData = await sendRequest(
					'/api/user/login',
					'POST',
					{
						'Content-Type': 'application/json',
					},
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					})
				)
				dispatch(
					userAction.login({
						userId: responseData.userId,
						token: responseData.token,
						email: responseData.email,
						name: responseData.name,
					})
				)
				navigate('/')
			} catch (error) {
				console.log(error)
			}
		} else {
			try {
				const responseData = await sendRequest(
					'/api/user/signup',
					'POST',
					{
						'Content-Type': 'application/json',
					},
					JSON.stringify({
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					})
				)
				dispatch(
					userAction.login({
						userId: responseData.userId,
						token: responseData.token,
						email: responseData.email,
						name: responseData.name,
					})
				)
				navigate('/')
			} catch (error) {
				console.log(error)
			}
		}
	}

	const underlineClass = isLoginMode ? 'underline' : ''
	return (
		<div className={styles['container']}>
			<div className={styles['content']}>
				<div className={`${styles['header']} ${styles[underlineClass]}`}>
					<button onClick={toggleMode} className={`title-text ${isLoginMode && 'active'}`}>
						login
					</button>
					<button onClick={toggleMode} className={`title-text ${!isLoginMode && 'active'}`}>
						sign up
					</button>
				</div>
			</div>
			<form onSubmit={onSubmitHandler}>
				{!isLoginMode && (
					<Input
						id='name'
						element='input'
						type='text'
						label='Name'
						onInput={inputHandler}
						errorText='Please enter a valid name.'
						validators={[VALIDATOR_REQUIRE()]}
					/>
				)}
				<Input
					id='email'
					element='input'
					type='email'
					label='E-mail'
					onInput={inputHandler}
					errorText='Please enter a valid e-mail.'
					validators={[VALIDATOR_EMAIL()]}
				/>
				<Input
					id='password'
					element='input'
					type='password'
					label='Password'
					onInput={inputHandler}
					errorText='Please enter a valid password.(6 characters required).'
					validators={[VALIDATOR_MINLENGTH(6)]}
				/>
				{error && <Error onClose={clearError}>{error}</Error>}
				{isLoading ? (
					<Loading />
				) : (
					<Button disabled={!formState.isValid} type='submit'>
						{isLoginMode ? 'LOGIN' : 'SIGN IN'}
					</Button>
				)}
			</form>
		</div>
	)
}

export default Auth
