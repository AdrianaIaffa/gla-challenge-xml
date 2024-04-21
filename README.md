# Project Description

This project automatically analyses web pages listed within a specific sitemap (`https://www.london.gov.uk/sitemap.xml?page=1`) to locate a keyword or phrase that you input. After scanning, it generates a CSV file report with details including the frequency of appearances of the keyword and the URLs where they were found.

# Prerequisites
Requires [Node.js](https://nodejs.org/en) to run. You can download and install it from the official [Node.js](https://nodejs.org/en) website.

# Installation
 * Clone or Download the Project: Get the project code from your repository.
 * Navigate to the Project Directory: Open a terminal or command prompt and navigate to the root of the project directory.
 * Install Dependencies: Install the required libraries using the following command:
    ```sh
    npm install fast-csv fast-xml-parser node-fetch node-html-parser readline-sync 
    ```

# Usage
* Run the Project: Execute the project from your terminal:
    ```sh
    node index.js
    ```
 * Enter a Keyword: The script will prompt you to enter the keyword or phrase you want to search for. Type it in and press enter.

* The project is currently limited to retrieve 3 urls for testing purposes

* Report Generation: Once the analysis is complete, a CSV report named "search_report.csv" will be created in your project directory. The report will include the following columns:
    1. * Keyword: The keyword you searched for.
    2. * Count: Number of times the keyword appeared on a page.
    3. * URL: The page's address where the keyword was found.

# Required Libraries

* [ **fast-csv:**](https://www.npmjs.com/package/fast-csv) A library for parsing and creating CSV (Comma-Separated Values) files quickly and efficiently.
* [**fast-xml-parser:**](https://www.npmjs.com/package/fast-xml-parser) Designed to convert XML data into JavaScript objects/JSON and vice versa. It offers high performance and flexibility.
* [ **node-fetch:**](https://www.npmjs.com/package/node-fetch) A lightweight module that brings the familiar fetch function for making HTTP requests within Node.js environments.
* [**node-html-parser:**](https://www.npmjs.com/package/node-html-parser) Parses HTML strings into a convenient tree structure for manipulation or extraction of data.
* [ **readline-sync:** ](https://www.npmjs.com/package/readline-sync)Provides a way to get user input in a Node.js application in a synchronous fashion, allowing you to pause script execution until input is received.


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
