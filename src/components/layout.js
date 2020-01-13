/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { document } from "browser-monads"

import Header from "./header"
import Intro from "./intro"
// import "../styles/main.scss"

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <>
            <Header />
            <Intro />
            <main>{children}</main>
        </>
    )
}

export default Layout
