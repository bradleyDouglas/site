import React from "react"
import ScrollableSection from "../components/scrollableSection"
import Img from "gatsby-image"

const MobileViews = ({ input }) => {
    const images = input.items
    const modifier = images.length < 4 ? `three` : `four`
    return (
        <ScrollableSection classNames="project__container project__mobile">
            <div className={`project__wrapper ${modifier}`} data-scroll>
                {images.map((image, index) => (
                    <div
                        className={`image-wrapper image-wrapper--${modifier}`}
                        key={image.image.localFile.childImageSharp.id}
                        // data-scroll
                        // data-scroll-speed={index}
                    >
                        <Img
                            fluid={image.image.localFile.childImageSharp.fluid}
                        />
                    </div>
                ))}
            </div>
        </ScrollableSection>
    )
}

export default MobileViews
