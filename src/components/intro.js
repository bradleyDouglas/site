import React, { useEffect } from "react"
import { gsap } from "gsap"
import Logo from "../assets/svg/monogram.svg"

const Intro = () => {
    const introRef = React.createRef()
    const containerRef = React.createRef()

    useEffect(() => {
        let tl = gsap.timeline({
            onComplete: () => {
                introRef.current.classList.add("gone")
            },
        })

        tl.set(containerRef.current, { className: `intro__container go` })
            .set(containerRef.current, { className: `intro__container` }, 2.3)
            .to(
                introRef.current,
                {
                    duration: 1.5,
                    autoAlpha: 0,
                    ease: "power2.inOut",
                },
                4
            )
    }, [])

    return (
        <section className="intro" ref={introRef}>
            <div className="intro__wrapper">
                <div className="intro__container" ref={containerRef}>
                    {/* <p className="intro__name">Brad Douglas</p>
                    <p className="intro__tag">design + develop</p> */}
                    <Logo style={{ width: `150px` }} />
                </div>
            </div>
        </section>
    )
}

export default Intro
