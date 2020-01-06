import React from "react"
import ScrollableSection from "../components/scrollableSection"
import Img from "gatsby-image"

const MobileViews = ({ input }) => {
    const images = input.items
    return (
        <ScrollableSection classNames="project__container project__mobile">
            <div className="project__wrapper" data-scroll>
                {images.map(image => (
                    <div
                        className="image-wrapper"
                        key={image.image.localFile.childImageSharp.id}
                    >
                        <Img
                            // key={image.image.localFile.childImageSharp.id}
                            fluid={image.image.localFile.childImageSharp.fluid}
                        />
                    </div>
                ))}
            </div>
        </ScrollableSection>
    )
}

export default MobileViews
