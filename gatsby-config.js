/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    author: 'Thiago Terceiro',
    title: `Inicio`,
    titleTemplate: `%s · Chimenia Mollon Doces Artesanais`,
    description: `Designer de doces - apaixonada pela profissao!`,
    url: `https://www.chimeniadoces.com`,
    keywords: ['doces','artesanal','chimenia','mollon','brasil','festas'],
    links: ['Home' , 'Doces'],
  },
  /* Your site config here */
  
  plugins: [`gatsby-plugin-react-helmet`, `gatsby-transformer-sharp`, `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path:`${__dirname}/static/`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,     // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    }, 

    
  ],
}
