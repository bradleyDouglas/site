import React from "react"

const ScrollableSection = ({ children, classNames }) => {
    return (
        <section className={`scroll-section ${classNames}`} data-scroll-section>
            {children}
        </section>
    )
}

export default ScrollableSection
