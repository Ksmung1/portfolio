export const portfolioData = {
  owner: "VIP 007",
  deposits: {
    id: "deposits",
    label: "DEPOSITS",
    columns: [
      { key: "date", label: "Date", format: "date" },
      { key: "asset", label: "Asset" },
      { key: "amountUsd", label: "Amount", format: "currency" },
    ],
    rows: [
      { id: "deposit-2025-03-13", date: "2025-03-13", asset: "USDT", amountUsd: 1000 },
      { id: "deposit-2025-04-06", date: "2025-04-06", asset: "USDT", amountUsd: 1000 },
      { id: "deposit-2025-04-10", date: "2025-04-10", asset: "USDT", amountUsd: 1000 },
      { id: "deposit-2025-04-17", date: "2025-04-17", asset: "USDT", amountUsd: 1000 },
      { id: "deposit-2025-09-05", date: "2025-09-05", asset: "USDT", amountUsd: 1000 },
      { id: "deposit-2025-09-10", date: "2025-09-10", asset: "USDT", amountUsd: 1000 },
      { id: "deposit-2025-10-05", date: "2025-10-21", asset: "USDT", amountUsd: 1000 },
      { id: "deposit-2025-10-10", date: "2025-11-12", asset: "USDT", amountUsd: 1000 },
    ],
  },
  cryptoAssets: {
    id: "crypto-assets",
    label: "CRYPTO ASSETS",
    columns: [
      { key: "symbol", label: "Coin", format: "asset" },
      { key: "investedUsd", label: "Invested", format: "currency" },
      { key: "quantity", label: "Quantity", format: "quantity" },
      { key: "currentPrice", label: "Current Price", format: "price" },
      { key: "unlockDate", label: "Unlocked Date", format: "date" },
    ],
    rows: [
      {
        id: "sol-2029-12",
        symbol: "SOL",
        coinGeckoId: "solana",
        investedUsd: 3000,
        quantity: 16,
        unlockDate: "2030-12",
      },
      {
        id: "eth-2028-12",
        symbol: "ETH",
        coinGeckoId: "ethereum",
        investedUsd: 3000,
        quantity: 0.64,
        unlockDate: "2029-12",
      },
      {
        id: "btc-2027-12",
        symbol: "BTC",
        coinGeckoId: "bitcoin",
        investedUsd: 2000,
        quantity: 0.01831,
        unlockDate: "2028-12",
      },
    ],
  },
  reservedAssets: {
    id: "reserved-assets",
    label: "RESERVED USDT",
    columns: [
      { key: "symbol", label: "Coin", format: "asset" },
      { key: "amountUsd", label: "Available Balance", format: "currency" },
    ],
  },
};
