const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { XMLParser } = require('fast-xml-parser')

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

async function parseXmlData(xmlData) {
    const parser = new XMLParser();
    const parsedSiteMap = parser.parse(xmlData)
    return parsedSiteMap
}

fetchSiteMap(sitemapUrl)
.then(xmlData => {
    const parsedSitemap = parseXmlData(xmlData); 
    console.log(parsedSitemap);
})
.catch(error => console.error('errorfetching:', error))