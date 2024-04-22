const { fetchSiteMap, parseXmlData } = require('./sitemapFetcher');  
const { processUrls } = require('./processUrls')
const { generateReport } = require('./generateReport');

const sitemapUrl = "https://www.london.gov.uk/sitemap.xml?page=1"


async function run() {
    try {
        const { keyword, results } = await processUrls(); // Destructuring return values
        await generateReport(keyword, results); 
    } catch (error) {
        console.error('Error in main:', error);
    }
}

run();