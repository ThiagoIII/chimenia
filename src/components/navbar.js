import React from 'react'
import { useLocation } from "@reach/router"
import { Link, useStaticQuery, graphql } from 'gatsby'
import './navbar.css'


const Navbar = () => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					links
				}
			}
		}
	`)
	const { pathname } = useLocation()
	return (
		<>
		<nav>
			<ul id="navUl">
			{
				data.site.siteMetadata.links.map((link, index) => {
					{/* let href = window.location.href.endsWith('/'); */}
					let href = pathname.endsWith('/');

					if (href === true) { 		// if the page is the home page I dont want to render the Home link
						if(link === 'Home') {
							return null 			// dont render the Home link
						}
						else {					// render the other links		
							return 	<li key={index}><Link to={`/${link.toLowerCase()}/0`}>{link}</Link></li>										
						}
					} else {					//if is not the home page, render the home link
						if(link === 'Home') {
							return <li key={index}><Link to="/" >{link}</Link></li>
						}
						else {
							return null
						}
					}
				}) //end of map method
			}
			</ul> 
		
		</nav>
		</>
	)
}

export default Navbar