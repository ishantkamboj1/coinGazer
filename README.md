# coinGazer
Cryptocurrency Price Tracker

Overview
This Node.js application is designed to track real-time cryptocurrency prices using the Binance API. Built with Express.js for the server framework and EJS for templating, it provides an intuitive user interface to view the latest prices and detailed 24-hour statistics for various cryptocurrencies.

Features
Real-time Price Display: Shows the latest prices of multiple cryptocurrencies including BTC, ETH, DOT, MATIC, SOL, and BNB.
Detailed Cryptocurrency Statistics: Offers detailed 24-hour trading statistics for any selected cryptocurrency.
User-friendly Interface: Utilizes EJS templates for rendering a clean and easily navigable user interface.


Before you begin, ensure you have the following installed: Node.js, npm (Node Package Manager)

Installation
Clone the Repository: git clone https://github.com/ishantkamboj1/coinGazer

Navigate to the Project Directory:cd coinGazer

Install Dependencies: npm install


Application Structure
public/: Contains static files like stylesheets and images.
views/: Stores EJS templates for rendering the HTML views.

API Endpoints
GET /: Home page displaying real-time cryptocurrency prices.
GET /fetch-data: Endpoint for fetching detailed 24-hour statistics of a selected cryptocurrency.

Data Sources
Binance API: Used for fetching real-time prices and 24-hour trading statistics of cryptocurrencies.
