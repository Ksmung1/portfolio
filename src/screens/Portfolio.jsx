import React from "react";

const portfolioData = [
  {
    label: "ALTCOINS",
    coins: [
      { name: "Coin", amount: "Amount", isHeading: true },
      { name: "BTC", amount: 2 },
      { name: "ETH", amount: 5 },
    ],
  },
  {
    label: "FUTURE TRADING",
    coins: [
      { name: "Coin", amount: "Amount", isHeading: true },
      { name: "USDT", amount: 1000 },
      { name: "USDC", amount: 500 },
    ],
  },
  {
    label: "RESERVED DOLLAR",
    coins: [
           { name: "USDT", amount: 10000 }],
  },
];

const Portfolio = () => {
  return (
    <div className="portfolio-screen flex-col mid relative">
      <h1>PORTFOLIO</h1>

      {portfolioData.map((container, index) => (
        <div key={index} className="container flex-col mid">
          <div className="label">
            <p>{container.label}</p>
          </div>
          <div className="box grid">
            {container.coins.map((coin, i) => (
              <div
                key={i}
                className={`coin-row ${coin.isHeading ? "heading" : ""}`}
              >
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
