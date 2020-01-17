/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

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

    useEffect(() => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
        // We listen to the resize event
        window.addEventListener("resize", () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty("--vh", `${vh}px`)
        })
    }, [])

    return (
        <>
            <Header />
            <Intro />
            <main>{children}</main>
        </>
    )
}

export default Layout
