const fastcsv = require('fast-csv');
const { processUrls } = require('./processUrls'); 
const fs = require('fs');


async function generateReport(keyword, results) {
    const csvData = results.map(result => ({
      keyword: keyword,       
      "total count": result.count,  
      url: result.url         
  }));

  const filename = `search_report_keyword_${keyword}.csv`;
    const ws = fs.createWriteStream(filename);
    fastcsv
      .write(csvData, { headers: true }) 
      .pipe(ws);

    console.log(`CSV report generated as ${filename}`); 
}

module.exports = { generateReport }; 