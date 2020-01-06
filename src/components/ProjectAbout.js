import React from "react"
import ScrollableSection from "./scrollableSection"

const ProjectAbout = ({ roles, tags, about }) => {
    return (
        <ScrollableSection classNames="project__container">
            <div className="horizontal-scroll" data-scroll>
                <div
                    className="horizontal-scroll__wrapper"
                    data-scroll
                    data-scroll-direction="horizontal"
                    data-scroll-speed="-10"
                >
                    {roles.map(role => (
                        <span key={role.role.text}>{role.role.text}</span>
                    ))}
                </div>
            </div>

            <div className="project__about">
                <div
                    className="project__container"
                    data-scroll
                    data-scroll-offset="100"
                >
                    <h5 className="h5">About the project</h5>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: about,
                        }}
                    ></div>
                </div>
            </div>

            <div className="horizontal-scroll gone" data-scroll>
                <div
                    className="horizontal-scroll__wrapper"
                    data-scroll
                    data-scroll-direction="horizontal"
                    data-scroll-speed="10"
                >
                    {tags.map(tag => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </ScrollableSection>
    )
}

export default ProjectAbout
