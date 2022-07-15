import React, { useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
//styles
import './styles/global/global.css'
//components
import Navbar from './components/navbar/Navbar'
import MenuBar from './components/menu-bar/MenuBar'
import Loading from './components/UI-elements/Loading'
//redux
import { useSelector } from 'react-redux'
//hooks
import useAuth from './hooks/useAuth'
//pages
const Home = React.lazy(() => import('./pages/Home'))
const Auth = React.lazy(() => import('./pages/Auth'))
const Messages = React.lazy(() => import('./pages/Messages'))
const NewAnnouncement = React.lazy(() => import('./pages/NewAnnouncement'))
const Account = React.lazy(() => import('./pages/Account'))
const CategoryAnnouncements = React.lazy(() => import('./pages/CategoryAnnouncements'))
const AnnouncementDetail = React.lazy(() => import('./pages/AnnouncementDetail'))
const SearchAnnouncements = React.lazy(() => import('./pages/SearchAnnouncements'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const App = () => {
	const user = useSelector(state => state.user)
	const { token } = user

	const { autoLogin, autoLogout } = useAuth()

	//auto login
	useEffect(() => {
		autoLogin()
	}, [])
	//auto logout
	useEffect(() => {
		autoLogout()
	}, [token])

	//protected routes
	const routes = (
		<>
			<Route path='/' element={<Home />} exact />
			<Route path='/login' element={<Auth />} exact />
			<Route path='/category/:category' element={<CategoryAnnouncements />} exact />
			<Route path='/products/:aid' element={<AnnouncementDetail />} exact />
			<Route path='/announcements' element={<SearchAnnouncements />} exact />
			<Route path='/messages' element={<Messages />} exact />
		</>
	)
	const protectedRoutes = (
		<>
			<Route path='/account' element={<Account />} exact />
			<Route path='/add' element={<NewAnnouncement />} exact />
		</>
	)
	return (
		<main>
			<Navbar />
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path='*' element={<NotFound />} />
					{routes}

					{!!token && protectedRoutes}
				</Routes>
			</Suspense>
			<MenuBar />
		</main>
	)
}

export default App
