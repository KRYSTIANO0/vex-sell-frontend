import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
//styles
import styles from '../../../styles/home/categories/CategorySlider.module.css'
import 'swiper/css'
import data from '../../../data/categories.json'

const CategorySlider = () => {
	return (
		<div>
			<Swiper slidesPerView={4}>
				{data.categories.map(category => {
					const { name, id, color, image } = category
					return (
						<SwiperSlide key={id} className={styles['category-item']}>
							<Link to={`/category/${name}`}>
								<div className={styles['category-icon']} style={{ backgroundColor: color }}>
									<img src={image} alt={name} />
								</div>
								<p className='grap-text'>{name}</p>
							</Link>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</div>
	)
}

export default CategorySlider
