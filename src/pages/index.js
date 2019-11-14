import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import Slider from "../components/slider"

const IndexPage = () => (
    <>
        <SEO
            title="Home"
            keywords={[
                `gatsby`,
                `portfolio`,
                `front-end developer`,
                `developer`,
                `omaha, ne`,
            ]}
        />
        <Slider />
    </>
)

export default IndexPage
