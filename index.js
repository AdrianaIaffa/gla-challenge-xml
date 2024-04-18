const { fetchSiteMap, parseXmlData } = require('./sitemapFetcher');  

const sitemapUrl = "https://www.london.gov.uk/sitemap.xml?page=1"

async function run() {
    try {
        const xmlData = await fetchSiteMap(sitemapUrl)
        const urlList = parseXmlData(xmlData)
        console.log(urlList)

    } catch(error) {
        console.error('Error in main:', error)
    }
}

run()