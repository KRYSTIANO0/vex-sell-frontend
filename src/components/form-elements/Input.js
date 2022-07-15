import React, { useEffect, useReducer } from 'react'
import { validate } from '../../utils/validators'
//styles
import styles from '../../styles/form-elements/Input.module.css'
const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
			}
		case 'TOUCH': {
			return {
				...state,
				isTouched: true,
			}
		}
	}
}
const Input = props => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: '',
		isValid: false,
		isTouched: false,
	})

	const { id, onInput } = props
	const { value, isValid } = inputState

	useEffect(() => {
		onInput(id, value, isValid)
	}, [id, value, isValid, onInput])

	const onChangeHandler = e => {
		dispatch({ type: 'CHANGE', val: e.target.value, validators: props.validators })
	}
	const onBlurHandler = () => {
		dispatch({ type: 'TOUCH' })
	}

	let element

	if (props.element === 'input') {
		element = (
			<input
				id={props.id}
				value={inputState.value}
				type={props.type}
				placeholder={props.placeholder}
				onBlur={onBlurHandler}
				onChange={onChangeHandler}
				autoComplete='off'
			/>
		)
	}
	if (props.element === 'textarea') {
		element = (
			<textarea
				id={props.id}
				onBlur={onBlurHandler}
				value={inputState.value}
				onChange={onChangeHandler}
				rows={10}></textarea>
		)
	}
	if (props.element === 'select') {
		element = (
			<select
				id={props.id}
				value={inputState.value}
				onBlur={onBlurHandler}
				onChange={onChangeHandler}
				options={props.options}>
				{props.children}
			</select>
		)
	}

	const filledInputClass = !!inputState.value ? 'filled-input' : ''
	const textareaLabelClass = props.element === 'textarea' ? 'textarea-label' : ''
	const selectLabelClass = props.element === 'select' ? 'select-label' : ''
	return (
		<div className={styles['container']}>
			<div className={`${styles['input-div']} ${styles[filledInputClass]}`}>
				{element}
				<label
					className={`${styles['input-label-ui']} ${styles[textareaLabelClass]} ${styles[selectLabelClass]} `}
					htmlFor={props.id}>
					<span>{props.label}</span>
				</label>
			</div>
			{!inputState.isValid && inputState.isTouched && <p className={styles['error-text']}>{props.errorText}</p>}
		</div>
	)
}

export default Input
