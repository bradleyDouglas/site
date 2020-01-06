import React from "react"
import { gsap } from "gsap"
import TransitionLink from "gatsby-plugin-transition-link"

const Header = ({ siteTitle }) => (
    <header className="header">
        <div className="header__inner">
            <div className="header__item">
                <TransitionLink
                    to="/"
                    exit={{
                        trigger: ({ exit, node }) => {
                            gsap.to(node.querySelector(".project__inner"), {
                                duration: 0.6,
                                autoAlpha: 0,
                                onComplete: () => {
                                    gsap.to(node, {
                                        duration: 1.3,
                                        autoAlpha: 0,
                                    })
                                },
                            })
                        },
                        delay: 0.5,
                        length: 2.2,
                        zIndex: 5,
                    }}
                    entry={{
                        delay: 0,
                        zIndex: 0,
                    }}
                >
                    Brad Douglas
                </TransitionLink>
            </div>
            <div className="header__item">
                <TransitionLink to="/">About</TransitionLink>
            </div>
        </div>
    </header>
)

export default Header
