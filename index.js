const { fetchSiteMap, parseXmlData } = require('./src/sitemapFetcher');  
const { processUrls } = require('./src/processUrls')
const { generateReport } = require('./src/generateReport');

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