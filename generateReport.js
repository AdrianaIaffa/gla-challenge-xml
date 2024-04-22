const fastcsv = require("fast-csv");
const { processUrls } = require("./processUrls");
const fs = require("fs");
const { jsPDF } = require("jspdf");

async function generateReport(keyword, results) {
  try {
    const csvData = results.map((result) => ({
      keyword: keyword,
      "total count": result.count,
      url: result.url,
    }));

    const filename = `search_report_keyword_${keyword}.csv`;
    const ws = fs.createWriteStream(filename);

    fastcsv
      .write(csvData, { headers: true })
      .pipe(ws)
      .on("error", (error) => {
        console.error("Error writing CSV:", error);
      })
      .on("finish", () => {
        console.log(`CSV report generated as ${filename}`);
        generatePDFReport(keyword, results);
      });
  } catch (error) {
    console.error("Error generating report:", error);
  }
}

function generatePDFReport(keyword, results) {
  
  try {
    const doc = new jsPDF();

    doc.text(`Search Report for Keyword: ${keyword}`, 10, 10);
    let y = 20;

    doc.text("Keyword", 10, y);
    doc.text("Total Count", 70, y);
    doc.text("URL", 130, y);

    y += 10;

    results.forEach((result) => {
      doc.text(keyword, 10, y);
      doc.text(result.count.toString(), 70, y);
      doc.text(result.url, 130, y);
      y += 10;
    });

    const pdfFilename = `search_report_keyword_${keyword}.pdf`;
    doc.save(pdfFilename);

    console.log(`PDF report generated as ${pdfFilename}`);
  } catch (error) {
    console.error("Error generating PDF report:", error);
  }
}

module.exports = { generateReport };
