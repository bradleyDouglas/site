import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import LocomotiveScroll from "locomotive-scroll"
import SEO from "../components/seo"
import { Helmet } from "react-helmet"
import ProjectHeader from "../components/ProjectHeader"
import ProjectAbout from "../components/ProjectAbout"
import SliceZone from "../components/sliceZone"
import ScrollableSection from "../components/scrollableSection"

const Project = ({ data: { prismicProject } }) => {
    const { data, tags } = prismicProject
    const scrollRef = React.createRef()

    useEffect(() => {
        const scroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            getSpeed: true,
            getDirection: true,
            inertia: 0.6,
        })

        // Specify how to clean up after this effect:
        return function cleanup() {
            scroll.destroy()
        }
    })

    return (
        <>
            <Helmet
                bodyAttributes={{
                    class: "project-template",
                }}
            />
            <div className="project">
                <Img
                    fluid={data.featured_image.localFile.childImageSharp.fluid}
                    style={{
                        position: `fixed`,
                        top: `0`,
                        left: `0`,
                        width: `100%`,
                        height: `100%`,
                        zIndex: `-1`,
                        opacity: `0.1`,
                    }}
                ></Img>
                <div className="project__inner" ref={scrollRef}>
                    <ProjectHeader title={data.project_title.text} />
                    <ProjectAbout
                        roles={data.roles}
                        tags={tags}
                        about={data.about.html}
                    />
                    <SliceZone allSlices={data.body} />
                </div>
            </div>
        </>
    )
}

export default Project

export const projectQuery = graphql`
    query ProjectBySlug($uid: String!) {
        prismicProject(uid: { eq: $uid }) {
            uid
            tags
            data {
                project_title {
                    text
                }
                featured_image {
                    localFile {
                        childImageSharp {
                            fluid(grayscale: true) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
                roles {
                    role {
                        text
                    }
                }
                about {
                    html
                }
                body {
                    ... on PrismicProjectBodyBeforeAndAfter {
                        id
                        slice_type
                        primary {
                            after_image {
                                url
                            }
                            before_image {
                                url
                            }
                        }
                    }
                    ... on PrismicProjectBodySingleImage {
                        id
                        slice_type
                        primary {
                            side
                            image {
                                localFile {
                                    childImageSharp {
                                        fluid {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                            image_blurb {
                                text
                            }
                        }
                    }
                    ... on PrismicProjectBodyMobileViewsGroupOfThree {
                        id
                        slice_type
                        items {
                            image {
                                localFile {
                                    childImageSharp {
                                        id
                                        fluid {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ... on PrismicProjectBodyDoubleDesktop {
                        id
                        slice_type
                        primary {
                            left_image {
                                localFile {
                                    childImageSharp {
                                        id
                                        fluid {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                            right_imge {
                                localFile {
                                    childImageSharp {
                                        id
                                        fluid {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
