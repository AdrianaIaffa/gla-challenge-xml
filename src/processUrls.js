const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { fetchSiteMap, parseXmlData } = require("./sitemapFetcher");
const HTMLParser = require('node-html-parser')
const readlineSync = require('readline-sync')
const ProgressBar = require('cli-progress'); 
const fs = require('fs');
const path = require('path');


const sitemapUrl = "https://www.london.gov.uk/sitemap.xml?page=1";

async function processUrls() {
  try {
    const xmlData = await fetchSiteMap(sitemapUrl);
    const urlList = await parseXmlData(xmlData);

    const keyword = readlineSync.question('Enter keyword or phrase: ')
    console.log()
    const results = []

    const bar = new ProgressBar.SingleBar({}, ProgressBar.Presets.shades_classic); 
    bar.start(urlList.length, 0); 

    for (const url of urlList) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Error fetching ${url}: ${response.status}`);
          continue;
        }

        const htmlData = await response.text();
        const root = HTMLParser.parse(htmlData); 

        const body = root.querySelector('body');
        if (body) { 
          const unwantedTags = ['script', 'style', 'meta', 'link'];
          unwantedTags.forEach(tagName => {
            body.querySelectorAll(tagName).forEach(node => node.remove());
          });

          const bodyText = body.textContent.toLowerCase();

          const fileName = url.split('/').pop() || 'index';
          const folderPath = path.join(__dirname, 'html_files'); 
          if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath); 
          }
          const filePath = path.join(folderPath, `${fileName}.txt`);
          fs.writeFileSync(filePath, bodyText);
          console.log(`Successfully saved HTML content for ${url} to html_files`);

          const keywordRegExp = new RegExp('\\b' + keyword + '\\b', 'g');
          const matches = bodyText.match(keywordRegExp);

          if (matches !== null) {
              const matchesOnPage = matches.length;
              console.log()
              console.log(`Keyword: ${keyword} - Times Found: ${matchesOnPage} `);
              if (matchesOnPage > 0) {
                  results.push({ url, count: matchesOnPage, keyword });
              }
          } else {
              console.log(`No matches found for keyword in ${url}`);
          }
          console.log()
          console.log(`Processed data from ${url}`); 
          console.log()
       } 

      } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
        continue;
      }
      bar.increment();
    } 
    
    bar.update(urlList.length)
    bar.stop()
    console.log()
    return { keyword, results }
  } catch (error) {
    console.error("Error response:", error);
  }
}

module.exports =  {
    processUrls
}
