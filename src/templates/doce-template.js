import React from 'react'
import { graphql , Link } from 'gatsby'
import Layout from '../components/layout'
import './doce-template.css'
import imgOriginal from '../assets/images/chiLogo.jpg'
import SEO from '../components/seo'
import { ArrowRightCircle, ArrowLeftCircle } from 'react-feather';

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


	function handleLbClick(e) {
		let lbDiv = document.getElementById('lbDiv')
		let lbImg = document.getElementById('lbImg')
		lbDiv.classList.add('lbOpen')
		lbImg.src = e.target.src
		lbImg.alt = e.target.alt
		lbImg.dataset.index = e.target.dataset.index
	}

	function handleLbClose(e) {
		if (e.target.id !== 'lbImg') {
			e.target.classList.remove('lbOpen')
		} 
	}

	function handleLbNextImg(e){
		let lbImg = document.getElementById('lbImg')
		let lbImgIndex = document.getElementById('lbImg').dataset.index
		lbImgIndex = parseInt(lbImgIndex)
		let lbImgIndexPlusOne = lbImgIndex + 1
		if(lbImgIndexPlusOne >= props.data.allContentfulAsset.edges.length){
			alert('Oooops, esta é a última imagem desta página.') 
		} else {
			let lbNextImgSrc = props.data.allContentfulAsset.edges[lbImgIndexPlusOne].node.fluid.src
			lbImg.src = lbNextImgSrc
			lbImg.dataset.index = lbImgIndexPlusOne
		}
	}

	function handleLbPrevImg(e){
		let lbImg = document.getElementById('lbImg')
		let lbImgIndex = document.getElementById('lbImg').dataset.index
		lbImgIndex = parseInt(lbImgIndex)
		let lbImgIndexMinusOne = lbImgIndex - 1
		if(lbImgIndexMinusOne < 0){
			alert('Esta é a primeira imagem desta página.')
		} else {
			let lbNextImgSrc = props.data.allContentfulAsset.edges[lbImgIndexMinusOne].node.fluid.src
			lbImg.src = lbNextImgSrc
			lbImg.dataset.index = lbImgIndexMinusOne
		}
	}

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
							<li id="galleryLi" key={item.node.title} >
								<picture>
									<source type="image/webp" srcSet={item.node.fluid.srcSetWebp} sizes={item.node.fluid.sizes} /> 
									<source srcSet={item.node.fluid.srcSet} sizes={item.node.fluid.sizes} /> 
									<img
										data-index={i}
										sizes={item.node.fluid.sizes} 
										srcSet={item.node.fluid.srcSet} 
										src={item.node.fluid.src} alt={item.node.title} 
										onClick={ (e) => handleLbClick(e)}
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
								<Link to={`/doces/${i}`} rel="numPages"  key={i}>
									<span className="currentPage"> { i } </span> 
								</Link>
							)
						}
						else {
							return (
								<Link to={`/doces/${i}`} rel="numPages"  key={i}>
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
									return <option value={`/doces/${i}`} key={i} selected>{i}</option>
								} else {
									return <option value={`/doces/${i}`} key={i}>{i}</option>
								}
							})
						}
					</select>
			</section>
			
			<div id="lbDiv" onClick={ (e) => handleLbClose(e)}>
				<ArrowLeftCircle className="lbIcon" color="white" size={72} onClick={ (e) => handleLbPrevImg(e)} />
				<img data-index='' src='' alt='' id="lbImg"/>
				<ArrowRightCircle className="lbIcon" color="white" size={72} onClick={(e) => handleLbNextImg(e)}  />
			</div>
		</Layout>
	)
}

export default Doce;