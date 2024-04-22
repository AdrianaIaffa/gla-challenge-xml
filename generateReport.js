const fastcsv = require('fast-csv');
const { processUrls } = require('./processUrls'); 
const fs = require('fs');
const { jsPDF } = require("jspdf");


async function generateReport(keyword, results) {
  try { // Wrap code in a try block for potential errors
      const csvData = results.map(result => ({
          keyword: keyword,       
          "total count": result.count,
          url: result.url         
      }));

      const filename = `search_report_keyword_${keyword}.csv`;
      const ws = fs.createWriteStream(filename); 

      fastcsv
          .write(csvData, { headers: true }) 
          .pipe(ws)
          .on('error', (error) => { // Error handling for CSV writing
              console.error('Error writing CSV:', error);
          }) 
          .on('finish', () => {
              console.log(`CSV report generated as ${filename}`);
              generatePDFReport(keyword, results); 
          });  
      
  } catch (error) { 
      console.error('Error generating report:', error); 
  }
}

function generatePDFReport(keyword, results) {
  try {
      const doc = new jsPDF();

      doc.text(`Search Report for Keyword: ${keyword}`, 10, 10);
      let y = 20;

      // ... (rest of your PDF generation logic) ...

      const pdfFilename = `search_report_keyword_${keyword}.pdf`;
      doc.save(pdfFilename); 

      console.log(`PDF report generated as ${pdfFilename}`);

  } catch (error) {
      console.error('Error generating PDF report:', error);
      // Potential Improvement: Handle error propagation or reporting
  }
}


module.exports = { generateReport }; 