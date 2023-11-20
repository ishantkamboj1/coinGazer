import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import fs from 'fs';



const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    
    const response = await axios.get("https://data-api.binance.vision/api/v3/ticker/price?symbols=[\"BTCUSDT\",\"ETHUSDT\",\"DOTUSDT\",\"MATICUSDT\",\"SOLUSDT\",\"BNBUSDT\"]");

    
    const prices = {
      BTCUSDT: '',
      ETHUSDT: '',
      DOTUSDT: '',
      MATICUSDT: '',
      SOLUSDT: '',
      BNBUSDT: ''
    };

    
    response.data.forEach(item => {
      prices[item.symbol] = `${item.symbol}: ${parseFloat(item.price).toFixed(2)}`;
    });

    fs.readFile('./Public/ticker.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading symbols file:', err);
        res.status(500).send('Server error');
        return;
      }
      const symbols = data.split('\n').filter(Boolean); 

      
      res.render("index.ejs", { prices, symbols });
    });
  } catch (error) {
    
    console.error("Error fetching data from API:", error.message);
    res.status(500).send("Error fetching data.");
  }
});

app.get("/fetch-data", async (req, res) => {
  const selectedSymbol = req.query.ticker; 

  try {
    
    const selectedSymbolResponse = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedSymbol}`);
    const { symbol, priceChange, priceChangePercent, lastPrice, highPrice, lowPrice, volume } = selectedSymbolResponse.data;

    const formattedVolume = parseFloat(volume).toFixed(2)

   
    const pricesResponse = await axios.get("https://data-api.binance.vision/api/v3/ticker/price?symbols=[\"BTCUSDT\",\"ETHUSDT\",\"DOTUSDT\",\"MATICUSDT\",\"SOLUSDT\",\"BNBUSDT\"]");
    const prices = {};
    pricesResponse.data.forEach(item => {
      prices[item.symbol] = `${item.symbol}: ${parseFloat(item.price).toFixed(2)}`;
    });

    
    const symbolsData = fs.readFileSync('./Public/ticker.txt', 'utf8');
    const symbols = symbolsData.split('\n').filter(Boolean);

    
    res.render("index.ejs", {
        symbol,
        symbols,
        prices, 
        priceChange,
        priceChangePercent,
        lastPrice,
        highPrice,
        lowPrice,
        volume: formattedVolume
    });

  } catch (err) {
    console.error("Error fetching data from Binance API:", err.message);
    res.status(500).send("Error fetching data.");
  }
});



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });