const fastcsv = require('fast-csv');
const { processUrls } = require('./processUrls'); 
const fs = require('fs');


async function generateReport(keyword, results) {
    const csvData = results.map(result => [keyword, result.count, result.url]); 

    const ws = fs.createWriteStream("search_report.csv");
    fastcsv
      .write(csvData, { headers: true }) 
      .pipe(ws);

    console.log("CSV report generated as search_report.csv"); 
}

module.exports = { generateReport }; 