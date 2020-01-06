import React from "react"
import ScrollableSection from "../components/scrollableSection"
import ReactCompareImage from "react-compare-image"

const BeforeAfter = ({ input }) => {
    return (
        <ScrollableSection classNames="project__container project__compare">
            <div className="project__wrapper">
                <ReactCompareImage
                    leftImage={input.primary.before_image.url}
                    rightImage={input.primary.after_image.url}
                />
            </div>
        </ScrollableSection>
    )
}

export default BeforeAfter
