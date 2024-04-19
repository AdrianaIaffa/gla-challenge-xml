const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { fetchSiteMap, parseXmlData } = require("./sitemapFetcher");
const HTMLParser = require('node-html-parser')
const readlineSync = require('readline-sync')

const sitemapUrl = "https://www.london.gov.uk/sitemap.xml?page=1";

async function processUrls() {
  try {

    const xmlData = await fetchSiteMap(sitemapUrl);
    const urlList = await parseXmlData(xmlData);

    const keyword = readlineSync.question('Enter keyword or phrase: ')
    // const totalMatches = []
    for (const url of urlList) {
        
      try {
        
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Error fetching ${url}: ${response.status}`);
          continue;
        }
        const htmlData = await response.text();
        // console.log(htmlData);
       
       const root = HTMLParser.parse(htmlData)
       const bodyText = root.querySelector('body').textContent;

       const keywordRegExp = new RegExp(keyword, 'gi')
       const matches = bodyText.match(keywordRegExp)
       
       if(matches === null) {
        console.log("no matches")
       } else {
        // totalMatches.push(matches.length)
        console.log(`Keyword: ${keyword} - Times Found: ${matches.length} (on page: ${url})`)
       }
       

       console.log(`Processed data from ${url}`);
    //    console.log(bodyText)
    

      } catch (error) {

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