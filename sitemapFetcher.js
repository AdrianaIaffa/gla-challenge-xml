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

// async function parseXmlData(xmlData) {
//     const parser = new XMLParser();
//     const parsedSiteMap = parser.parse(xmlData)
//     // return parsedSiteMap.urlset.url[0].loc
//     const urlList = []
//     parsedSiteMap.urlset.url.forEach(url => {
//         urlList.push(url.loc)
//     })
//     // const limitedUrlSet = parsedSiteMap.urlset.url.slice(0, 3);
//     // limitedUrlSet.forEach(url => {
//     //     urlList.push(url.loc)
//     // })
//     return urlList
// }

async function parseXmlData(xmlData) {
    const parser = new XMLParser();
    const parsedSiteMap = parser.parse(xmlData);
    const urlList = [];

    for (const url of parsedSiteMap.urlset.url.slice(0, 10)) {
        urlList.push(url.loc);
    }

    return urlList;
}

module.exports = {
    fetchSiteMap,
    parseXmlData
}

// fetchSiteMap(sitemapUrl)
// .then(xmlData => {
//     const parsedSitemap = parseXmlData(xmlData); 
//     console.log(parsedSitemap);
// })
// .catch(error => console.error('errorfetching:', error))