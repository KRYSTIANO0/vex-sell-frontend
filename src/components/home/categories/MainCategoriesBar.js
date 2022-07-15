import React from 'react'
//components
import CategorySlider from './CategorySlider'
import Card from '../../UI-elements/Card'
const MainCategoriesBar = () => {
	return (
		<Card>
			<h1 className='title-text'>main categories</h1>
			<CategorySlider />
		</Card>
	)
}

export default MainCategoriesBar
