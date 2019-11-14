const path = require("path")
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: `Brad Douglas`,
        description: `Design + Develop`,
        author: `@bradjdouglas`,
    },
    plugins: [
        {
            resolve: `gatsby-source-prismic`,
            options: {
                repositoryName: `bradleyjdouglas`,
                accessToken: `${process.env.API_KEY}`,
                linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/assets/images`,
            },
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                useResolverUrlLoader: {
                    options: {
                        sourceMap: true,
                    },
                },
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `brad-douglas-website`,
                short_name: `portfolio`,
                start_url: `/`,
                icon: `src/assets/images/favicon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: path.resolve(__dirname, "src/assets/svg"),
                },
            },
        },
        //
        // Un-comment this for webfonts: https://www.gatsbyjs.org/packages/gatsby-plugin-web-font-loader/
        {
            resolve: "gatsby-plugin-web-font-loader",
            options: {
                typekit: {
                    id: "lft4tcj",
                    api: "//use.typekit.net",
                },
            },
        },
        //
        // There are two options to keep elements persistent across page changes.
        // By default, we will use the 'Gatsby Plugin Layout', but you can use
        // either one depending on your needs.
        // 1) gatsby-plugin-transition link: https://transitionlink.tylerbarnes.ca/
        // 2) gatsby-plugin-layout: https://www.gatsbyjs.org/packages/gatsby-plugin-layout/
        //
        // Transition Link
        {
            resolve: "gatsby-plugin-transition-link",
            options: {
                layout: require.resolve(`./src/components/layout.js`),
            },
        },
        //
        //
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
