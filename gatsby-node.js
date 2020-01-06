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
            allPrismicProject {
                edges {
                    node {
                        id
                        uid
                    }
                }
            }
        }
    `)
    const template = path.resolve("src/templates/project.js")
    projects.data.allPrismicProject.edges.forEach(edge => {
        createPage({
            path: `/${edge.node.uid}`,
            component: template,
            context: {
                uid: edge.node.uid,
            },
        })
    })
}
