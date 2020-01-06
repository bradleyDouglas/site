import React from "react"
import ScrollableSection from "./scrollableSection"

const ProjectHeader = ({ title }) => {
    return (
        <ScrollableSection classNames="project-header">
            <div className="project-header__wrapper" data-scroll>
                <h1
                    className="h1 project-header__title"
                    data-scroll
                    data-scroll-speed="-3"
                >
                    {title}
                </h1>
            </div>
            <div className="scroll-down">
                <p>scroll down</p>
                <span></span>
            </div>
        </ScrollableSection>
    )
}

export default ProjectHeader
