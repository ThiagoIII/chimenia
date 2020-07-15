import React from 'react'
import { graphql , Link } from 'gatsby'
import Layout from '../components/layout'
import './doce-template.css'
import imgOriginal from '../assets/images/chiLogo.jpg'
import SEO from '../components/seo'


export const data = graphql`
	query ($limit: Int, $skip: Int ) {
		allContentfulAsset (limit: $limit, skip: $skip) {
			edges {
				node {
					fluid (quality: 70, maxWidth: 500, sizes: "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" ) {
						src
						srcSet
						srcSetWebp
						srcWebp
						sizes
					}
					title
				}
			}
		}
	}
	`

const Doce =  (props) =>  {
	const { currentPage, numPages } = props.pageContext
	const isFirst = currentPage === 0
	const isLast = currentPage === (numPages - 1)
	const prevPage = currentPage - 1 === 0 ? "0" : (currentPage - 1).toString()
	const nextPage = (currentPage + 1).toString()
	

	return(
	<Layout>
	<SEO title={`Pagina ${currentPage}`}/>
		<span className="small-bg-gallery-navbar"></span>
		<img src={imgOriginal} alt='logo' style={{ width:'150px', height:'150px' }} id='galleryLogo' />
		<h1 id="titleGallery">Galeria de doces, aproveite!</h1>
		<ul id="galleryUl" >
			{ props
				.data
				.allContentfulAsset
				.edges.map(
					(item, i) => 						
						<li id="galleryLi" key={i} >
							<picture>
								<source type="image/webp" srcSet={item.node.fluid.srcSetWebp} sizes={item.node.fluid.sizes} /> 
								<source srcSet={item.node.fluid.srcSet} sizes={item.node.fluid.sizes} /> 
								<img
									sizes={item.node.fluid.sizes} 
									srcSet={item.node.fluid.srcSet} 
									src={item.node.fluid.src} alt={item.node.title} 
								/>
							</picture>
						</li>)
			} 
			</ul>
			<p style={{ width:"100%",margin:"8vh 0 1vh 0", textAlign:"center", fontSize:"1.1rem", fontFamily:" 'Croissant One', cursive" , color:"#177FAB"}}>Pages</p>
			<section className="pagination">
				{!isFirst && (
					<Link to={`doces/${prevPage}`} rel="prev">
					<span>← Previous Page</span>
					</Link>
					)
				} 
			
				{Array.from({ length: numPages  }, (_ , i) => {
					if(i > currentPage + 2  || i < currentPage - 2){
						return
					} else {
						if (currentPage ===  i ) {
							return (
								<Link to={`/doces/${i}`} rel="numPages">
									<span className="currentPage"> { i } </span> 
								</Link>
							)
						}
						else {
							return (
								<Link to={`/doces/${i}`} rel="numPages">
									<span className="otherPages"> { i } </span> 
								</Link>
							)
						}
					}
					
					}) //end of Array.from
				}

				{!isLast && (
					<Link to={`doces/${nextPage}`} rel="next">
					<span>Next Page →</span>
					</Link>
					)
				}
				
			</section>
			<section className="paginationGoto">
				<label className="labelGotopage"> or Go to page: </label>
					<select name="pages" className="dropdownPages" onChange={ (e) => window.location.pathname = e.target.value }>
						{Array.from({ length: numPages  }, (_ , i) => {
								if( i === currentPage) {
									return <option value={`/doces/${i}`} selected>{i}</option>
								} else {
									return <option value={`/doces/${i}`}>{i}</option>
								}
							})
						}
					</select>
			</section>
			

			</Layout>
	)
}

export default Doce;