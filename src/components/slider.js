import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import { gsap } from "gsap"
import * as THREE from "three"
import TransitionLink from "gatsby-plugin-transition-link"
import { Link } from "gatsby"

const HOME_QUERY = graphql`
    query HomeQuery {
        allPrismicProject {
            nodes {
                id
                slugs
                data {
                    featured_image {
                        localFile {
                            childImageSharp {
                                original {
                                    src
                                }
                            }
                        }
                    }
                    project_title {
                        text
                    }
                }
            }
        }
    }
`

const vertex = `
    varying vec2 vUv;
    void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`

const fragment = `
    varying vec2 vUv;

    uniform sampler2D currentImage;
    uniform sampler2D nextImage;

    uniform float dispFactor;

    void main() {

        vec2 uv = vUv;
        vec4 _currentImage;
        vec4 _nextImage;
        float intensity = 0.3;

        vec4 orig1 = texture2D(currentImage, uv);
        vec4 orig2 = texture2D(nextImage, uv);

        _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));

        _nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));

        vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

        gl_FragColor = finalTexture;

    }
`

class Slider extends Component {
    constructor(props) {
        super(props)
        // this.images = bgImages
        this.images = [
            ...this.props.data.allPrismicProject.nodes.map(
                node =>
                    node.data.featured_image.localFile.childImageSharp.original
                        .src
            ),
        ]
        this.titles = [
            ...this.props.data.allPrismicProject.nodes.map(
                node => node.data.project_title.text
            ),
        ]
        this.slugs = [
            ...this.props.data.allPrismicProject.nodes.map(
                node => node.slugs[0]
            ),
        ]
        this.render = this.render.bind(this)
        this.titleRef = React.createRef()
        this.numberRef = React.createRef()
        this.touchStart = null
        this.state = {
            current: 0,
            previous: null,
        }
    }

    build = () => {
        this.renderWidth = Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0
        )
        this.renderHeight = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
        )
        this.renderW = ""
        this.renderH = ""

        if (this.renderWidth < this.renderHeight) {
            this.renderW = this.renderHeight
            this.renderH = this.renderHeight
        } else {
            this.renderW = this.renderWidth
            this.renderH = this.renderWidth
        }

        this.scene = new THREE.Scene()
        this.setCamera().setRenderer()
        this.mount.appendChild(this.renderer.domElement)

        this.setLoader()
            .setTextures()
            .setMaterial()
            .setGeometry()
            .setMesh()

        this.scene.add(this.mesh)

        window.addEventListener("resize", e => {
            this.renderer.setSize(this.renderW, this.renderH)
        })
    }

    setCamera = () => {
        this.camera = new THREE.OrthographicCamera(
            this.renderWidth / -2,
            this.renderWidth / 2,
            this.renderHeight / 2,
            this.renderHeight / -2,
            1,
            1000
        )

        this.camera.position.z = 1.0

        return this
    }

    setGeometry = () => {
        this.geometry = new THREE.PlaneBufferGeometry(
            this.mount.offsetWidth,
            this.mount.offsetHeight,
            1.0
        )

        return this
    }

    setLoader = () => {
        this.loader = new THREE.TextureLoader()
        // this.loader.setCrossOrigin("")

        return this
    }

    setTextures = () => {
        this.bgImages = []

        this.images.forEach(img => {
            let image = this.loader.load(img)
            image.magFilter = image.minFilter = THREE.LinearFilter
            image.anisotropy = this.renderer.capabilities.getMaxAnisotropy()
            this.bgImages.push(image)
        })
        return this
    }

    setMaterial = () => {
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                dispFactor: { type: "f", value: 0.0 },
                currentImage: {
                    type: "t",
                    value: this.bgImages[this.state.current],
                },
                nextImage: {
                    type: "t",
                    value: this.bgImages[this.state.next],
                },
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            opacity: 1.0,
        })
        return this
    }

    setMesh = () => {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(0, 0, 0)

        return this
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }

    animate = () => {
        this.frameId = window.requestAnimationFrame(this.animate)
        this.renderer.render(this.scene, this.camera)
    }

    setRenderer = () => {
        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true,
        })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0xffffff, 0.0)
        this.renderer.setSize(this.renderW, this.renderH)

        return this
    }

    handleScrollEvents = event => {
        let next

        if (event.deltaY > 20) {
            next =
                this.state.current === this.titles.length - 1
                    ? 0
                    : this.state.current + 1
            this.masterTL(next)
        } else if (event.deltaY < -20) {
            next =
                this.state.current - 1 < 0
                    ? this.titles.length - 1
                    : this.state.current - 1
            this.masterTL(next)
        }
    }

    handleTouchEvents = event => {
        console.log(this.touchStart, event.touches[0].clientY)
    }

    imageTL = next => {
        this.material.uniforms.nextImage.value = this.bgImages[next]
        this.material.uniforms.nextImage.needsUpdate = true

        // const tl = new TimelineMax()
        let tl = gsap.timeline()

        tl.to(this.material.uniforms.dispFactor, {
            duration: 1.4,
            value: 1,
            ease: "expo.inOut",
            onComplete: () => {
                this.material.uniforms.currentImage.value = this.bgImages[next]
                this.material.uniforms.currentImage.needsUpdate = true
                this.material.uniforms.dispFactor.value = 0.0
            },
        })

        return tl
    }

    initialTitleTL = next => {
        // const tl = new TimelineMax({
        //     onComplete: () => {
        //         this.setState({ current: next })

        //         TweenMax.fromTo(
        //             this.titleRef.current,
        //             1,
        //             { opacity: 0, filter: "blur(10px)", y: 48 },
        //             {
        //                 opacity: 1,
        //                 filter: "blur(0px)",
        //                 y: 0,
        //                 ease: Expo.easeOut,
        //             }
        //         )
        //     },
        // })
        let tl = gsap.timeline({
            onComplete: () => {
                this.setState({ current: next })

                gsap.fromTo(
                    this.titleRef.current,
                    { autoAlpha: 0, filter: "blur(10px)", y: 48 },
                    {
                        duration: 1,
                        autoAlpha: 1,
                        filter: "blur(0px)",
                        y: 0,
                        ease: "expo.out",
                    }
                )
            },
        })

        tl.to(this.titleRef.current, {
            duration: 1,
            autoAlpha: 0,
            filter: "blur(10px)",
            y: -48,
            ease: "expo.inOut",
        })

        return tl
    }

    numberTL = () => {
        // const tl = new TimelineMax({
        //     onComplete: () => {
        //         TweenMax.fromTo(
        //             this.numberRef.current,
        //             0.7,
        //             {
        //                 opacity: 0,
        //                 // transform: "perspective(300px) translateY(80%) rotateX(-30deg)",
        //                 xPercent: -101,
        //             },
        //             {
        //                 opacity: 1,
        //                 // transform:
        //                 //     "perspective(300px) translateY(0) rotateX(0)",
        //                 xPercent: 0,
        //                 y: 0,
        //                 ease: Expo.easeOut,
        //             }
        //         )
        //     },
        // })
        let tl = gsap.timeline({
            onComplete: () => {
                gsap.fromTo(
                    this.numberRef.current,
                    {
                        opacity: 0,
                        xPercent: -101,
                    },
                    {
                        duration: 0.7,
                        opacity: 1,
                        xPercent: 0,
                        y: 0,
                        ease: "expo.out",
                    }
                )
            },
        })

        tl.to(this.numberRef.current, {
            duration: 1,
            opacity: 0,
            xPercent: -101,
            ease: "expo.inOut",
        })

        return tl
    }

    masterTL = next => {
        // const masterTL = new TimelineMax()
        let masterTL = gsap.timeline()

        masterTL
            .add(this.imageTL(next), "<")
            .add(this.initialTitleTL(next), "<")
            .add(this.numberTL(next), "<")
        // .call(this.imageTL(next), 0)
        // .call(this.initialTitleTL(next), 0)
        // .call(this.numberTL(next), 0)

        return masterTL
    }

    componentDidMount() {
        this.build()
        this.animate()
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId)
        this.mount.removeChild(this.renderer.domElement)
    }

    render() {
        const { current, previous } = this.state
        const { scrollPosition } = this.props
        return (
            <>
                <section
                    className="slideshow"
                    onWheel={this.handleScrollEvents}
                    onTouchStart={event =>
                        (this.touchStart = event.touches[0].clientY)
                    }
                    onTouchMove={this.handleTouchEvents}
                >
                    <div
                        className="slideshow__bg"
                        ref={mount => {
                            this.mount = mount
                        }}
                        style={{ width: `100vw`, height: `100vh` }}
                    ></div>
                    <div className="slide">
                        <div className="slide__wrapper">
                            <h1 className="h1 slide__title" ref={this.titleRef}>
                                <Link to={`/${this.slugs[current]}`}>
                                    {this.titles[current]}
                                </Link>
                            </h1>
                        </div>
                    </div>
                    <div className="numbers">
                        <div className="numbers__wrapper">
                            <div className="number number--large">
                                <span ref={this.numberRef}>0{current + 1}</span>
                            </div>
                            <div className="number">
                                <span>/0{this.titles.length}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default props => (
    <StaticQuery
        query={HOME_QUERY}
        render={data => <Slider data={data} {...props} />}
    />
)
