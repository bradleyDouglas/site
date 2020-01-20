import React from "react"
import ScrollableSection from "../components/scrollableSection"
import Img from "gatsby-image"

const SingleImage = ({ input }) => {
    const side = input.primary.side.toLowerCase()
    return (
        <ScrollableSection
            classNames={`project__container project__single-image project__single-image--${side}`}
        >
            <div className="project__wrapper" data-scroll>
                <Img
                    fluid={input.primary.image.localFile.childImageSharp.fluid}
                    style={{ transition: `opacity 1000ms ease 0s;` }}
                />

                {input.primary.image_blurb.text && (
                    <div className="project__single-image-blurb">
                        <p>{input.primary.image_blurb.text}</p>
                    </div>
                )}
            </div>
        </ScrollableSection>
    )
}

export default SingleImage
