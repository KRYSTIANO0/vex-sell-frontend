import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
//styles
import styles from '../../styles/menu-bar/MenuBar.module.css'
//icons
import { FaHome, FaPlusCircle, FaCommentDots, FaUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { userAction } from '../../store/slices/userSlice'

const MenuBar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const token = useSelector(state => state.user.token)

	const activeStyle = {
		color: '#BB86FC',
	}
	const logoutHandler = () => {
		dispatch(userAction.logout())
		navigate('/')
	}
	return (
		<menu className={styles['menu-bar']}>
			<ul className={styles['menu-list']}>
				<li>
					<NavLink to='/' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
						<FaHome />
						<h1 className='grap-text'>home</h1>
					</NavLink>
				</li>
				{!!token && (
					<li>
						<NavLink to='/account' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
							<FaUser />
							<h1 className='grap-text'>acc</h1>
						</NavLink>
					</li>
				)}
				<li>
					<NavLink to={!!token ? '/add' : '/login'} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
						<FaPlusCircle className={styles['big']} />
						<h1 className='grap-text'>add</h1>
					</NavLink>
				</li>
				<li>
					<NavLink to='/messages' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
						<FaCommentDots />
						<h1 className='grap-text'>message</h1>
					</NavLink>
				</li>
				{!!token && (
					<li>
						<button onClick={logoutHandler}>
							<NavLink to='/'>
								<FiLogOut />
								<h1 className='grap-text'>logout</h1>
							</NavLink>
						</button>
					</li>
				)}
			</ul>
		</menu>
	)
}

export default MenuBar
