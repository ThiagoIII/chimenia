const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions
	const res = await graphql(`
		query {
			allContentfulAsset {
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
	`)

/* 	let skip = 3;
	res.data.allContentfulAsset.edges.forEach( edge => createPage({
		path: `/doce/${edge.node.title}`, 			//url that you want to show in the browser
		component: doceTemplate, 					//react component that will be rendered
		context: {
			skip: skip 				//nothing more than props to a component or if you are querying with graphql this will be the parameters for the query
		}
	})) */

	const imgs = res.data.allContentfulAsset.edges
	const postsPerPage = 18
	const numPages = Math.ceil(imgs.length / postsPerPage)

	Array.from({ length: numPages }).forEach((_, i) => {
		createPage({
			path:`/doces/${i}`,
			component: path.resolve("./src/templates/doce-template.js"),
			context: {
				limit: postsPerPage,
				skip: i * postsPerPage,
				numPages,
				currentPage: i,
				postsPerPage: postsPerPage,
			},
		})
	}) 
}
