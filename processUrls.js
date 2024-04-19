const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { fetchSiteMap, parseXmlData } = require("./sitemapFetcher");

const sitemapUrl = "https://www.london.gov.uk/sitemap.xml?page=1";

async function processUrls() {
  try {

    const xmlData = await fetchSiteMap(sitemapUrl);
    const urlList = await parseXmlData(xmlData);

    for (const url of urlList) {
      try {

        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Error fetching ${url}: ${response.status}`);
          continue;
        }
        const htmlData = await response.text();
        console.log(htmlData);
        console.log(`Processed data from ${url}`);

      } catch {

        console.error(`Error fetching ${url}: ${error.message}`);
        continue;
      }
    }
  } catch (error) {

    console.error("Error response:", error);
  }
}

module.exports =  {
    processUrls
}