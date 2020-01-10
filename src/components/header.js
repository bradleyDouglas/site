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
                            gsap.to(node.querySelectorAll(".project__inner"), {
                                duration: 0.4,
                                autoAlpha: 0,
                                // onComplete: () => {
                                //     gsap.to(
                                //         node.querySelector(
                                //             ".gatsby-image-wrapper"
                                //         ),
                                //         {
                                //             duration: 0.8,
                                //             autoAlpha: 1,
                                //             ease: "power1.inOut",
                                //         }
                                //     )
                                // },
                            })
                        },
                        delay: 0.5,
                        length: 1.5,
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
                        delay: 0.5,
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
