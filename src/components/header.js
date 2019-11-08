import { Link } from "gatsby"
import React from "react"

const Header = ({ siteTitle }) => (
    <header className="header">
        <div className="header__inner">
            <div className="header__item">
                <Link to="/">Brad Douglas</Link>
            </div>
            <div className="header__item">
                <Link to="/">About</Link>
            </div>
        </div>
    </header>
)

export default Header
