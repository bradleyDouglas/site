import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import Slider from "../components/slider"
import { Helmet } from "react-helmet"

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
        <Helmet
            bodyAttributes={{
                class: "no-scroll",
            }}
        />
        <Slider />
    </>
)

export default IndexPage
