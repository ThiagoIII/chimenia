import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ author, title, description, url, keywords, lang }) {
	const { pathname } = useLocation()
	const { site } = useStaticQuery(query)

	const {
		defaultAuthor,
		defaultTitle,
		titleTemplate,
		defaultDescription,
		siteUrl,
		defaultKeywords,
	} = site.siteMetadata

	const seo = {
		author: author || defaultAuthor,
		title: title || defaultTitle,
		description: description || defaultDescription,
		url: url || `${siteUrl}${pathname}`,
		keywords: keywords || defaultKeywords.join(","),
	}

	if(seo.description.length <= 160){
		let countchars = seo.description.length
		console.log('description shorter than 160 characters ', countchars)
	} else {
		console.log('description longer than 160 characters' , seo.description.length)
		let str1
		let str2 = '...'
		str1 = seo.description.slice(0,157)
		seo.description = str1.concat(str2)
	}



	return (
		<Helmet	htmlAttributes={{lang,}} title={seo.title} 	titleTemplate={titleTemplate}>
			<meta name="description" content={seo.description} />
			<meta name="author" content={seo.author} />
			<meta name="keywords" content={seo.keywords} />
			<link rel="canonical"  href={seo.url} />
		</Helmet>
	)
}


SEO.propTypes = {
	author: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	url: PropTypes.string,
	keywords: PropTypes.array,
	lang: PropTypes.string,
}

SEO.defaultProps = {
	author: null,
	title: null,
	description: null,
	url: null,
	keywords: null,
	lang: `pt-br`,
}

export default SEO

const query = graphql`
	query SEO {
		site {
			siteMetadata {
			defaultAuthor: author
			defaultTitle: title
			titleTemplate
			defaultDescription: description
			siteUrl: url
			defaultKeywords: keywords
			}
		}
	}
`