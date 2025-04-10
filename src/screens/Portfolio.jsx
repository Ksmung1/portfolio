import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Portfolio = () => {
  const [prices, setPrices] = useState({ XRP: null, KLV: null });
  const [totalValue, setTotalValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);

  const [portfolioData, setPortfolioData] = useState([
    {
      label: "DEPOSITS",
      coins: [
        { date: "Date", name: "Coin", amount: "Quantity", isHeading: true },
        { date: "13/03/25", name: "USDT", amount: "$1000" },
        { date: "06/04/25", name: "USDT", amount: "$1000" },
        { date: "10/04/25", name: "USDT", amount: "$1000" },
      ],
    },
    {
      label: "CRYPTO",
      coins: [
        {
          date: "Date",
          invested: "Invested ($)",
          ppt: "Buying Price ($)",
          name: "Coins",
          amount: "Quantity",
          isHeading: true,
          currentPrice: "Current Price",
        },
        {
          date: "14/03/25",
          invested: "500",
          ppt: "0.0023",
          name: "KLV",
          amount: "215796",
          currentPrice: "Loading...",
        },
        {
          date: "13/03/25",
          invested: "500",
          ppt: "2.224",
          name: "XRP",
          amount: "224.82",
          currentPrice: "Loading...",
        },
      ],
    },
    {
      label: "RESERVED DOLLAR",
      coins: [{ name: "USDT", amount: "$0" }],
    },
  ]);

  // Fetch live prices
  useEffect(() => {
    const fetchPrices = () => {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ripple,klever&vs_currencies=usd"
      )
        .then((response) => response.json())
        .then((data) => {
          const updatedPrices = {
            XRP: data.ripple.usd,
            KLV: data.klever.usd,
          };
          setPrices(updatedPrices);

          // Update live prices in portfolioData
          setPortfolioData((prevData) =>
            prevData.map((container) => {
              if (container.label !== "CRYPTO") return container;
              return {
                ...container,
                coins: container.coins.map((coin) => {
                  if (coin.isHeading) return coin;
                  const live =
                    updatedPrices[coin.name] !== undefined
                      ? `$${updatedPrices[coin.name]}`
                      : "Loading...";
                  return { ...coin, currentPrice: live };
                }),
              };
            })
          );
        })
        .catch((error) => console.error("Error fetching prices:", error));
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const calculateProfit = () => {
      let totalDeposits = 0;
      let totalUsedUSDT = 0;
      let totalCryptoValue = 0;

      portfolioData.forEach((container) => {
        if (container.label === "DEPOSITS") {
          container.coins.forEach((coin) => {
            if (!coin.isHeading) {
              totalDeposits += Number(coin.amount.replace("$", ""));
            }
          });
        }

        if (container.label === "CRYPTO") {
          container.coins.forEach((coin) => {
            if (!coin.isHeading) {
              totalUsedUSDT += Number(coin.invested);
              if (coin.currentPrice.includes("$")) {
                const price = parseFloat(coin.currentPrice.replace("$", ""));
                const qty = parseFloat(coin.amount);
                totalCryptoValue += price * qty;
              }
            }
          });
        }
      });

      const reserved = totalDeposits - totalUsedUSDT;
      const total = totalCryptoValue + reserved;
      const pnl = total - totalDeposits;

      // Update reserve section
      setPortfolioData((prevData) =>
        prevData.map((container) => {
          if (container.label === "RESERVED DOLLAR") {
            return {
              ...container,
              coins: [{ name: "USDT", amount: `$${reserved.toFixed(2)}` }],
            };
          }
          return container;
        })
      );

      setTotalValue(total.toFixed(2));
      setProfitLoss(pnl.toFixed(2));
    };

    if (prices.XRP && prices.KLV) {
      calculateProfit();
    }
  }, [portfolioData, prices]);

  const cryptoData = portfolioData.find((c) => c.label === "CRYPTO");

  const investedAmounts = cryptoData
    ? cryptoData.coins
        .filter((coin) => !coin.isHeading)
        .map((coin) => ({ name: coin.name, invested: Number(coin.invested) }))
    : [];

  const chartData = [
    {
      name: "XRP",
      invested: investedAmounts.find((coin) => coin.name === "XRP")?.invested || 0,
      fill: "green",
    },
    {
      name: "KLV",
      invested: investedAmounts.find((coin) => coin.name === "KLV")?.invested || 0,
      fill: "blue",
    },
    {
      name: "USDT",
      invested: 0,
      fill: "white",
    },
  ];

  return (
    <div className="portfolio-screen flex-col mid">
      <h1>PORTFOLIO</h1>
      <h2>VIP 007</h2>

      {portfolioData.map((container, index) => {
        const allKeys = [
          ...new Set(container.coins.flatMap(Object.keys)),
        ].filter((key) => key !== "isHeading");

        return (
          <div key={index} className="container">
            <div className="label">
              <p>{container.label}</p>
            </div>

            <div className="box">
              {container.coins.some((coin) => coin.isHeading) && (
                <div
                  className="coin-row heading mid"
                  data-has-date={allKeys.includes("date")}
                  data-has-invested={allKeys.includes("invested")}
                  data-has-ppt={allKeys.includes("ppt")}
                  data-has-currentPrice={allKeys.includes("currentPrice")}
                >
                  {allKeys.map((key, i) => (
                    <span key={i} className={`coin-${key}`}>
                      {container.coins[0][key] || "-"}
                    </span>
                  ))}
                </div>
              )}

              {container.coins
                .filter((coin) => !coin.isHeading)
                .map((coin, i) => (
                  <div
                    key={i}
                    className="coin-row mid"
                    data-has-date={allKeys.includes("date")}
                    data-has-invested={allKeys.includes("invested")}
                    data-has-ppt={allKeys.includes("ppt")}
                    data-has-currentPrice={allKeys.includes("currentPrice")}
                  >
                    {allKeys.map((key, j) => (
                      <span key={j} className={`coin-${key}`}>
                        {coin[key] || "-"}
                      </span>
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
          <Bar dataKey="invested" barSize={40} />
        </BarChart>
      </ResponsiveContainer>

      <div className="label flex-row gap" style={{ background: "green", padding: "10px" }}>
        <p style={{ background: "green" }} className="left">
          TOTAL ASSETS VALUE
        </p>
        <p>
          <strong style={{ background: "green" }}>${totalValue}</strong>
        </p>
      </div>

      <div
        className="label flex-row gap"
        style={{
          background: profitLoss < 0 ? "red" : "green",
          padding: "10px",
        }}
      >
        <p
          style={{ background: profitLoss < 0 ? "red" : "green" }}
          className="left"
        >
          PROFIT/LOSS
        </p>
        <p>
          <strong
            style={{ background: profitLoss < 0 ? "red" : "green" }}
          >
            ${profitLoss}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Portfolio;
