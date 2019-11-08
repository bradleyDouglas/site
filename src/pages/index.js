import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import Slider from "../components/slider"
import Hold from "../components/hold"

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
        {/* <Slider /> */}
        <Hold />
    </>
)

export default IndexPage
