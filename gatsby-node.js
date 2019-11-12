/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const data = require("./src/data/index").data

// You can delete this file if you're not using it
// const createPages = require(`./create/createPages`)

// exports.createPages = async ({ actions, graphql }) => {
//     await createPages({ actions, graphql })
// }

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    const projectTemplate = path.resolve("./src/templates/project.js")

    console.log(data)

    data.forEach((project, index) => {
        console.log(` create page: ${project.slug}`)

        // createPage({
        //     path: project.slug,
        //     component: projectTemplate,
        // })
    })

    // return new Promise((resolve, reject) => {
    //     // to create the page we need access to the project template
    //     const projectTemplate = path.resolve("src/templates/project.js")

    //     resolve(
    //         graphql(
    //             `
    //                 {
    //                     allFile(
    //                         filter: { sourceInstanceName: { eq: "projects" } }
    //                     ) {
    //                         nodes {
    //                             id
    //                         }
    //                     }
    //                 }
    //             `
    //         ).then(result => {
    //             if (result.errors) {
    //                 console.log(result.errors)
    //                 reject(result.errors)
    //             }
    //             result.data.allFile.nodes.forEach(({ node }) => {
    //                 // you can see node value in the screenshot
    //                 // const path = node.frontmatter.path;
    //                 console.log(node.id)

    //                 createPage({
    //                     path,
    //                     component: postTemplate,
    //                     context: {
    //                         /*
    //                     the value passed in the context will be available for you to use in your page queries as a GraphQL variable, as per the template snippet */
    //                         pathSlug: path,
    //                     },
    //                 })
    //                 resolve()
    //             })
    //         })
    //     )
    // })
}
