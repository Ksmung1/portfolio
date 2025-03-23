import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Portfolio = () => {
  const [prices, setPrices] = useState({ XRP: null, KLV: null });
  const [totalValue, setTotalValue] = useState(0)
  const [profitLoss, setProfitLoss] = useState(0)

  useEffect(() => {
    const fetchPrices = () => {
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=ripple,klever&vs_currencies=usd")
        .then(response => response.json())
        .then(data => {
          setPrices({ XRP: data.ripple.usd, KLV: data.klever.usd });
        })
        .catch(error => console.error("Error fetching prices:", error));
    };
  
    fetchPrices(); // Fetch once immediately
    const interval = setInterval(fetchPrices, 5000); 
  
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  

  const portfolioData = [
    {
      label: "DEPOSITS",
      coins: [
        { date: "Date", name: "Coin", amount: "Quantity", isHeading: true },
        { date: "13/03/25", name: "USDT", amount: "$1000" },
      ],
    },
    {
      label: "CRYPTO",
      coins: [
        { date: 'Date', invested: 'Invested ($)', ppt: 'Buying Price ($)', name: "Coins", amount: "Quantity", isHeading: true, currentPrice: "Current Price" },
        { date: '14/03/25', invested: '500', ppt: '0.0023', name: "KLV", amount: "215796", currentPrice: prices.KLV ? `$${prices.KLV}` : "Loading..." },  // ✅ Dynamic KLV price
        { date: '13/03/25', invested: '500', ppt: '2.224', name: "XRP", amount: "224.82", currentPrice: prices.XRP ? `$${prices.XRP}` : "Loading..." },  // ✅ Dynamic XRP price
      ],
    },
    // {
    //   label: "PRE-SALE",
    //   coins: [
    //     { name: "Coin", amount: "Quantity", isHeading: true },
    //     { name: "Soon", amount: "Soon" },
    //   ],
    // },
    // {
    //   label: "FUTURE TRADING",
    //   coins: [
    //     { name: "Coin", amount: "Quantity", isHeading: true },
    //     { name: "USDT", amount: "Soon" },
    //     { name: "USDC", amount: "Soon" },
    //   ],
    // },
    {
      label: "RESERVED DOLLAR",
      coins: [{ name: "USDT", amount: "$0" }],
    },
  ];
  const cryptoData = portfolioData.find(container => container.label === "CRYPTO");

  const investedAmounts = cryptoData 
    ? cryptoData.coins
        .filter(coin => !coin.isHeading) // Exclude headings
        .map(coin => ({ name: coin.name, invested: Number(coin.invested) })) 
    : [];
    const chartData = [
      { 
        name: "XRP", 
        invested: investedAmounts.find(coin => coin.name === "XRP")?.invested || 0, 
        fill:'green'
      },
      { 
        name: "KLV", 
        invested: investedAmounts.find(coin => coin.name === "KLV")?.invested || 0, 
        fill: 'blue'
      },
      { 
        name: "USDT", 
        invested: 0,
        fill: 'white'
      }
    ];
    
  const calculateProfit = () => {
    let totalDeposits = 0;
    let totalCryptoValue = 0;
    let reservedDollar = 0;
  
    // ✅ Store total deposit amount
    portfolioData.forEach(container => {
      if (container.label === "DEPOSITS") {
        container.coins.forEach(coin => {
          if (!coin.isHeading) totalDeposits += Number(coin.amount.replace("$", ""));
        });
      }
    });
  
    // ✅ Calculate total crypto value (amount * currentPrice)
    portfolioData.forEach(container => {
      if (container.label === "CRYPTO") {
        container.coins.forEach(coin => {
          if (!coin.isHeading) {
            totalCryptoValue += coin.amount * parseFloat(coin.currentPrice.replace("$", ""));
          }
        });
      }
    });
  
    // ✅ Calculate reserved dollar amount
    portfolioData.forEach(container => {
      if (container.label === "RESERVED DOLLAR") {
        container.coins.forEach(coin => {
          reservedDollar += Number(coin.amount.replace("$", ""));
        });
      }
    });
  
    // ✅ Apply correct formula
    let totalValue = totalCryptoValue + reservedDollar;
    setTotalValue(totalValue.toFixed(2));
  
    let profitOrLoss = totalValue - totalDeposits;
    setProfitLoss(profitOrLoss.toFixed(2));
  };
  

  useEffect(() => {
    if (prices.XRP && prices.KLV) {
      calculateProfit(); // Update profit/loss when prices change
    }
    //eslint-disable-next-line
  }, [prices]);
  return (
    <div className="portfolio-screen flex-col mid">
      <h1>PORTFOLIO</h1>
      <h2>VIP 007</h2>

      {portfolioData.map((container, index) => {
        const allKeys = [...new Set(container.coins.flatMap(Object.keys))].filter((key) => key !== "isHeading");

        return (
          <div key={index} className="container">
            <div className="label">
              <p>{container.label}</p>
            </div>

            <div className="box">
              {/* ✅ Render Heading Row */}
              {container.coins.some((coin) => coin.isHeading) && (
                <div
                  className="coin-row heading mid"
                  data-has-date={allKeys.includes("date") ? "true" : "false"}
                  data-has-invested={allKeys.includes("invested") ? "true" : "false"}
                  data-has-ppt={allKeys.includes("ppt") ? "true" : "false"}
                  data-has-currentPrice={allKeys.includes("currentPrice") ? "true" : "false"}
                >
                  {allKeys.map((key, i) => (
                    <span key={i} className={`coin-${key}`}>{container.coins[0][key] || "-"}</span>
                  ))}
                </div>
              )}

              {/* ✅ Render Data Rows */}
              {container.coins
                .filter((coin) => !coin.isHeading)
                .map((coin, i) => (
                  <div
                    key={i}
                    className="coin-row mid"
                    data-has-date={allKeys.includes("date") ? "true" : "false"}
                    data-has-invested={allKeys.includes("invested") ? "true" : "false"}
                    data-has-ppt={allKeys.includes("ppt") ? "true" : "false"}
                    data-has-currentPrice={allKeys.includes("currentPrice") ? "true" : "false"}
                  >
                    {allKeys.map((key, j) => (
                      <span key={j} className={`coin-${key}`}>{coin[key] || "-"}</span>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        );
      })}

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
      <Bar 
  dataKey="invested" 
  barSize={40} 
/>
  </BarChart>
</ResponsiveContainer>

      <div className="label flex-row gap" style={{ background: "green", padding: "10px" }}>
        <p style={{ background: "green" }} className="left">TOTAL ASSETS VALUE</p>
        <p><strong style={{ background: "green" }}>{totalValue}</strong></p>
      </div>

      <div className="label flex-row gap" style={{ background: profitLoss < 0 ? "red" : "green", padding: "10px" }}>
  <p style={{ background: profitLoss < 0 ? "red" : "green" }} className="left">PROFIT/LOSS</p>
  <p><strong style={{ background: profitLoss < 0 ? "red" : "green" }}>${profitLoss}</strong></p>
</div>




    </div>
  );
};

export default Portfolio;
