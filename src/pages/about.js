import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import LocomotiveScroll from "locomotive-scroll"
import ScrollableSection from "../components/scrollableSection"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { Helmet } from "react-helmet"

const ABOUT_QUERY = graphql`
    query AboutQuery {
        file(relativePath: { eq: "me-2.jpg" }) {
            id
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

const AboutPage = () => {
    const {
        file: {
            childImageSharp: { fluid: image },
        },
    } = useStaticQuery(ABOUT_QUERY)

    const scrollRef = React.createRef()
    const aboutRef = React.createRef()

    useEffect(() => {
        const scroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            inertia: 0.6,
        })
        aboutRef.current.querySelector(".about-bg__in").classList.add("show")

        scrollRef.current.classList.add("show")

        // Specify how to clean up after this effect:
        return function destroy() {
            scroll.destroy()
        }
    })

    return (
        <>
            <SEO
                title="Home"
                keywords={[
                    `gatsby`,
                    `portfolio`,
                    `front-end developer`,
                    `developer`,
                    `omaha, ne`,
                ]}
            />
            <Helmet
                bodyAttributes={{
                    class: "about-page",
                }}
            />
            <article className="about" ref={aboutRef}>
                <div className="about-bg">
                    <div className="about-bg__in"></div>
                </div>
                <div className="about__inner inner" ref={scrollRef}>
                    <ScrollableSection classNames={`about__container`}>
                        <div
                            className="project__wrapper about__wrapper"
                            data-scroll
                        >
                            <div className="about__content">
                                <p>
                                    I live in Omaha, NE and have nearly a decade
                                    of product design and development. I believe
                                    that attention to the small/subtle details –
                                    the ones often get overlooked by most – are
                                    what makes the difference between good
                                    design and great design. I don’t believe
                                    Form follows Function… I do believe Form and
                                    Function go hand-in-hand.
                                </p>
                                <p>
                                    <strong>
                                        I’m driven by the thoughts and reasons
                                        behind the details/design.
                                    </strong>
                                </p>
                            </div>
                            <div className="about__image">
                                <Img
                                    fluid={image}
                                    style={{ opacity: 0.9 }}
                                ></Img>
                            </div>
                        </div>
                    </ScrollableSection>
                </div>
            </article>
        </>
    )
}

export default AboutPage
