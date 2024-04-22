const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { XMLParser } = require('fast-xml-parser')

const sitemapUrl = "https://www.london.gov.uk/sitemap.xml?page=1"

async function fetchSiteMap(sitemapUrl) {
    try {
        const response = await fetch(sitemapUrl)
        if(!response.ok) {
            console.error(`Error fetching ${sitemapUrl}: ${response.status}`)
        }
        const xmlData = await response.text()
        return xmlData
    } catch (error) {
        console.error('Error fetching sitemap:', error)
    }
}

async function parseXmlData(xmlData) {
    const parser = new XMLParser();
    const parsedSiteMap = parser.parse(xmlData);
    const urlList = [];

    for (const url of parsedSiteMap.urlset.url.slice(0, 1)) {
        urlList.push(url.loc);
    }

    return urlList;
}

module.exports = {
    fetchSiteMap,
    parseXmlData
}

