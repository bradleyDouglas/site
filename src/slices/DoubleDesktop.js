import React from "react"
import ScrollableSection from "../components/scrollableSection"
import Img from "gatsby-image"

const DoubleDesktop = ({ input }) => {
    return (
        <ScrollableSection classNames="project__container project__double">
            <div className="project__wrapper" data-scroll>
                <div className="image-wrapper">
                    <Img
                        fluid={
                            input.primary.left_image.localFile.childImageSharp
                                .fluid
                        }
                    />
                </div>
                <div className="image-wrapper">
                    <Img
                        fluid={
                            input.primary.right_imge.localFile.childImageSharp
                                .fluid
                        }
                    />
                </div>
            </div>
        </ScrollableSection>
    )
}

export default DoubleDesktop
