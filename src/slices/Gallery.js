import React from 'react'
import Img from 'gatsby-image'
import ScrollableSection from '../components/scrollableSection'

const Gallery = ({ input }) => {
    const images = input.items
    return (
        <ScrollableSection classNames="project__container non">
            <div className="project__wrapper" data-scroll>
                <div className="non-content">
                    {images.map((image, index) => (
                        <div
                            className="non-content__item"
                            key={
                                image.gallery_image.localFile.childImageSharp.id
                            }
                            style={{
                                width: `calc(500px * ${image.gallery_image.localFile.childImageSharp.fluid.aspectRatio})`,
                            }}
                            data-scroll
                            data-scroll-speed={index % 2 == 0 ? `0` : `1`}
                        >
                            <Img
                                fluid={
                                    image.gallery_image.localFile
                                        .childImageSharp.fluid
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </ScrollableSection>
    )
}

export default Gallery
