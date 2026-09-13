import React, { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { portfolioData } from "../data/portfolioData";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const quantityFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 8,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const formatPrice = (value) => {
  if (value === null || value === undefined) return "Loading…";
  const maximumFractionDigits = value < 0.01 ? 6 : value < 1 ? 4 : 2;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(value);
};

const formatCell = (value, format) => {
  if (value === null || value === undefined) return "—";
  if (format === "currency") return currencyFormatter.format(value);
  if (format === "quantity") return quantityFormatter.format(value);
  if (format === "price") return formatPrice(value);
  if (format === "date") {
    const isMonthOnly = /^\d{4}-\d{2}$/.test(value);
    const normalizedDate = isMonthOnly ? `${value}-01` : value;
    const formatter = isMonthOnly ? monthFormatter : dateFormatter;
    return formatter.format(new Date(`${normalizedDate}T00:00:00Z`));
  }
  return value;
};

const DataTable = ({ section, prices = {} }) => (
  <section className={`portfolio-section portfolio-section-${section.id}`}>
    <div className="section-heading">
      <div>
        <span className="section-kicker">Portfolio ledger</span>
        <h2>{section.label}</h2>
      </div>
      <span className="entry-count">
        {section.rows.length} {section.rows.length === 1 ? "entry" : "entries"}
      </span>
    </div>

    <div className="portfolio-table-wrap">
      <table className="portfolio-table">
        <thead>
          <tr>
            {section.columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row) => (
            <tr key={row.id}>
              {section.columns.map((column) => {
                const value =
                  column.key === "currentPrice" ? prices[row.symbol] : row[column.key];

                return (
                  <td key={column.key} data-label={column.label}>
                    {column.format === "asset" ? (
                      <span className="asset-cell">
                        <span className={`coin-mark coin-mark-${row.symbol.toLowerCase()}`}>
                          {row.symbol.slice(0, 1)}
                        </span>
                        <strong>{row.symbol}</strong>
                      </span>
                    ) : (
                      <span className={column.key === "currentPrice" ? "live-price" : ""}>
                        {formatCell(value, column.format)}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const Portfolio = () => {
  const [prices, setPrices] = useState({});
  const [priceStatus, setPriceStatus] = useState("loading");
  const { deposits, cryptoAssets, reservedAssets, owner } = portfolioData;

  useEffect(() => {
    const controller = new AbortController();
    const priceIds = cryptoAssets.rows.map((asset) => asset.coinGeckoId).join(",");
    let requestInFlight = false;

    const fetchPrices = async () => {
      if (requestInFlight) return;
      requestInFlight = true;

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${priceIds}&vs_currencies=usd&precision=full&_=${Date.now()}`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) throw new Error(`Price request failed: ${response.status}`);

        const data = await response.json();
        const nextPrices = Object.fromEntries(
          cryptoAssets.rows.map((asset) => {
            const livePrice = Number(data[asset.coinGeckoId]?.usd);
            return [asset.symbol, Number.isFinite(livePrice) && livePrice >= 0 ? livePrice : null];
          })
        );

        setPrices(nextPrices);
        setPriceStatus("live");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Unable to fetch crypto prices:", error);
          setPriceStatus("error");
        }
      } finally {
        requestInFlight = false;
      }
    };

    const refreshVisiblePrices = () => {
      if (document.visibilityState === "visible") fetchPrices();
    };

    fetchPrices();
    const interval = window.setInterval(fetchPrices, 30000);
    window.addEventListener("focus", fetchPrices);
    document.addEventListener("visibilitychange", refreshVisiblePrices);

    return () => {
      controller.abort();
      window.clearInterval(interval);
      window.removeEventListener("focus", fetchPrices);
      document.removeEventListener("visibilitychange", refreshVisiblePrices);
    };
  }, [cryptoAssets.rows]);

  const totals = useMemo(() => {
    const deposited = deposits.rows.reduce((sum, row) => sum + row.amountUsd, 0);
    const invested = cryptoAssets.rows.reduce((sum, row) => sum + row.investedUsd, 0);
    const reserved = deposited - invested;
    const pricesReady = cryptoAssets.rows.every((asset) => prices[asset.symbol] != null);
    const cryptoValue = pricesReady
      ? cryptoAssets.rows.reduce(
          (sum, asset) => sum + prices[asset.symbol] * asset.quantity,
          0
        )
      : null;
    const profitLoss = cryptoValue === null ? null : cryptoValue - invested;
    const totalValue = cryptoValue === null ? null : cryptoValue + reserved;

    return {
      deposited,
      invested,
      reserved,
      profitLoss,
      totalValue,
    };
  }, [cryptoAssets.rows, deposits.rows, prices]);

  const chartData = cryptoAssets.rows.map((asset) => ({
    name: asset.symbol,
    invested: asset.investedUsd,
    currentValue:
      prices[asset.symbol] == null
        ? null
        : prices[asset.symbol] * asset.quantity,
  }));

  const profitClass =
    totals.profitLoss === null
      ? "neutral"
      : totals.profitLoss >= 0
      ? "positive"
      : "negative";

  const reservedSection = {
    ...reservedAssets,
    rows: [
      {
        id: "reserved-usdt",
        symbol: "USDT",
        amountUsd: totals.reserved,
      },
    ],
  };

  return (
    <main className="portfolio-screen">
      <header className="portfolio-hero">
        <div>
          <p className="eyebrow">Personal portfolio</p>
          <h1>Asset overview</h1>
          <p className="portfolio-owner">{owner} · Private tracker</p>
        </div>
        <div className={`price-status ${priceStatus}`}>
          <span />
          {priceStatus === "live"
            ? "Prices live"
            : priceStatus === "error"
            ? "Price feed unavailable"
            : "Connecting to prices"}
        </div>
      </header>

      <section className="summary-grid" aria-label="Portfolio summary">
        <article className="summary-card primary-card">
          <span>Total asset value</span>
          <strong>
            {totals.totalValue === null ? "—" : currencyFormatter.format(totals.totalValue)}
          </strong>
          <small>Total deposits plus or minus profit/loss</small>
        </article>
        <article className={`summary-card ${profitClass}`}>
          <span>Profit / loss</span>
          <strong>
            {totals.profitLoss === null ? "—" : currencyFormatter.format(totals.profitLoss)}
          </strong>
          <small>
            Current crypto value minus {currencyFormatter.format(totals.invested)} invested
          </small>
        </article>
        <article className="summary-card">
          <span>Reserved USDT</span>
          <strong>{currencyFormatter.format(totals.reserved)}</strong>
          <small>{currencyFormatter.format(totals.invested)} currently invested</small>
        </article>
      </section>

      <DataTable section={cryptoAssets} prices={prices} />
      <DataTable section={reservedSection} />
      <DataTable section={deposits} />

      {/* <section className="portfolio-section allocation-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Position check</span>
            <h2>Invested vs live holding value</h2>
          </div>
        </div>
        <div className="portfolio-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#242a35" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#98a2b3" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#667085" }}
                tickFormatter={(value) => `$${value}`}
                width={58}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                formatter={(value) => currencyFormatter.format(value)}
                contentStyle={{
                  background: "#121722",
                  border: "1px solid #2a3140",
                  borderRadius: 10,
                }}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ color: "#98a2b3", fontSize: 11, paddingTop: 8 }}
              />
              <Bar dataKey="invested" name="Invested" fill="#5965f2" radius={[5, 5, 0, 0]} />
              <Bar
                dataKey="currentValue"
                name="Live holding value"
                fill="#35d07f"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section> */}
    </main>
  );
};

export default Portfolio;
