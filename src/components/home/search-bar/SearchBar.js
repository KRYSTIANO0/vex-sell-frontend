import React, { useState } from 'react'
import { Link } from 'react-router-dom'

//styles
import styles from '../../../styles/home/search-bar/SearchBar.module.css'
const SearchBar = () => {
	const [searchValue, setSearchValue] = useState('')

	const onChangeSearch = e => {
		setSearchValue(e.target.value)
	}

	const filledFormClass = !!searchValue ? 'filled-form' : ''

	return (
		<div className={styles[`container`]}>
			<div className={`${styles['form']} ${styles[filledFormClass]}`}>
				<input id='search-input' type='text' autoComplete='off' value={searchValue} onChange={onChangeSearch} />
				<label htmlFor='search-input'>
					<span>Search</span>
				</label>
			</div>

			<Link to={`/announcements?title=${searchValue}`}>
				<h1 className='grap-text'>search</h1>
			</Link>
		</div>
	)
}

export default SearchBar
