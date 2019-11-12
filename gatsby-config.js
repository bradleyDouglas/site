const path = require("path")

module.exports = {
    siteMetadata: {
        title: `Gatsby / WordPress Starter`,
        description: `Site description`,
        author: `@bradleyDouglas`,
        url: `http://obd.local`,
    },
    plugins: [
        // {
        //     resolve: `gatsby-source-graphql`,
        //     options: {
        //         // This type will contain remote schema Query type
        //         typeName: `WPGraphQL`,
        //         // This is field under which it's accessible
        //         fieldName: `wpgraphql`,
        //         // Url to query from. Change the WORDPRESS_URL to the one you need.
        //         url: `http://personal.local/graphql`,
        //     },
        // },
        {
            resolve: `gatsby-transformer-remark`,
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/projects/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `projects`,
                path: `${__dirname}/src/data/`,
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
        `gatsby-plugin-mdx`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `brad-douglas-website`,
                short_name: `portfolio`,
                start_url: `/`,
                background_color: `#9dc000`,
                theme_color: `#9dc000`,
                display: `minimal-ui`,
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
        // Gatsby Plugin Layout
        // {
        //     resolve: "gatsby-plugin-layout",
        //     options: {
        //         component: require.resolve(`./src/components/layout.js`),
        //     },
        // },
        //
        //
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
