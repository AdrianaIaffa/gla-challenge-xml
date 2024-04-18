const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));

const sitemapUrl = "https://www.london.gov.uk/sitemap.xml?page=1"

async function fetchSiteMap(sitemapUrl) {
    try {
        const response = await fetch(sitemapUrl)
        if(!response.ok) {
            console.error(`Error Response: ${response.status}`)
        }
        const xmlData = await response.text()
        return xmlData
    } catch (error) {
        console.error('Error Response:', error)
    }
}

fetchSiteMap(sitemapUrl)
.then(xmlData => console.log(xmlData))
.catch(error => console.error('errorfetching:', error))