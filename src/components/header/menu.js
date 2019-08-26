import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"

const MAIN_MENU_QUERY = graphql`
    query MyQuery {
        wpgraphql {
            menuItems(where: { location: MENU_1 }) {
                nodes {
                    label
                    url
                    menuItemId
                }
            }
        }
        site {
            siteMetadata {
                url
            }
        }
    }
`

const renderMenuItem = (menuItem, site) => {
    const url = menuItem.url.replace(site.siteMetadata.url, ``)

    return (
        <Link key={menuItem.menuItemId} to={url}>
            {menuItem.label}
        </Link>
    )
}

const Menu = () => {
    const { wpgraphql, site } = useStaticQuery(MAIN_MENU_QUERY)

    return (
        <nav className="main-nav">
            <div className="main-nav__wrapper">
                {wpgraphql.menuItems.nodes.map(menuItem =>
                    renderMenuItem(menuItem, site)
                )}
            </div>
        </nav>
    )
}

export default Menu
