import React from "react";

const portfolioData = [
  {
    label: "DEPOSITS",
    coins: [
      { date: "Date", name: "Coin", amount: "Quantity", isHeading: true },
      { date: "13/03/2025", name: "USDT", amount: "$1000" },
    ],
  },
  {
    label: "CRYPTO",
    coins: [
      { name: "Coin", amount: "Quantity", isHeading: true },
      { name: "XRP", amount: "Soon" },
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
    coins: [{ name: "USDT", amount: "$1000" }],
  },
  {
    label: "TOTAL ASSET VALUE",
    coins: [
      { name: "Coin", amount: "Amount", isHeading: true },
      { name: "KLV", amount: "Soon" },
    ],
  },
];

const Portfolio = () => {
  return (
    <div className="portfolio-screen flex-col mid relative">
      <h1>PORTFOLIO</h1>
      <h2>VIP 007</h2>

      {portfolioData.map((container, index) => (
        <div key={index} className="container flex-col mid">
          <div className="label">
            <p>{container.label}</p>
          </div>

          <div className="box">
            {/* ✅ Render heading row only if it exists */}
            {container.coins.some((coin) => coin.isHeading) && (
              <div className="coin-row heading" data-has-date={container.coins[0].date ? "true" : "false"}>
                {container.coins[0].date && <span className="coin-date">{container.coins[0].date}</span>}
                <span className="coin-name">{container.coins[0].name}</span>
                <span className="coin-amount">{container.coins[0].amount}</span>
              </div>
            )}

            {/* ✅ Map through the remaining coins (excluding heading) */}
            {container.coins
              .filter((coin) => !coin.isHeading)
              .map((coin, i) => (
                <div key={i} className="coin-row" data-has-date={coin.date ? "true" : "false"}>
                  {coin.date && <span className="coin-date">{coin.date}</span>}
                  <span className="coin-name">{coin.name}</span>
                  <span className="coin-amount">{coin.amount}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
