import React from "react";

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
      { date:'Date', invested:'Invested ($)',ppt:'Price Per Token ($)', name: "Coins", amount: "Quantity", isHeading: true },
      { date:'14/03/25',invested:'500',ppt:'0.002317', name: "KLV", amount: "215796" },
    ],
  },
  {
    label: "PRE-SALE",
    coins: [
      { name: "Coin", amount: "Quantity", isHeading: true },
      { name: "Soon", amount: "Soon" },
    ],
  },
  {
    label: "FUTURE TRADING",
    coins: [
      { name: "Coin", amount: "Quantity", isHeading: true },
      { name: "USDT", amount: "Soon" },
      { name: "USDC", amount: "Soon" },
    ],
  },
  {
    label: "RESERVED DOLLAR",
    coins: [{ name: "USDT", amount: "$500" }],
  },

];

const Portfolio = () => {
  return (
    <div className="portfolio-screen flex-col mid">
      <h1>PORTFOLIO</h1>
      <h2>VIP 007</h2>


      {portfolioData.map((container, index) => {
        // Get all keys dynamically
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

    <div className="label flex-row gap" style={{background:'green', padding:'10px'}}><p style={{background: 'green'}} className="left">TOTAL ASSETS VALUE</p>
    <p ><strong style={{background: 'green'}}>$1000</strong></p></div>
    </div>
  );
};


export default Portfolio;
