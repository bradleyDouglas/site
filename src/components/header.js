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
                            if (
                                document.body.classList.contains(
                                    "project-template"
                                )
                            ) {
                                gsap.to(
                                    node.querySelectorAll(".project-inner"),
                                    {
                                        duration: 0.4,
                                        autoAlpha: 0,
                                    }
                                )
                            } else {
                                node.querySelector(
                                    ".about__wrapper"
                                ).classList.add("is-out")
                                node.querySelector(
                                    ".about-bg__in"
                                ).classList.add("no-show")
                                node.querySelector(
                                    ".about__inner"
                                ).classList.add("no-show")
                            }
                        },
                        delay: document.body.classList.contains(
                            "project-template"
                        )
                            ? 0.5
                            : 0,
                        length: document.body.classList.contains(
                            "project-template"
                        )
                            ? 1.5
                            : 3,
                        zIndex: 2,
                    }}
                    entry={{
                        trigger: ({ entry, node }) => {
                            gsap.fromTo(
                                node,
                                {
                                    opacity: 0,
                                    zIndex: `-1`,
                                },
                                {
                                    duration: 0.9,
                                    opacity: 1,
                                    zIndex: `1`,
                                    ease: "power1.inOut",
                                }
                            )

                            gsap.fromTo(
                                node.querySelector(".slide__title"),
                                {
                                    opacity: 0,
                                    filter: "blur(10px)",
                                    y: 48,
                                },
                                {
                                    duration: 1,
                                    delay: 0.6,
                                    opacity: 1,
                                    filter: "blur(0px)",
                                    y: 0,
                                    ease: "expo.out",
                                }
                            )

                            gsap.fromTo(
                                node.querySelectorAll(".home-out"),
                                {
                                    yPercent: 100,
                                    autoAlpha: 0,
                                    stagger: 0.15,
                                },
                                {
                                    yPercent: 0,
                                    autoAlpha: 1,
                                    delay: 0.8,
                                    duration: 0.9,
                                    ease: "back.out(2)",
                                }
                            )
                        },
                        delay: document.body.classList.contains(
                            "project-template"
                        )
                            ? 0.5
                            : 0.8,
                        zIndex: 0,
                    }}
                >
                    Brad Douglas
                </TransitionLink>
            </div>
            <div className="header__item">
                <TransitionLink
                    to="/about"
                    exit={{ length: 4 }}
                    entry={{
                        trigger: ({ exit, node }) => {
                            gsap.fromTo(
                                node,
                                { autoAlpha: 0 },
                                {
                                    duration: 1.5,
                                    autoAlpha: 1,
                                }
                            )
                        },
                        length: 2,
                        delay: 0.5,
                    }}
                >
                    About
                </TransitionLink>
            </div>
        </div>
    </header>
)

export default Header
