import React from "react"
import { gsap } from "gsap"
import ScrollableSection from "./scrollableSection"
import TransitionLink from "gatsby-plugin-transition-link"

const setLocal = node => {
    const current = parseInt(node.querySelector(".project").dataset.index)
    localStorage.setItem("current", JSON.stringify(current))
}

const ProjectFooter = ({ title, slug, image }) => {
    return (
        <ScrollableSection classNames="project-footer">
            <img src={image} alt="" className="project-footer__img" />
            <div
                id="scrollWrapper"
                className="project-footer__wrapper"
                data-scroll
                data-scroll-offset="30%"
                data-scroll-call="scrollToFooter"
            >
                <TransitionLink
                    to={`/${slug}`}
                    exit={{
                        trigger: ({ exit, node }) => {
                            gsap.to(node, {
                                duration: 0.9,
                                autoAlpha: 0,
                                ease: "power1.inOut",
                            })
                        },
                        zIndex: 2,
                        length: 0.9,
                    }}
                    entry={{
                        trigger: ({ exit, node }) => {
                            setLocal(node)
                        },
                        zIndex: 0,
                        delay: 0,
                    }}
                >
                    <h1
                        className="h1 project-footer__title"
                        data-scroll
                        data-scroll-speed="-3"
                    >
                        {title}
                    </h1>
                </TransitionLink>
            </div>
        </ScrollableSection>
    )
}

export default ProjectFooter
