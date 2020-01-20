import React, { Component } from "react"
import PropTypes from "prop-types"
import {
    BeforeAfter,
    SingleImage,
    MobileViews,
    DoubleDesktop,
    Gallery,
} from "../slices"

export default class SliceZone extends Component {
    render() {
        const { allSlices } = this.props
        const slice = allSlices.map(s => {
            switch (s.slice_type) {
                // These are the API IDs of the slices
                case "before_and_after":
                    return <BeforeAfter key={s.id} input={s} />
                case "single_image":
                    return <SingleImage key={s.id} input={s} />
                case "mobile_views_-_group_of_three":
                    return <MobileViews key={s.id} input={s} />
                case "double_desktop":
                    return <DoubleDesktop key={s.id} input={s} />
                case "gallery":
                    return <Gallery key={s.id} input={s} />
                default:
                    return null
            }
        })
        return slice
    }
}

// SliceZone.propTypes = {
//     allSlices: PropTypes.array.isRequired,
// }
