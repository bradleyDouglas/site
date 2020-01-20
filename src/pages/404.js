import React from 'react'
import SEO from '../components/seo'
import TransitionLink from 'gatsby-plugin-transition-link'

const NotFoundPage = () => (
    <>
        <SEO title="404: Not found" />
        <article className="not-found">
            <div className="not-found__wrapper">
                <p className="top">Error 404</p>
                <p className="message">There's nothing to see here</p>
                <p className="sub">
                    Oops...The page you were looking for doesn't exist. You may
                    ave mistyped the addresss or the page may have been moved.
                </p>
                <TransitionLink to="/">Return to home page</TransitionLink>
            </div>
        </article>
    </>
)

export default NotFoundPage
