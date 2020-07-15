import React from 'react'
import Navbar from './navbar'
import Footer from './footer'


const Layout = ({ children }) => 
	<>
		<Navbar />
			<main>{ children }</main>
		<Footer />
	</>

export default Layout