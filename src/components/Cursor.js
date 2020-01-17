import React, { useEffect } from "react"
import { gsap } from "gsap"
import { document, body } from "browser-monads"

const Cursor = () => {
    const bigBall = React.createRef()
    const smallBall = React.createRef()

    // Move the cursor
    const onMouseMove = e => {
        gsap.to(bigBall.current, {
            duration: 0.4,
            x: e.pageX - 15,
            y: e.pageY - 15,
        })
        gsap.to(smallBall.current, {
            duration: 0.1,
            x: e.pageX - 5,
            y: e.pageY - 7,
        })
    }

    // Hover an element
    const onMouseHover = () => {
        gsap.to(bigBall.current, {
            duration: 0.3,
            scale: 4,
        })
    }
    const onMouseHoverOut = () => {
        gsap.to(bigBall.current, {
            duration: 0.3,
            scale: 1,
        })
    }

    useEffect(() => {
        document.body.addEventListener("mousemove", onMouseMove)

        return () => {
            document.body.removeEventListener("mousemove", onMouseMove)
        }
    })

    return (
        <>
            <div className="cursor">
                <div className="cursor__ball cursor__ball--big" ref={bigBall}>
                    <svg height="30" width="30">
                        <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
                    </svg>
                </div>

                <div
                    className="cursor__ball cursor__ball--small"
                    ref={smallBall}
                >
                    <svg height="10" width="10">
                        <circle cx="5" cy="5" r="4" strokeWidth="0"></circle>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default Cursor
