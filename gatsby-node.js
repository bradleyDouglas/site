/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

// You can delete this file if you're not using it
// const createPages = require(`./create/createPages`)

// exports.createPages = async ({ actions, graphql }) => {
//     await createPages({ actions, graphql })
// }

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const projects = await graphql(`
        {
            allPrismicProject(
                sort: { fields: last_publication_date, order: DESC }
            ) {
                edges {
                    node {
                        id
                        uid
                        data {
                            project_title {
                                text
                            }
                            featured_image {
                                localFile {
                                    childImageSharp {
                                        original {
                                            src
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    const template = path.resolve('src/templates/project.js')
    const projectsLength = projects.data.allPrismicProject.edges.length
    projects.data.allPrismicProject.edges.forEach(({ node }, index) => {
        createPage({
            path: `/${node.uid}`,
            component: template,
            context: {
                uid: node.uid,
                next:
                    index === projectsLength - 1
                        ? projects.data.allPrismicProject.edges[0].node
                        : projects.data.allPrismicProject.edges[index + 1].node,
                nextSlug:
                    index === projectsLength - 1
                        ? projects.data.allPrismicProject.edges[0].node.uid
                        : projects.data.allPrismicProject.edges[index + 1].node
                              .uid,
                index: index,
            },
        })
    })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /locomotive-scroll/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
}
