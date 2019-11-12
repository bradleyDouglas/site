const path = require(`path`)

module.exports = async ({ actions, graphql }) => {
    const GET_PROJECTS = `
        query MyQuery {
            allFile(filter: {sourceInstanceName: {eq: "projects"}}) {
                nodes {
                    id
                }
            }
        }
    `
    const { createPage } = actions
    const allProjects = []
    const fetchProjects = async variables =>
        await graphql(GET_PROJECTS, variables).then(({ data }) => {
            const {
                allFile: { nodes: projects },
            } = data
            projects.map(project => {
                allProjects.push(project)
            })
            return allProjects
        })

    await fetchProjects({ first: 100, after: null }).then(allProjects => {
        const pageTemplate = path.resolve(`./src/templates/project.js`)

        allProjects.map(project => {
            console.log(`create page: ${project}`)
            // createPage({
            //     path: `/${page.uri}`,
            //     component: pageTemplate,
            //     context: page,
            // })
        })
    })
}
