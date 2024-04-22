# Project Description

This project automatically analyses web pages listed within a specific sitemap (`https://www.london.gov.uk/sitemap.xml?page=1`) to locate a keyword or phrase that you input. After scanning, it generates a CSV file report with details including the frequency of appearances of the keyword and the URLs where they were found.

# Prerequisites
Requires [Node.js](https://nodejs.org/en) to run. You can download and install it from the official [Node.js](https://nodejs.org/en) website.

# Installation
 * Clone or Download the Project: Get the project code from your repository.
 * Navigate to the Project Directory: Open a terminal or command prompt and navigate to the root of the project directory.
 * Install Dependencies: Install the required libraries using the following command:
    ```sh
    npm install fast-csv fast-xml-parser node-fetch node-html-parser readline-sync cli-progress jspdf

    ```

# Usage
1. * Modify URL limit (optional):
Open the sitemapFetcher.js file.
Within the for loop (for (const url of parsedSiteMap.urlset.url.slice(0, 1))), adjust the number inside the slice() method to control how many URLs you want to process.

2. * Start the project: In your terminal, run the following command:
    ```sh
    node index.js
    ```
 
3. * Enter a Keyword: After a couple of seconds, you'll be asked to provide the keyword or phrase you want to search for. Type it in and press enter.

4. * Wait for the analysis: The script will process the web pages, searching for your keyword. You'll see a progress bar in your terminal.

5. * Find the results: Once finished, the project will generate these resources:

    1. * html_files folder: Contains extracted text content from each analyzed webpage (as .txt files). To double-check results, use "Find" (Ctrl+F or Cmd+F) within your code editor, making sure to select "Match whole word".
    2. * search_report_keyword_{keyword}.csv: A CSV file showing the URLs and how many times your keyword appeared on each page.
    3. * search_report_keyword_{keyword}.pdf: A PDF report giving you a user-friendly overview of the findings.

# Required Libraries

* [**fast-csv:**](https://www.npmjs.com/package/fast-csv) A library for parsing and creating CSV (Comma-Separated Values) files quickly and efficiently.
* [**fast-xml-parser:**](https://www.npmjs.com/package/fast-xml-parser) Designed to convert XML data into JavaScript objects/JSON and vice versa. It offers high performance and flexibility.
* [**node-fetch:**](https://www.npmjs.com/package/node-fetch) A lightweight module that brings the familiar fetch function for making HTTP requests within Node.js environments.
* [**node-html-parser:**](https://www.npmjs.com/package/node-html-parser) Parses HTML strings into a convenient tree structure for manipulation or extraction of data.
* [**readline-sync:** ](https://www.npmjs.com/package/readline-sync)Provides a way to get user input in a Node.js application in a synchronous fashion, allowing you to pause script execution until input is received.
* [**cli-progress:**](https://www.npmjs.com/package/cli-progress) A library for showing progress bars in the terminal.
* [**jspdf:**](https://www.npmjs.com/package/jspdf) A library for generating PDF files.



# Workflow
Here is a step by step on how I approached this project [Notion](https://difficult-lipstick-2e0.notion.site/Code-Challenge-42dec6420fbb466a89c589c3f05fe722?pvs=4)
**Workflow**

1. **Retrieving Sitemap URLs**

   * **Fetch Sitemap:** Make an HTTP request to retrieve the content of the XML sitemap (`https://www.london.gov.uk/sitemap.xml?page=1`).
   * **Parse XML:** Use an XML parsing tool to convert the XML sitemap into a structured format that your code can easily work with (e.g., an array of URLs).

2. **Keyword Input**

   * **User Prompt:** Employ a mechanism to accept a keyword or phrase from the user. This could be a command-line argument, a simple text input field if you're building a basic UI, or some other input method.

3. **Processing URLs (Sequentially)**

   * **Iterate through URLs:** Create a loop to process each extracted URL from the sitemap. 
   * **For each URL:**
      * **Fetch HTML Content:** Make an HTTP request to get the HTML of the target webpage.
      * **Load HTML:** Use an HTML parsing tool to load the HTML into a data structure you can query and manipulate.
      * **Search within Body:** Isolate the `<body>` section of the HTML. Use the HTML parsing tool's capabilities to search exclusively within the `<body>` for the user-provided keyword/phrase, keeping track of the count.

4. **Generating the Report**

   * **Display Total Count:** Output the total number of times the keyword/phrase was found across all webpages.
   * **List URLs:** Print the URLs where the keyword/phrase was located.

**Choosing Libraries**
For each core action search terms:

 * "Node.js library for HTTP requests"
 * "Node.js XML parsing"
 * "Node.js HTML parsing and search"
 * "Node.js user prompt terminal "
