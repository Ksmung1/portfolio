import React from "react";

const portfolioData = [
  {
    label: "ALTCOINS",
    coins: [
      { name: "Coin", amount: "Amount", isHeading: true },
      { name: "KLV", amount: "Soon" },
    ],
  },
  {
          label: "PRE-SALE Projects",
          coins: [
            { name: "Coin", amount: "Amount", isHeading: true },
            { name: "FROX", amount: "Soon" },
          ],
        },
  {
    label: "FUTURE TRADING",
    coins: [
      { name: "Coin", amount: "Amount", isHeading: true },
      { name: "USDT", amount: "Soon" },
      { name: "USDC", amount: "Soon" },
    ],
  },
  {
    label: "RESERVED DOLLAR",
    coins: [
           { name: "USDT", amount: "Soon" }],
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
