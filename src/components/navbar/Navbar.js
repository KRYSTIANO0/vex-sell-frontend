import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
//styles
import styles from '../../styles/navabr/Navbar.module.css'
//components
import Button from '../form-elements/Button'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { userAction } from '../../store/slices/userSlice'
//icons
import { FaUser } from 'react-icons/fa'
const Navbar = () => {
	const token = useSelector(state => state.user.token)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onAddClick = () => {
		if (!!token) {
			navigate('/add')
		} else {
			navigate('/login')
		}
	}
	const logout = () => {
		dispatch(userAction.logout)
	}
	return (
		<nav className={styles['navbar']}>
			<div className='logo' id={styles['mobile-logo']}>
				VS
			</div>
			<div className={styles['desktop-navbar']}>
				<div className={styles['container']}>
					<Link to={'/'} className='logo' id={styles['desktop-logo']}>
						vex-sell
					</Link>
					<div className={styles['buttons-container']}>
						{!!token && (
							<Link to={'/account'}>
								<FaUser />
							</Link>
						)}
						<Button onClick={onAddClick}>add announcement</Button>
						{token && (
							<div className={styles['logout-div']}>
								<Button onClick={() => dispatch(userAction.logout())}>logout</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
